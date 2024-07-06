import {
  dateListKey,
  pageListKey,
  retrieveData,
  saveData,
  volumeListKey,
} from "./storage";
import { ListCollectionType } from "./types";
import { collectVolumes } from "./volumes";

export const checkLists: () => Promise<boolean | undefined> = async () => {
  try {
    const pages = await retrieveData(pageListKey);
    const volumes = await retrieveData(volumeListKey);

    return pages != null && volumes != null;
  } catch (error) {
    console.warn("Error checking lists");
    console.error(error);
  }
};

export const processDateList: (list: string[]) => string[] = (list) =>
  Array.from(new Set(list));

export const updateLists: () => Promise<boolean> = async () => {
  try {
    const dateArray = processDateList(await retrieveData(dateListKey));
    if (dateArray != null) {
      const lists: ListCollectionType = await collectVolumes(dateArray);

      saveData(pageListKey, lists?.pageList);
      saveData(volumeListKey, lists?.volumeList);

      return true;
    }
  } catch (error) {
    console.warn("An error occurred while updating comic data");
    console.error(error);
  }
  return false;
};
