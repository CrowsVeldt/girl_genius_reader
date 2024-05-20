import ass from "@react-native-async-storage/async-storage";
import * as fs from "expo-file-system";
import { getDateList } from "./network";

// import dateList from "../../public/dateList.json";
// import pageList from "../../public/pageList.json";
// import volumeList from "../../public/volumeList.json";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentPageKey: string = "@GGAppPage";

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
  const dateList = await getDateList()

  try {
    fs.getInfoAsync(listDirectoryURI).then((res) => {
      if (!res.exists) {
        fs.makeDirectoryAsync(listDirectoryURI);
      }
    });

    fs.getInfoAsync(dateListURI).then((res) => {
      if (!res.exists) {
        fs.writeAsStringAsync(dateListURI, JSON.stringify(dateList));
      }
    });

    fs.getInfoAsync(pageListURI).then((res) => {
      if (!res.exists) {
        fs.writeAsStringAsync(pageListURI, "[]");
      }
    });

    fs.getInfoAsync(volumeListURI).then((res) => {
      if (!res.exists) {
        fs.writeAsStringAsync(volumeListURI, "[]");
      }
    });
  } catch (error) {
    console.error("error initializing list directory and/or files");
    console.error(error);
    return false;
  }

  return true;
};
