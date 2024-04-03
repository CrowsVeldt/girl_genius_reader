import React, { createContext, useState, useEffect } from "react";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentDateKey,
  currentPageKey,
} from "../utils/storage";
import dateFile from "../public/dates.json";
import titleFile from "../public/titles.json";
import Toast from "react-native-root-toast";
import { ComicDataType, PageType } from "../utils/types";

type ComicContextType = {
  getCurrentDate: () => string;
  getCurrentPage: () => PageType
  changeCurrentDate: (date: string) => void;
  changeCurrentPage: (page: PageType) => void
  getBookmarks: () => string[];
  addBookmark: (newBookmark: string) => void;
  removeBookmark: (date: string) => void;
  isDateBookmarked: (date: string) => boolean;
  goToNextPage: (date: string) => void;
  goToPreviousPage: (date: string) => void;
  getVolumes: () => ComicDataType[];
};

const collectVolumes = (
  volumes: string[][],
  dates: string[],
  titles: string[][]
) => {
  const volumesList = volumes.map((volume, index) => {
    const endDate =
      volumes[index + 1] != undefined ? volumes[index + 1][0] : "end";

    const volumeDates = dates.slice(
      dates.indexOf(volume[0]),
      dates.indexOf(endDate)
    );

    const volumePages = volumeDates.map((date, index) => {
      const title = titles.find((title) => title[0] === date);
      return {
        pageNumber: index + 1,
        date: date,
        title: title ? title[1] : "",
        volume: volume
      };
    });

    return {
      volumeStart: volume[0],
      volumeNumber: index + 1,
      pages: volumePages,
    };
  });

  return volumesList;
};

export const ComicContext = createContext<ComicContextType>(
  null as unknown as ComicContextType
);

const ComicProvider = ({ children }: { children: any }) => {
  const [volumes, setVolumes] = useState<ComicDataType[]>([]);
  const [dates, setDates] = useState<string[]>(dateFile);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("20021104");
  const [currentPage, setCurrentPage] = useState<PageType>({
    date: "20021104",
    title: "",
    pageNumber: 1,
    volume: 1
  });

  useEffect(() => {
    (async () => {
      const savedBookmarks: string[] = await retrieveData(bookmarkKey);
      const savedCurrentDate: string = await retrieveData(currentDateKey);
      const savedCurrentPage: PageType = await retrieveData(currentPageKey);
      if (savedBookmarks != null) {
        setBookmarks(savedBookmarks);
      }
      if (savedCurrentDate != null) {
        setCurrentDate(savedCurrentDate.toString());
      }

      if (savedCurrentPage != null) {
        setCurrentPage(savedCurrentPage);
      }
    })();
  }, []);

  useEffect(() => {
    const list = titleFile;

    const titleList: string[][] = list.filter((item) => {
      return !(
        item[1].includes("Final") ||
        item[1].includes("Volume") ||
        item[1].includes("VOLUME") ||
        item[1].includes("BOOK") ||
        item[1].includes("---Jump to a Scene---")
      );
    });

    const volumeList: string[][] = list.filter((item) => {
      // list of conditions and exceptions to find the beginnings of volumes
      return (
        !item[1].includes("Final") &&
        !item[1].includes("Volume NINE") &&
        (item[1].includes("Volume") ||
          item[1].includes("VOLUME") ||
          item[1].includes("BOOK") ||
          item[1].includes("Volume Nine Web Cover & Wallpaper"))
      );
    });

    const collectedVolumes = collectVolumes(volumeList, dates, titleList);
    setVolumes(collectedVolumes);
  }, []);

  const getBookmarks: () => string[] = () => bookmarks;
  const getCurrentDate: () => string = () => currentDate;
  const getCurrentPage: () => PageType = () => currentPage;

  const changeCurrentDate: (date: string) => void = async (date) => {
    setCurrentDate(date);
    saveData(currentDateKey, date);
  };

  const changeCurrentPage: (page: PageType) => void = async (page) => {
    setCurrentPage(page);
    saveData(currentPageKey, currentPage);
  };

  const addBookmark: (newBookmarkDate: string) => void = async (
    newBookmarkDate
  ) => {
    const newBookmarks: string[] = [...bookmarks, newBookmarkDate];
    const filteredBookmarks: Set<string> = new Set(newBookmarks);
    const filteredBookmarksArray: string[] = Array.from(filteredBookmarks);
    setBookmarks(filteredBookmarksArray);
    Toast.show(`Added ${newBookmarkDate} to bookmarks`);
    saveData(bookmarkKey, filteredBookmarksArray);
  };

  const removeBookmark: (date: string) => void = async (date) => {
    const newBookmarks: string[] = bookmarks.filter((a) => a !== date);
    setBookmarks(newBookmarks);
    Toast.show(`Removed ${date} from bookmarks`);
    saveData(bookmarkKey, newBookmarks);
  };

  const isDateBookmarked: (date: string) => boolean = (date) => {
    return bookmarks.includes(date);
  };

  const goToNextPage: (date: string) => void = (date) => {
    const index: number = dates.findIndex((element) => element === date);
    changeCurrentDate(dates[index + 1] ? dates[index + 1] : date);
  };

  const goToPreviousPage: (date: string) => void = (date) => {
    const index: number = dates.findIndex((element) => element === date);
    changeCurrentDate(index - 1 >= 0 ? dates[index - 1] : date);
  };

  const getVolumes = () => {
    return volumes;
  };

  const value = {
    getCurrentDate,
    getCurrentPage,
    changeCurrentDate,
    changeCurrentPage,
    getBookmarks,
    addBookmark,
    removeBookmark,
    isDateBookmarked,
    goToNextPage,
    goToPreviousPage,
    getVolumes,
  };
  return (
    <ComicContext.Provider value={value}>{children}</ComicContext.Provider>
  );
};

export default ComicProvider;
