import ass from "@react-native-async-storage/async-storage";
import { PageType } from "./types";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentPageKey: string = "@GGAppPage";
export const pageListKey: string = "@GGAppPageList";
export const volumeListKey: string = "@GGAppVolumeList";

export const saveData: (
  key: string,
  value: any
) => void = async (key, value) => {
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
