import React, { createContext, useState, useEffect } from "react";
import {
  retrieveData,
  saveData,
  bookmarkKey,
  currentPageKey,
} from "../utils/storage";
import dateFile from "../public/dates.json";
import titleFile from "../public/titles.json";
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

const collectVolumes: (
  volumes: string[][],
  dates: string[],
  titles: string[][]
) => CollectedVolumeType = (volumes, dates, titles) => {
  let pages: PageType[] = [];

  const volumesList: ComicDataType[] = volumes.map((volume, volumeIndex) => {
    const endDate: string =
      volumes[volumeIndex + 1] != undefined
        ? volumes[volumeIndex + 1][0]
        : "end";

    const volumeDates: string[] = dates.slice(
      dates.indexOf(volume[0]),
      dates.indexOf(endDate)
    );

    const volumePages: PageType[] = volumeDates.map((date, index) => {
      const title: string[] | undefined = titles.find(
        (title) => title[0] === date
      );
      return {
        pageNumber: index + 1,
        date: date,
        title: title ? title[1] : "",
        volume: volumeIndex + 1,
      };
    });

    pages = [...pages, ...volumePages];

    return {
      volumeStart: volume[0],
      volumeNumber: volumeIndex + 1,
      pages: volumePages,
    };
  });

  return [volumesList, pages];
};

export const ComicContext = createContext<ComicContextType>(
  null as unknown as ComicContextType
);

const ComicProvider = ({ children }: { children: any }) => {
  const [volumes, setVolumes] = useState<ComicDataType[]>([]);
  const [dates, setDates] = useState<string[]>(dateFile);
  const [pages, setPages] = useState<PageType[]>([]);
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

  useEffect(() => {
    const list: string[][] = titleFile;

    const titleList: string[][] = list.filter((item) => {
      // all titles that aren't volume start or end dates
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

    const collectedVolumes: CollectedVolumeType = collectVolumes(
      volumeList,
      dates,
      titleList
    );
    setVolumes(collectedVolumes[0]);
    setPages(collectedVolumes[1]);
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
