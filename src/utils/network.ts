import axios, { AxiosResponse } from "axios";
import { PageType, VolumeType } from "./types";
import { dateListKey, pageListKey, saveData, volumeListKey } from "./storage";
import { collectVolumes } from "./volumes";

export const getRss: () => Promise<any[]> = async () => {
  const res: AxiosResponse = await axios.get(
    "http://www.girlgeniusonline.com/ggmain.rss"
  );
  const data: string = res.data;
  const dates: Set<string> = new Set(data.match(/[\d]{8}/g));
  return Array.from(dates).reverse();
};

export const getDateList: () => Promise<string[]> = async () => {
  const dateList = await axios.get(
    "https://data-collector-yuw1.onrender.com/update/dates"
  );
  return dateList.data;
};

// export const fetchNewDates: (latestDate: string) => Promise<string[]> = async (
  // latestDate
// ) => {
  // try {
    // const rss: any[] = await getRss();

    // const newDates: string[] = rss.slice(rss.indexOf(latestDate) + 1);

    // return newDates != null ? newDates : [];
  // } catch (error) {
    // console.error("Error reading/fetching/writing dates");
    // console.error(error);
    // return [];
  // }
// };

export const updateLists: () => Promise<boolean | undefined> = async () => {
  try {
    const dateList: string[] = await getDateList()
    const dateSet: Set<string> = new Set(dateList)
    const dateArray: string[] = Array.from(dateSet)
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
};
