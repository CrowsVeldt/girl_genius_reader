import React, { createContext, useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentPageKey,
  pageListKey,
  volumeListKey,
  dateListKey,
} from "../utils/storage";
import { updateLists } from "../utils/network";
import { PageType, VolumeType } from "../utils/types";
import { collectVolumes } from "../utils/volumes";

type ComicContextType = {
  getDataStatus: () => boolean;
  getCurrentPage: () => PageType;
  getLatestPage: () => PageType;
  changeCurrentPage: (page: PageType) => void;
  getBookmarks: () => PageType[];
  addBookmark: (newBookmark: PageType) => void;
  removeBookmark: (page: PageType) => void;
  isPageBookmarked: (page: PageType) => boolean;
  goToNextPage: (page: PageType) => void;
  goToPreviousPage: (page: PageType) => void;
  getVolumes: () => VolumeType[];
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
  const [dataUpdated, setDataUpdated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const savedDates = await retrieveData(dateListKey);
        if (savedDates != null && savedDates != undefined) {
          const lists:
            | { pageList: PageType[]; volumeList: VolumeType[] }
            | undefined = await collectVolumes(savedDates);

          saveData(dateListKey, savedDates);
          saveData(pageListKey, lists?.pageList);
          saveData(volumeListKey, lists?.volumeList);

          setDataUpdated(true)
        } else {
          const updated: boolean = await updateLists();
          if (updated) {
            setDataUpdated(true);
          }
        }
      } catch (error) {
        console.warn("error in comic context useeffect")
        console.error(error)
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const pageList: PageType[] = await retrieveData(pageListKey);
        const volumeList: VolumeType[] = await retrieveData(volumeListKey);
        const savedBookmarks: PageType[] = await retrieveData(bookmarkKey);
        const savedCurrentPage: PageType = await retrieveData(currentPageKey);

        if (savedBookmarks != null) {
          setBookmarks(savedBookmarks);
        }
        if (savedCurrentPage != null) {
          setCurrentPage(savedCurrentPage);
        }
        if (pageList != null) {
          setPages(pageList);
        }
        if (volumeList != null) {
          setVolumes(volumeList);
        }
        setDataReady(true);
      } catch (error) {
        console.warn("Error settting data");
        console.error(error);
      }
    })();
  }, [dataUpdated]);

  const getBookmarks: () => PageType[] = () => bookmarks;
  const getCurrentPage: () => PageType = () => currentPage;
  const getVolumes: () => VolumeType[] = () => volumes;
  const getLatestPage: () => PageType = () => pages[pages.length - 1];

  const getDataStatus: () => boolean = () => dataReady;

  const isPageBookmarked: (page: PageType) => boolean = (page) =>
    bookmarks.find((item: PageType) => item.date === page.date) != undefined;

  const changeCurrentPage: (page: PageType) => void = async (page) => {
    if (page != null) {
      setCurrentPage(page);
      saveData(currentPageKey, page);
    } else {
      console.error('Can\'t change page to "undefined"');
    }
  };

  const addBookmark: (newBookmark: PageType) => void = async (newBookmark) => {
    try {
      const newBookmarks: PageType[] = [...bookmarks, newBookmark];
      const filteredBookmarks: Set<PageType> = new Set(newBookmarks);
      const filteredBookmarksArray: PageType[] = Array.from(filteredBookmarks);
      setBookmarks(filteredBookmarksArray);
      Toast.show(`Added ${newBookmark.date} to bookmarks`);
      saveData(bookmarkKey, filteredBookmarksArray);
    } catch (error) {
      console.error("failed to add bookmark");
    }
  };

  const removeBookmark: (page: PageType) => void = async (page) => {
    try {
      const newBookmarks: PageType[] = bookmarks.filter((a) => a !== page);
      setBookmarks(newBookmarks);
      Toast.show(`Removed ${page.date} from bookmarks`);
      saveData(bookmarkKey, newBookmarks);
    } catch (error) {
      console.error("failed to remove bookmark");
    }
  };

  const goToNextPage: (page: PageType) => void = (page) => {
    try {
      const index: number = pages.findIndex(
        (element: PageType) => element.date === page.date
      );
      changeCurrentPage(pages[index + 1] ? pages[index + 1] : page);
    } catch (error) {
      console.error("failed to advance to next page");
    }
  };

  const goToPreviousPage: (page: PageType) => void = (page) => {
    try {
      const index: number = pages.findIndex(
        (element: PageType) => element.date === page.date
      );
      changeCurrentPage(index - 1 >= 0 ? pages[index - 1] : page);
    } catch (error) {
      console.error("failed to retreat to last page");
    }
  };

  const value = {
    getDataStatus,
    getCurrentPage,
    getLatestPage,
    changeCurrentPage,
    getBookmarks,
    addBookmark,
    removeBookmark,
    isPageBookmarked,
    goToNextPage,
    goToPreviousPage,
    getVolumes,
  };
  return (
    <ComicContext.Provider value={value}>{children}</ComicContext.Provider>
  );
};

export default ComicProvider;
