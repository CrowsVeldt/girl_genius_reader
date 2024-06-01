import axios, { AxiosResponse } from "axios";
import { PageType, VolumeType } from "./types";
import { dateListKey, pageListKey, saveData, volumeListKey } from "./storage";
import { collectVolumes } from "./volumes";

export const getDateList: () => Promise<string[]> = async () => {
  const dateList: AxiosResponse<any, any> = await axios.get(
    "https://data-collector-yuw1.onrender.com/update/dates"
  );
  return dateList.data;
};

export const updateLists: () => Promise<boolean> = async () => {
  try {
    const dateList: string[] = await getDateList();
    const dateSet: Set<string> = new Set(dateList);
    const dateArray: string[] = Array.from(dateSet);
    if (dateArray != null) {
      const lists:
        | { pageList: PageType[]; volumeList: VolumeType[] }
        | undefined = await collectVolumes(dateArray);

      saveData(dateListKey, dateArray);
      saveData(pageListKey, lists?.pageList);
      saveData(volumeListKey, lists?.volumeList);
      return true;
    }
  } catch (error) {
    console.log("An error occurred while updating comic data");
    console.error(error);
  }
  return false;
};
