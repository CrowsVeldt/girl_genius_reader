import * as fs from "expo-file-system";
import { getRss } from "../utils/network";

export const fetchDates: () => Promise<boolean> = async () => {
  try {
    const dateList = await fs
      .readAsStringAsync(`${fs.documentDirectory}lists/dateList.json`)
      .then((res) => {
        if (typeof res === "string") return JSON.parse(res);
      });

    const onlyNewDates: string[] = await getRss().then((res) => {
      return res.slice(res.indexOf(dateList[dateList.length - 1]) + 1);
    });
    const newList: string[] = [...dateList, ...onlyNewDates];
    fs.writeAsStringAsync(
      `${fs.documentDirectory}lists/dateList.json`,
      JSON.stringify(newList)
    );
  } catch (error) {
    console.error(error);
  }

  return true;
};
