import ass from "@react-native-async-storage/async-storage";
import * as fs from "expo-file-system";

import dateList from "../../public/dateList.json";
import pageList from "../../public/pageList.json";
import volumeList from "../../public/volumeList.json";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentPageKey: string = "@GGAppPage";
export const pageListKey: string = "@GGAppPageList";
export const volumeListKey: string = "@GGAppVolumeList";

export const listDirectoryURI: string = `${fs.documentDirectory}lists/`;
export const dateListURI: string = `${fs.documentDirectory}lists/dateList.json`;
export const pageListURI: string = `${fs.documentDirectory}lists/pageList.json`;
export const volumeListURI: string = `${fs.documentDirectory}lists/volumeList.json`;

export const saveData: (key: string, value: any) => void = async (
  key,
  value
) => {
  try {
    await ass.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
};

export const retrieveData: (key: string) => Promise<any> = async (key) => {
  let data;
  try {
    data = await ass.getItem(key);
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
  return data != null ? JSON.parse(data) : null;
};

export const initializeLocalFiles: () => Promise<boolean> = async () => {
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
    console.error("error initializing list directory and/or files");
    console.error(error);
  }
  
  return true
};
