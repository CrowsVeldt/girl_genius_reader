import React, { createContext, useState, useEffect, useContext } from "react";
import { Image } from "react-native";
import Toast from "react-native-root-toast";
import { useNetInfo } from "@react-native-community/netinfo";
import { checkLists, processPageAndVolumeLists } from "../utils/lists";
import { updateDateList } from "../utils/network";
import { showToast } from "../utils/notifications";
import { retrieveData, saveData } from "../utils/storage";
import { PageType, VolumeType } from "../utils/types";
import { lastElement } from "../utils/utilFunctions";
import { AppContext } from "./AppContext";

type ComicContextType = {
  addBookmark: (newBookmark: PageType) => void;
  changeCurrentPage: (page: PageType) => void;
  changeCurrentVolume: (num: number) => void;
  getBookmarks: () => PageType[];
  getCurrentPage: () => PageType;
  getCurrentVolume: () => number;
  getDataStatus: () => boolean;
  getLatestPage: () => PageType;
  getVolume: (num: number) => VolumeType;
  getVolumes: () => VolumeType[];
  goToPreviousPage: (page: PageType) => void;
  goToNextPage: (page: PageType) => void;
  isPageBookmarked: (page: PageType) => boolean;
  refresh: () => void;
  removeBookmark: (page: PageType) => void;
  triggerFinishedUpdate: (trigger: boolean) => void;
};

export const ComicContext = createContext<ComicContextType>(
  null as unknown as ComicContextType
);

const ComicProvider = ({ children }: { children: any }) => {
  const { getPreloadPolicy } = useContext(AppContext);
  const [volumes, setVolumes] = useState<VolumeType[]>([]);
  const [pages, setPages] = useState<PageType[]>([]);
  const [bookmarks, setBookmarks] = useState<PageType[]>([]);
  const [currentVolume, setCurrentVolume] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<PageType>({
    date: "20021104",
    title: "",
    pageNumber: 1,
    volumeNumber: 1,
  });

  const [dataReady, setDataReady] = useState<boolean>(false);
  const [finishedUpdate, setFinishedUpdate] = useState<boolean>(false);
  const netStatus = useNetInfo();
  const preloadPolicy = getPreloadPolicy();

  useEffect(() => {
    (async () => {
      // Initial check for list data
      try {
        const listsExist: boolean = await checkLists();
        if (listsExist) {
          setPages(await retrieveData(process.env.EXPO_PUBLIC_PAGE_LIST_KEY!));
          setVolumes(
            await retrieveData(process.env.EXPO_PUBLIC_VOLUME_LIST_KEY!)
          );
          setDataReady(true);
        }
      } catch (error) {
        console.warn("An error occurred setting page and volume data");
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // set page and volume data after update
      try {
        const lists = await processPageAndVolumeLists();
        if (lists != undefined) {
          setPages(lists.pageList);
          setVolumes(lists.volumeList);
          setDataReady(true);
        }
      } catch (error) {
        console.warn("An error occurred setting page and volume data");
        console.error(error);
      }
    })();
  }, [finishedUpdate]);

  useEffect(() => {
    (async () => {
      try {
        const savedBookmarks: PageType[] = await retrieveData(
          process.env.EXPO_PUBLIC_BOOKMARK_KEY!
        );
        const savedCurrentPage: PageType = await retrieveData(
          process.env.EXPO_PUBLIC_CURRENT_PAGE_KEY!
        );

        if (savedBookmarks != null) {
          setBookmarks(savedBookmarks);
        }
        if (savedCurrentPage != null) {
          setCurrentPage(savedCurrentPage);
        }
      } catch (error) {
        console.warn(
          "An error occurred setting bookmark and current page data"
        );
        console.error(error);
      }
    })();
  }, []);

  const addBookmark: (newBookmark: PageType) => void = async (newBookmark) => {
    try {
      const newBookmarks: PageType[] = [...bookmarks, newBookmark];
      const filteredBookmarks: Set<PageType> = new Set(newBookmarks);
      const filteredBookmarksArray: PageType[] = Array.from(filteredBookmarks);
      setBookmarks(filteredBookmarksArray);
      Toast.show(`Added ${newBookmark.date} to bookmarks`);
      saveData(process.env.EXPO_PUBLIC_BOOKMARK_KEY!, filteredBookmarksArray);
    } catch (error) {
      console.warn("An error occurred adding bookmark");
      console.error(error);
    }
  };

  const changeCurrentPage: (page: PageType) => void = async (page) => {
    try {
      if (page != null) {
        if (
          preloadPolicy === "always" ||
          (preloadPolicy === "wifi" && netStatus.type === "wifi")
        ) {
          prefetchFive(page);
        }

        setCurrentPage(page);
        saveData(process.env.EXPO_PUBLIC_CURRENT_PAGE_KEY!, page);
      } else if (page === undefined) {
        throw new Error("Cannot change page to 'undefined'");
      }
    } catch (error) {
      console.warn("An error occurred changing page");
      console.error(error);
    }
  };

  const changeCurrentVolume: (num: number) => void = (num) => {
    setCurrentVolume(num);
  };

  const getBookmarks: () => PageType[] = () => bookmarks;
  const getCurrentPage: () => PageType = () => currentPage;
  const getCurrentVolume: () => number = () => currentVolume;
  const getDataStatus: () => boolean = () => dataReady;
  const getLatestPage: () => PageType = () => lastElement(pages);
  const getVolume: (num: number) => VolumeType = (num) => volumes[num - 1];

  const getVolumes: () => VolumeType[] = () => volumes;

  const goToPreviousPage: (page: PageType) => void = async (page) => {
    try {
      const index: number = pages.findIndex(
        (element: PageType) => element.date === page.date
      );
      changeCurrentPage(index - 1 >= 0 ? pages[index - 1] : page);
    } catch (error) {
      console.warn("An error occurred going to previous page");
      console.error(error);
    }
  };

  const goToNextPage: (page: PageType) => void = (page) => {
    try {
      const index: number = pages.findIndex(
        (element: PageType) => element.date === page.date
      );
      changeCurrentPage(pages[index + 1] ? pages[index + 1] : page);
    } catch (error) {
      console.warn("An error occurred going to next page");
      console.error(error);
    }
  };

  const isPageBookmarked: (page: PageType) => boolean = (page) =>
    bookmarks.find((item: PageType) => item.date === page.date) != undefined;

  const refresh: () => void = async () => {
    try {
      showToast("Updating");
      setFinishedUpdate(await updateDateList() != null);
    } catch (error) {
      console.warn("An error occurred refreshing data");
      console.error(error);
    }
  };

  const prefetchFive: (page: PageType) => void = (page) => {
    const index: number = pages.findIndex(
      (element: PageType) => element.date === page.date
    );

    try {
      if (pages[index - 2] != undefined) {
        const pre1: Promise<boolean> = Image.prefetch(
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
            pages[index - 2].date
          }.jpg`
        );
      }

      if (pages[index - 1] != undefined) {
        const pre2: Promise<boolean> = Image.prefetch(
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
            pages[index - 1].date
          }.jpg`
        );
      }

      if (pages[index] != undefined) {
        const pre3: Promise<boolean> = Image.prefetch(
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${pages[index].date}.jpg`
        );
      }

      if (pages[index + 1] != undefined) {
        const pre4: Promise<boolean> = Image.prefetch(
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
            pages[index + 1].date
          }.jpg`
        );
      }

      if (pages[index + 2] != undefined) {
        const pre5: Promise<boolean> = Image.prefetch(
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
            pages[index + 2].date
          }.jpg`
        );
      }
    } catch (error) {
      console.warn("An error occurred prefetching images");
      console.error(error);
    }
  };

  const removeBookmark: (page: PageType) => void = async (page) => {
    try {
      const newBookmarks: PageType[] = bookmarks.filter((a) => a !== page);
      setBookmarks(newBookmarks);
      Toast.show(`Removed ${page.date} from bookmarks`);
      saveData(process.env.EXPO_PUBLIC_BOOKMARK_KEY!, newBookmarks);
    } catch (error) {
      console.warn("An error occurred removing bookmark");
      console.error(error);
    }
  };

  const triggerFinishedUpdate: (trigger: boolean) => void = (trigger) =>
    setFinishedUpdate(!finishedUpdate);

  const value = {
    addBookmark,
    changeCurrentPage,
    changeCurrentVolume,
    getBookmarks,
    getCurrentPage,
    getCurrentVolume,
    getDataStatus,
    getLatestPage,
    getVolume,
    getVolumes,
    goToPreviousPage,
    goToNextPage,
    isPageBookmarked,
    refresh,
    removeBookmark,
    triggerFinishedUpdate,
  };
  return (
    <ComicContext.Provider value={value}>{children}</ComicContext.Provider>
  );
};

export default ComicProvider;
