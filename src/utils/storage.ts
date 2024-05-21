import ass from "@react-native-async-storage/async-storage";
import * as fs from "expo-file-system";
import { getDateList } from "./network";
import { collectVolumes } from "./volumes";

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

export const checkForLocalFiles = async () => {
  const filesExist =
    (await fs.getInfoAsync(listDirectoryURI)).exists &&
    (await fs.getInfoAsync(dateListURI)).exists &&
    (await fs.getInfoAsync(pageListURI)).exists &&
    (await fs.getInfoAsync(volumeListURI)).exists;

  return filesExist;
};

export const initializeLocalFiles: () => void = async () => {
  const dateList = await getDateList();
  const { pageList, volumeList } = await collectVolumes(dateList);

  try {
    fs.makeDirectoryAsync(listDirectoryURI);
    fs.writeAsStringAsync(dateListURI, JSON.stringify(dateList));
    fs.writeAsStringAsync(pageListURI, JSON.stringify(pageList));
    fs.writeAsStringAsync(volumeListURI, JSON.stringify(volumeList));
  } catch (error) {
    console.error("error initializing list directory and/or files");
    console.error(error);
  }
};
