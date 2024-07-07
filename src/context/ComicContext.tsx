import React, { createContext, useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { checkLists } from "../utils/lists";
import { update } from "../utils/network";
import { showToast } from "../utils/notifications";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentPageKey,
  pageListKey,
  volumeListKey,
} from "../utils/storage";
import { PageType, VolumeType } from "../utils/types";
import { lastElement } from "../utils/utilFunctions";
import { Image } from "expo-image";

type ComicContextType = {
  addBookmark: (newBookmark: PageType) => void;
  changeCurrentPage: (page: PageType) => void;
  getBookmarks: () => PageType[];
  getCurrentPage: () => PageType;
  getCurrentFive: (page: PageType) => [string, string, string, string, string];
  getDataStatus: () => boolean;
  getLatestPage: () => PageType;
  getVolumes: () => VolumeType[];
  goToPreviousPage: (page: PageType) => void;
  goToNextPage: (page: PageType) => void;
  isPageBookmarked: (page: PageType) => boolean;
  refresh: () => void;
  removeBookmark: (page: PageType) => void;
};

export const ComicContext = createContext<ComicContextType>(
  null as unknown as ComicContextType
);

const ComicProvider = ({ children }: { children: any }) => {
  const [volumes, setVolumes] = useState<VolumeType[]>([]);
  const [pages, setPages] = useState<PageType[]>([]);
  const [bookmarks, setBookmarks] = useState<PageType[]>([]);
  const [currentPage, setCurrentPage] = useState<PageType>({
    date: "20021104",
    title: "",
    pageNumber: 1,
    volumeNumber: 1,
  });
  const [dataReady, setDataReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const listsExist: boolean | undefined = await checkLists();
        if (listsExist) {
          setPages(await retrieveData(pageListKey));
          setVolumes(await retrieveData(volumeListKey));
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
      try {
        const savedBookmarks: PageType[] = await retrieveData(bookmarkKey);
        const savedCurrentPage: PageType = await retrieveData(currentPageKey);

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
      saveData(bookmarkKey, filteredBookmarksArray);
    } catch (error) {
      console.warn("An error occurred adding bookmark");
      console.error(error);
    }
  };

  const changeCurrentPage: (page: PageType) => void = async (page) => {
    try {
      if (page != null) {
        const five = getCurrentFive();

        Image.prefetch([
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${five[0]}.jpg`,
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${five[1]}.jpg`,
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${five[2]}.jpg`,
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${five[3]}.jpg`,
          `https://www.girlgeniusonline.com/ggmain/strips/ggmain${five[4]}.jpg`,
        ]);

        setCurrentPage(page);
        saveData(currentPageKey, page);
      } else if (page === undefined) {
        throw new Error("Cannot change page to 'undefined'");
      }
    } catch (error) {
      console.warn("An error occurred changing page");
      console.error(error);
    }
  };

  const getBookmarks: () => PageType[] = () => bookmarks;
  const getCurrentPage: () => PageType = () => currentPage;

  const getCurrentFive: () => [string, string, string, string, string] = () => {
    const current = getCurrentPage();
    const index: number = pages.findIndex(
      (element: PageType) => element.date === current.date
    );

    return [
      pages[index - 2]?.date,
      pages[index - 1]?.date,
      pages[index]?.date,
      pages[index + 1]?.date,
      pages[index + 2]?.date,
    ];
  };

  const prefetchFive = async (page: PageType) => {
    const index: number = pages.findIndex(
      (element: PageType) => element.date === page.date
    );

    const pre = await Image.prefetch([
      `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
        pages[index - 2]?.date
      }.jpg`,
      `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
        pages[index - 1]?.date
      }.jpg`,
      `https://www.girlgeniusonline.com/ggmain/strips/ggmain${pages[index]?.date}.jpg`,
      `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
        pages[index + 1]?.date
      }.jpg`,
      `https://www.girlgeniusonline.com/ggmain/strips/ggmain${
        pages[index + 2]?.date
      }.jpg`,
    ]);

    console.log(pre);

  };

  const getDataStatus: () => boolean = () => dataReady;
  const getLatestPage: () => PageType = () => lastElement(pages);
  const getVolumes: () => VolumeType[] = () => volumes;

  const goToPreviousPage: (page: PageType) => void = async (page) => {
    try {
      prefetchFive(page);
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
      prefetchFive(page);
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
      update();
    } catch (error) {
      console.warn("An error occurred refreshing data");
      console.error(error);
    }
  };

  const removeBookmark: (page: PageType) => void = async (page) => {
    try {
      const newBookmarks: PageType[] = bookmarks.filter((a) => a !== page);
      setBookmarks(newBookmarks);
      Toast.show(`Removed ${page.date} from bookmarks`);
      saveData(bookmarkKey, newBookmarks);
    } catch (error) {
      console.warn("An error occurred removing bookmark");
      console.error(error);
    }
  };

  const value = {
    addBookmark,
    changeCurrentPage,
    getBookmarks,
    getCurrentPage,
    getCurrentFive,
    getDataStatus,
    getLatestPage,
    getVolumes,
    goToPreviousPage,
    goToNextPage,
    isPageBookmarked,
    refresh,
    removeBookmark,
  };
  return (
    <ComicContext.Provider value={value}>{children}</ComicContext.Provider>
  );
};

export default ComicProvider;
