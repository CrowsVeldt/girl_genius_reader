import ass from "@react-native-async-storage/async-storage";
// import * as fs from "expo-file-system";
import { getDateList } from "./network";
import { collectVolumes } from "./volumes";
import { PageType, VolumeType } from "./types";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentPageKey: string = "@GGAppPage";
export const dateListKey: string = "@GGAppDates";
export const pageListKey: string = "@GGAppPage";
export const volumeListKey: string = "@GGAppVolume";

// export const listDirectoryURI: string = `${fs.documentDirectory}lists/`;
// export const dateListURI: string = `${fs.documentDirectory}lists/dateList.json`;
// export const pageListURI: string = `${fs.documentDirectory}lists/pageList.json`;
// export const volumeListURI: string = `${fs.documentDirectory}lists/volumeList.json`;

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

export const updateLists = async () => {
  try {
    const dateList = await getDateList();
    const { pageList, volumeList } = await collectVolumes(dateList);

    saveData(dateListKey, dateList)
    saveData(pageListKey, pageList)
    saveData(volumeListKey, volumeList)
  } catch (error) {
    console.log("An error occurred while updating comic data");
    console.error(error);
  }
};


//export const checkForLocalFiles = async () =>
//(await fs.getInfoAsync(listDirectoryURI)).exists &&
//(await fs.getInfoAsync(dateListURI)).exists &&
//(await fs.getInfoAsync(pageListURI)).exists &&
//(await fs.getInfoAsync(volumeListURI)).exists;

//export const initializeLocalFiles: () => void = async () => {
//const dateList = await getDateList();
//const {
//pageList,
//volumeList,
//}: { pageList: PageType[]; volumeList: VolumeType[] } = await collectVolumes(
//dateList
//);

//try {
//fs.makeDirectoryAsync(listDirectoryURI);
//fs.writeAsStringAsync(dateListURI, JSON.stringify(dateList));
//fs.writeAsStringAsync(pageListURI, JSON.stringify(pageList));
//fs.writeAsStringAsync(volumeListURI, JSON.stringify(volumeList));
//} catch (error) {
//console.error("error initializing list directory and/or files");
//console.error(error);
//}
//};

//export const getDateFile: () => Promise<string[]> = async () =>
//JSON.parse(await fs.readAsStringAsync(dateListURI));

//export const updateLocalFiles: (dateList: string[]) => void = async (
//dateList
//) => {
//const {
//pageList,
//volumeList,
//}: { pageList: PageType[]; volumeList: VolumeType[] } = await collectVolumes(
//dateList
//);

//fs.writeAsStringAsync(dateListURI, JSON.stringify(dateList));
//fs.writeAsStringAsync(pageListURI, JSON.stringify(pageList));
//fs.writeAsStringAsync(volumeListURI, JSON.stringify(volumeList));
//};
