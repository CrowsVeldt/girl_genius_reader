import axios, { AxiosResponse } from "axios";
import { PageType, VolumeType } from "./types";
import { dateListKey, pageListKey, saveData, volumeListKey } from "./storage";
import { collectVolumes } from "./volumes";
import Toast from "react-native-root-toast";

export const getDateList: () => Promise<string[]> = async () => {
  const dateList: AxiosResponse<any, any> = await axios.get(
    "https://data-collector-yuw1.onrender.com/update/dates"
  );
  Toast.show("fetching dateList from server", {
    duration: Toast.durations.SHORT,
  });
  return dateList.data;
};

export const updateLists: () => Promise<boolean> = async () => {
  try {
    Toast.show("begin update", { duration: Toast.durations.SHORT });
    const dateList: string[] = await getDateList();
    const dateSet: Set<string> = new Set(dateList);
    const dateArray: string[] = Array.from(dateSet);
    if (dateArray != null) {
      Toast.show("dateList received and filtered", {
        duration: Toast.durations.SHORT,
      });
      const lists:
        | { pageList: PageType[]; volumeList: VolumeType[] }
        | undefined = await collectVolumes(dateArray);

      saveData(dateListKey, dateArray);
      saveData(pageListKey, lists?.pageList);
      saveData(volumeListKey, lists?.volumeList);
      return true;
    }
    Toast.show("dateList === null | undefined", {
      duration: Toast.durations.SHORT,
    });
  } catch (error) {
    console.log("An error occurred while updating comic data");
    console.error(error);
    Toast.show("an error occurred while updating", {
      duration: Toast.durations.SHORT,
    });
  }
  return false;
};

// export const getRss: () => Promise<any[]> = async () => {
// const res: AxiosResponse = await axios.get(
// "http://www.girlgeniusonline.com/ggmain.rss"
// );
// const data: string = res.data;
// const dates: Set<string> = new Set(data.match(/[\d]{8}/g));
// return Array.from(dates).reverse();
// };

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
