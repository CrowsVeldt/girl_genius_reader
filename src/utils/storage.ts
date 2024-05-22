import ass from "@react-native-async-storage/async-storage";
import { getDateList } from "./network";
import { collectVolumes } from "./volumes";
import { PageType, VolumeType } from "./types";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentPageKey: string = "@GGAppPage";
export const dateListKey: string = "@GGAppDates";
export const pageListKey: string = "@GGAppPage";
export const volumeListKey: string = "@GGAppVolume";

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

export const updateLists: () => void = async () => {
  try {
    const dateList: string[] = await getDateList();
    const {
      pageList,
      volumeList,
    }: { pageList: PageType[]; volumeList: VolumeType[] } =
      await collectVolumes(dateList);

    saveData(dateListKey, dateList);
    saveData(pageListKey, pageList);
    saveData(volumeListKey, volumeList);
  } catch (error) {
    console.log("An error occurred while updating comic data");
    console.error(error);
  }
};

export const checkForListData = async () => {
  const pageListExists = (await retrieveData(pageListKey)) != null;
  const volumeListExists = (await retrieveData(volumeListKey)) != null;
  return pageListExists && volumeListExists;
};
