import React, { createContext, useState, useEffect } from "react";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentDateKey,
} from "../utils/storage";
import dateFile from "../public/dates.json";
import Toast from "react-native-root-toast";

type DateContextType = {
  getDates: () => string[];
  getCurrentDate: () => string;
  changeCurrentDate: (date: string) => void;
  getBookmarks: () => string[];
  addBookmark: (newBookmark: string) => void;
  removeBookmark: (date: string) => void;
  isDateBookmarked: (date: string) => boolean;
  goToNextPage: (date: string) => void;
  goToPreviousPage: (date: string) => void;
};

export const DateContext = createContext<DateContextType>(
  null as unknown as DateContextType
);

const DateProvider = ({ children }: { children: any }) => {
  const [dates, setDates] = useState<string[]>(dateFile);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("20021104");

  useEffect(() => {
    (async () => {
      const savedBookmarks: string[] = await retrieveData(bookmarkKey);
      const savedCurrentDate: string = await retrieveData(currentDateKey);
      if (savedBookmarks != null) {
        setBookmarks(savedBookmarks);
      }
      if (savedCurrentDate != null) {
        setCurrentDate(savedCurrentDate.toString());
      }
    })();
  }, []);

  const getDates: () => string[] = () => {
    return dates;
  };

  const getBookmarks: () => string[] = () => {
    return bookmarks;
  };

  const getCurrentDate: () => string = () => {
    return currentDate;
  };

  const changeCurrentDate: (date: string) => void = async (date) => {
    setCurrentDate(date);
    saveData(currentDateKey, date);
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

  const value = {
    getDates,
    getCurrentDate,
    changeCurrentDate,
    getBookmarks,
    addBookmark,
    removeBookmark,
    isDateBookmarked,
    goToNextPage,
    goToPreviousPage,
  };
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export default DateProvider;
