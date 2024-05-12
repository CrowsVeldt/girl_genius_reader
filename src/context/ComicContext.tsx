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
  listDirectoryURI,
  dateListURI,
  pageListURI,
  volumeListURI,
} from "../utils/storage";
import { ComicDataType, PageType, VolumeType } from "../utils/types";
import { fetchDates } from "../listModules/dates";
import { collectVolumes } from "../listModules/volumes";
import dateList from "../../public/dateList.json";
import pageList from "../../public/pageList.json";
import volumeList from "../../public/volumeList.json";

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
      // Initialize local directory and files
      try {
        fs.getInfoAsync(listDirectoryURI).then((res) => {
          if (!res.exists) {
            fs.makeDirectoryAsync(listDirectoryURI);
            console.log("list directory created");
          } else {
            console.log("list directory exists");
          }
        });

        fs.getInfoAsync(dateListURI).then((res) => {
          if (!res.exists) {
            fs.writeAsStringAsync(dateListURI, JSON.stringify(dateList));
            console.log("date list written");
          } else {
            console.log("date list exists");
          }
        });

        fs.getInfoAsync(pageListURI).then((res) => {
          if (!res.exists) {
            fs.writeAsStringAsync(pageListURI, JSON.stringify(pageList));
            console.log("page list written");
          } else {
            console.log("page list exists");
          }
        });

        fs.getInfoAsync(volumeListURI).then((res) => {
          if (!res.exists) {
            fs.writeAsStringAsync(volumeListURI, JSON.stringify(volumeList));
            console.log("volume list written");
          } else {
            console.log("volume list exists");
          }
        });
      } catch (error) {
        // prevent annoying notice that promise may have been rejected
        console.error("error initializing list directory and/or files");
        console.error(error);
      }

      // check for new dates
      const datesUpdated: boolean = await fetchDates();

      // if new dates found, collect volumes, then read pages and volumes to memory and save
      if (datesUpdated) {
        collectVolumes().then(async (res) => {
          if (res) {
            const pageList: string = await fs.readAsStringAsync(pageListURI);
            const volumeList: string = await fs.readAsStringAsync(
              volumeListURI
            );

            saveData(pageListKey, pageList);
            saveData(volumeListKey, volumeList);
          }
        });
      }
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
