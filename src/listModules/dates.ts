import * as fs from "expo-file-system";
import { getRss } from "../utils/network";
import { dateListURI } from "../utils/storage";

export const fetchDates: () => Promise<boolean> = async () => {
  try {
    const dateList: string[] = await fs
      .readAsStringAsync(dateListURI)
      .then((res) => {
        if (typeof res === "string") return JSON.parse(res);
      });

    const onlyNewDates: string[] = await getRss().then((res) => {
      return res.slice(res.indexOf(dateList[dateList.length - 1]) + 1);
    });
    const newList: string[] = [...dateList, ...onlyNewDates];
    fs.writeAsStringAsync(dateListURI, JSON.stringify(newList));
  } catch (error) {
    console.error(error);
  }

  return true;
};
