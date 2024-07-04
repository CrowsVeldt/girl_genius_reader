import axios, { AxiosResponse } from "axios";
import {
  dateListKey,
  latestSavedDateKey,
  retrieveData,
  saveData,
} from "./storage";
import { processDateList, updateLists } from "./lists";
import { lastElement } from "./utilFunctions";

const rootUrl: string = "https://www.girlgeniusonline.com";

export const getDateList: () => Promise<string[]> = async () => {
  try {
    const dateList: AxiosResponse<any, any> = await axios.get(
      "https://data-collector-yuw1.onrender.com/update/dates/"
    );

    return processDateList(dateList.data);
  } catch (error) {
    console.error(error);
  }
};

export const getLatestDate: () => Promise<string> = async () => {
  const { data }: AxiosResponse = await axios.get(`${rootUrl}/comic.php`);
  const index: number = data.search("topbookmark");
  const date: string = data.slice(index + 117, index + 125);
  return date;
};

export const areThereNewComics: () => Promise<boolean> = async () =>
  (await retrieveData(latestSavedDateKey)) === (await getLatestDate());

export const getNextComicDate: (date: string) => Promise<string> = async (
  date
) => {
  try {
    
  // fetch page markup
  const { data }: AxiosResponse = await axios.get(
    `${rootUrl}/comic.php?date=${date}`
  );
  // get next date
  const index: number = data.search("topnext");
  const nextDate: string = data.slice(index - 14, index - 6);
  // return next date
  return nextDate;
  } catch (error) {
    
    console.error(error)
  }
};

export const update: () => void = async () => {
  try {
    // If new dates are found
    //if (await areThereNewComics()) {
    const dateRegex: RegExp = new RegExp(/\d{8}/);
    // get date list
    let dateList: string[] = await getDateList();
    // set current date to start search
    let currentDate: string = lastElement(dateList);
    // while current date matches the date regex
    while (currentDate.match(dateRegex) !== null) {
      // get next date
      const nextDate: string = await getNextComicDate(currentDate);
      // if next date matches the date regex
      if (nextDate.match(dateRegex) !== null) {
        // add to date list
        dateList.push(
          nextDate === "20030106"
            ? "20030106b"
            : nextDate === "20141226"
            ? "20141226a"
            : nextDate
        );
        // set current date to next date, to progress the loop
        currentDate = nextDate;
        // save date list to memory
        saveData(dateListKey, dateList);
      } else {
        // if next date does not match the date regex
        // save current date to latestSavedDate in memory
        updateLists();
        saveData(latestSavedDateKey, currentDate);
        break;
      }
    }
    //    }
  } catch (error) {
    console.error(error);
  }
};
// 20030106>20030106b (20030106 points to the wrong comic)
// 20141226a-20141226b (a is the comic, b is a wallpaper)
