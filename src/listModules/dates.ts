import * as fs from "expo-file-system";
import { getRss } from "../utils/network";
import { dateListURI } from "../utils/storage";

export const fetchDates: () => Promise<boolean> = async () => {
  try {
    const dateList: string = JSON.parse(
      await fs.readAsStringAsync(dateListURI)
    );

    const rss: any[] = await getRss();

    const onlyNewDates: string[] = rss.slice(
      rss.indexOf(dateList[dateList.length - 1]) + 1
    );

    const newList: string[] = [...dateList, ...onlyNewDates];

    fs.writeAsStringAsync(dateListURI, JSON.stringify(newList));
  } catch (error) {
    console.error(error);
  }

  return true;
};
