import ass from "@react-native-async-storage/async-storage";
import { PageType } from "./types";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentPageKey: string = "@GGAppPage";

export const saveData: (
  key: string,
  value: number | PageType | PageType[]
) => void = async (key, value) => {
  try {
    await ass.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
};

// haven't specified return value type because it's a headache
export const retrieveData: (
  key: string
) => Promise<PageType | PageType[]> = async (key) => {
  let data;
  try {
    data = await ass.getItem(key);
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
  return data != null ? JSON.parse(data) : null;
};
