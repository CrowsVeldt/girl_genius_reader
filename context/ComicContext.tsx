import React, { createContext, useState, useEffect } from "react";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentPageKey,
} from "../utils/storage";
import volumeFile from "../public/volumeList.json";
import pageFile from "../public/pageList.json";
import Toast from "react-native-root-toast";
import { ComicDataType, PageType, CollectedVolumeType } from "../utils/types";

type ComicContextType = {
  getCurrentPage: () => PageType;
  changeCurrentPage: (page: PageType) => void;
  getBookmarks: () => PageType[];
  addBookmark: (newBookmark: PageType) => void;
  removeBookmark: (page: PageType) => void;
  isPageBookmarked: (page: PageType) => boolean;
  goToNextPage: (page: PageType) => void;
  goToPreviousPage: (page: PageType) => void;
  getVolumes: () => ComicDataType[];
};

export const ComicContext = createContext<ComicContextType>(
  null as unknown as ComicContextType
);

const ComicProvider = ({ children }: { children: any }) => {
  const [volumes, setVolumes] = useState<ComicDataType[]>(volumeFile);
  const [pages, setPages] = useState<PageType[]>(pageFile);
  const [bookmarks, setBookmarks] = useState<PageType[]>([]);
  const [currentPage, setCurrentPage] = useState<PageType>({
    date: "20021104",
    title: "",
    pageNumber: 1,
    volume: 1,
  });

  useEffect(() => {
    (async () => {
      const savedBookmarks: PageType[] = await retrieveData(bookmarkKey);
      const savedCurrentPage: PageType = await retrieveData(currentPageKey);
      if (savedBookmarks != null) {
        setBookmarks(savedBookmarks);
      }
      if (savedCurrentPage != null) {
        setCurrentPage(savedCurrentPage);
      }
    })();
  }, []);

  const getBookmarks: () => PageType[] = () => bookmarks;
  const getCurrentPage: () => PageType = () => currentPage;

  const changeCurrentPage: (page: PageType) => void = async (page) => {
    setCurrentPage(page);
    saveData(currentPageKey, page);
  };

  const addBookmark: (newBookmark: PageType) => void = async (newBookmark) => {
    const newBookmarks: PageType[] = [...bookmarks, newBookmark];
    const filteredBookmarks: Set<PageType> = new Set(newBookmarks);
    const filteredBookmarksArray: PageType[] = Array.from(filteredBookmarks);
    setBookmarks(filteredBookmarksArray);
    Toast.show(`Added ${newBookmark.date} to bookmarks`);
    saveData(bookmarkKey, filteredBookmarksArray);
  };

  const removeBookmark: (page: PageType) => void = async (page) => {
    const newBookmarks: PageType[] = bookmarks.filter((a) => a !== page);
    setBookmarks(newBookmarks);
    Toast.show(`Removed ${page.date} from bookmarks`);
    saveData(bookmarkKey, newBookmarks);
  };

  const isPageBookmarked: (page: PageType) => boolean = (page) => {
    const test = bookmarks.find((item) => item.date === page.date) != undefined;
    return test;
  };

  const goToNextPage: (page: PageType) => void = (page) => {
    const index: number = pages.findIndex(
      (element) => element.date === page.date
    );
    changeCurrentPage(pages[index + 1] ? pages[index + 1] : page);
  };

  const goToPreviousPage: (page: PageType) => void = (page) => {
    const index: number = pages.findIndex(
      (element) => element.date === page.date
    );
    changeCurrentPage(index - 1 >= 0 ? pages[index - 1] : page);
  };

  const getVolumes: () => ComicDataType[] = () => {
    return volumes;
  };

  const value = {
    getCurrentPage,
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
