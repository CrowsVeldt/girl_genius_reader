import React, { createContext, useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentPageKey,
  pageListKey,
  volumeListKey,
} from "../utils/storage";
import { checkLists, updateLists } from "../utils/lists";
import { PageType, VolumeType } from "../utils/types";
import { lastElement } from "../utils/utilFunctions";
import { showToast } from "../utils/notifications";

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
  refresh: () => void;
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
      const listsExist: boolean = await checkLists();
      if (listsExist) {
        setPages(await retrieveData(pageListKey));
        setVolumes(await retrieveData(volumeListKey));
        setDataReady(true);
      }
    })();
  }, [dataUpdated]);

  useEffect(() => {
    (async () => {
      try {
        // repeat until updated successfully
        const updated: boolean = await updateLists();
        if (updated) {
          setDataUpdated(true);
        }
      } catch (error) {
        console.warn("error in comic context useeffect");
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
        console.warn("Error setting data");
        console.error(error);
      }
    })();
  }, []);

  const getBookmarks: () => PageType[] = () => bookmarks;
  const getCurrentPage: () => PageType = () => currentPage;
  const getVolumes: () => VolumeType[] = () => volumes;
  const getLatestPage: () => PageType = () => lastElement(pages);

  const getDataStatus: () => boolean = () => dataReady;

  const refresh: () => void = async () => {
    try {
      showToast("Updating");
      const updated: boolean = await updateLists();
      if (updated) {
        setDataUpdated(true);
      }
    } catch (error) {
      console.warn("an error was thrown from the refresh function");
      console.error(error);
    }
  };

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
    refresh,
  };
  return (
    <ComicContext.Provider value={value}>{children}</ComicContext.Provider>
  );
};

export default ComicProvider;
