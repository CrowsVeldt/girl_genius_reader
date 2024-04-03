import ass from "@react-native-async-storage/async-storage";
import { PageType } from "./types";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentDateKey: string = "@GGAppCurrent";
export const currentVolumeKey: string = "@GGAppVolume";
export const currentPageKey: string = "@GGAppPage";

export const saveData: (key: string, value: string | string[] | number | PageType ) => void = async (
  key,
  value
) => {
  try {
    if (typeof value === "string") {
      await ass.setItem(key, value);
    } else {
      await ass.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
};

// haven't specified return value type because it's a headache
export const retrieveData = async (key: string) => {
  try {
    const data = await ass.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
};
