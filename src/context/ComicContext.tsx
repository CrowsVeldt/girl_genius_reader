import React, { createContext, useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import * as fs from "expo-file-system";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentPageKey,
  pageListKey,
  volumeListKey,
} from "../utils/storage";
import { ComicDataType, PageType, VolumeType } from "../utils/types";
import { fetchDates } from "../listModules/dates";
import { collectVolumes } from "../listModules/volumes";

type ComicContextType = {
  getCurrentPage: () => PageType;
  getLatestPage: () => PageType;
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
  const [volumes, setVolumes] = useState<ComicDataType[]>([]);
  const [pages, setPages] = useState<PageType[]>([]);
  const [bookmarks, setBookmarks] = useState<PageType[]>([]);
  const [currentPage, setCurrentPage] = useState<PageType>({
    date: "20021104",
    title: "",
    pageNumber: 1,
    volumeNumber: 1,
  });

  useEffect(() => {
    (async () => {
      const datesUpdated: boolean = await fetchDates();
;
      if (datesUpdated) {
        collectVolumes();
      }

      const pageList: string = await fs.readAsStringAsync(
        `${fs.documentDirectory}lists/pageList.json`
      );
      const volumeList: string = await fs.readAsStringAsync(
        `${fs.documentDirectory}lists/volumeList.json`
      );

      saveData(pageListKey, pageList);
      saveData(volumeListKey, volumeList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const savedPageList: any = await retrieveData(pageListKey);
        const savedVolumeList: any = await retrieveData(volumeListKey);
        const savedBookmarks: any = await retrieveData(bookmarkKey);
        const savedCurrentPage: any = await retrieveData(currentPageKey);

        if (savedBookmarks != null) {
          setBookmarks(savedBookmarks as PageType[]);
        }
        if (savedCurrentPage != null) {
          setCurrentPage(savedCurrentPage as PageType);
        }
        if (savedPageList != null) {
          setPages(JSON.parse(savedPageList) as PageType[]);
        }
        if (savedVolumeList != null) {
          setVolumes(JSON.parse(savedVolumeList) as VolumeType[]);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const getBookmarks: () => PageType[] = () => bookmarks;
  const getCurrentPage: () => PageType = () => currentPage;
  const getVolumes: () => ComicDataType[] = () => volumes;
  const getLatestPage: () => PageType = () => pages[pages.length - 1];

  const isPageBookmarked: (page: PageType) => boolean = (page) =>
    bookmarks.find((item: PageType) => item.date === page.date) != undefined;

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

  const goToNextPage: (page: PageType) => void = (page) => {
    const index: number = pages.findIndex(
      (element: PageType) => element.date === page.date
    );
    changeCurrentPage(pages[index + 1] ? pages[index + 1] : page);
  };

  const goToPreviousPage: (page: PageType) => void = (page) => {
    const index: number = pages.findIndex(
      (element: PageType) => element.date === page.date
    );
    changeCurrentPage(index - 1 >= 0 ? pages[index - 1] : page);
  };

  const value = {
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
