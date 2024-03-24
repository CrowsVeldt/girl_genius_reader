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
};

export const DateContext = createContext<DateContextType>(
  null as unknown as DateContextType
);

const DateProvider = ({ children }: {children: any}) => {
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
        setCurrentDate(savedCurrentDate);
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
    Toast.show(`Added ${newBookmarkDate} to bookmarks`)
    saveData(bookmarkKey, filteredBookmarksArray);
  };

  const removeBookmark: (date: string) => void = async (date) => {
    const newBookmarks: string[] = bookmarks.filter((a) => a !== date);
    setBookmarks(newBookmarks);
    Toast.show(`Removed ${date} from bookmarks`)
    saveData(bookmarkKey, newBookmarks);
  };

  const value = {
    getDates,
    getCurrentDate,
    changeCurrentDate,
    getBookmarks,
    addBookmark,
    removeBookmark,
  };
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export default DateProvider;
