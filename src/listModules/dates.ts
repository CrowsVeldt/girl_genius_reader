import * as fs from "expo-file-system";
import { getRss } from "../utils/network";
import { dateListURI } from "../utils/storage";

export const fetchNewDates: (latestDate: string) => Promise<string[]> = async (
  latestDate
) => {
  try {
    // get latest rss info
    const rss: any[] = await getRss();

    // get only new dates from rss
    const onlyNewDates: string[] = rss.slice(rss.indexOf(latestDate) + 1);

    // write dates back to datelist
    return onlyNewDates;
  } catch (error) {
    console.error("Error reading/fetching/writing dates");
    console.error(error);
    return [""];
  }
};

// export const fetchDates: () => Promise<boolean> = async () => {
// try {
// // fetch and parse dateList
// const dateList: string = JSON.parse(
// await fs.readAsStringAsync(dateListURI)
// );

// // get latest rss info
// const rss: any[] = await getRss();

// // get only new dates from rss
// const onlyNewDates: string[] = rss.slice(
// rss.indexOf(dateList[dateList.length - 1]) + 1
// );

// // combine datelist with new dates
// const newList: string[] = [...dateList, ...onlyNewDates];

// // write dates back to datelist
// fs.writeAsStringAsync(dateListURI, JSON.stringify(newList));
// } catch (error) {
// console.error("Error reading/fetching/writing dates");
// console.error(error);
// return false;
// }

// return true;
// };
