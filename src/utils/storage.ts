import ass from "@react-native-async-storage/async-storage";
import { getDateList } from "./network";
import { collectVolumes } from "./volumes";
import { PageType, VolumeType } from "./types";

export const bookmarkKey: string = "@GGAppBookmarks";
export const currentPageKey: string = "@GGAppPage";
export const dateListKey: string = "@GGAppDates";
export const pageListKey: string = "@GGAppPageList";
export const volumeListKey: string = "@GGAppVolumeList";

export const saveData: (key: string, value: any) => void = async (
  key,
  value
) => {
  try {
    if (key != null && value != null) {
      await ass.setItem(key, JSON.stringify(value));
    } else {
      console.log("You tried to save an undefined value, dude");
    }
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
};

export const retrieveData: (key: string) => Promise<any> = async (key) => {
  try {
    const data: any = await ass.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.warn("error saving data");
    console.warn(error);
  }
};

// export const checkForListData = async () => {
  // const pageListExists = (await retrieveData(pageListKey)) != null;
  // const volumeListExists = (await retrieveData(volumeListKey)) != null;
  // return pageListExists && volumeListExists;
// };
