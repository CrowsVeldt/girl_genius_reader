import { retrieveData, saveData } from "./storage";
import { ListCollectionType, PageType, VolumeType } from "./types";
import { collectVolumes } from "./volumes";

export const checkLists: () => Promise<boolean> = async () => {
  try {
    const pages: PageType[] = await retrieveData(
      process.env.EXPO_PUBLIC_PAGE_LIST_KEY!
    );
    const volumes: VolumeType[] = await retrieveData(
      process.env.EXPO_PUBLIC_VOLUME_LIST_KEY!
    );

    return pages != null && volumes != null;
  } catch (error) {
    console.warn("Error checking lists");
    console.error(error);
    return false;
  }
};

export const processDateList: (list: string[]) => string[] = (list) =>
  Array.from(new Set(list));

export const processPageAndVolumeLists: () => Promise<ListCollectionType | undefined> = async () => {
  try {
    const dateArray: string[] = processDateList(
      await retrieveData(process.env.EXPO_PUBLIC_DATE_LIST_KEY!)
    );
    if (dateArray != null) {
      const lists: ListCollectionType | undefined = await collectVolumes(dateArray);

      saveData(process.env.EXPO_PUBLIC_PAGE_LIST_KEY!, lists?.pageList);
      saveData(process.env.EXPO_PUBLIC_VOLUME_LIST_KEY!, lists?.volumeList);

      return lists;
    }
  } catch (error) {
    console.warn("An error occurred while updating comic data");
    console.error(error);
  }
};
