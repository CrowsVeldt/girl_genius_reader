import axios, { AxiosResponse } from "axios";
import {
  dateListKey,
  latestSavedDateKey,
  retrieveData,
  saveData,
} from "./storage";
import { updateLists } from "./lists";
import { lastElement, stringOfEightNumbers } from "./utilFunctions";

const rootUrl: string = "https://www.girlgeniusonline.com";

export const getDateList: () => Promise<string[]> = async () => {
  try {
    const dateList: AxiosResponse<any, any> = await axios.get(
      "https://data-collector-yuw1.onrender.com/"
    );
    return dateList != null ? dateList.data.dates : [];
  } catch (error) {
    console.log("Error in the getDateList function");
    console.error(error);
  }
};

export const getLatestDate: () => Promise<string> = async () => {
  try {
    // console.log("getting latest date");
    const { data }: AxiosResponse = await axios.get(`${rootUrl}/comic.php`);
    const index: number = data.search("topbookmark");
    const date: string = data.slice(index + 120, index + 128);
    // console.log(date);
    if (stringOfEightNumbers(date)) {
      // console.log("date is proper number")
      return date;
    } else {
      throw new Error("not a proper number");
    }
  } catch (error) {
    console.log("Error in getLatestDate function")
    console.error(error);
  }
};

export const areThereNewComics: () => Promise<boolean> = async () => {
  try {
    return (await retrieveData(latestSavedDateKey)) !== (await getLatestDate());
  } catch (error) {
    console.log("Error in areThereNewComics function");
    console.error(error);
  }
};

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
    console.log("Error in the getNextComicDate function")
    console.error(error);
  }
};

export const update: () => void = async () => {
  try {
    // If new dates are found
    const newComics = await areThereNewComics();
    if (newComics != null && !newComics) {
      // get date list
      const savedDateList = await retrieveData(dateListKey);
      const networkDateList = await getDateList();
      let dateList: string[] =
        savedDateList != null
          ? savedDateList
          : networkDateList != null
          ? networkDateList
          : ["20021104"];
      // set current date to start search
      let currentDate: string = lastElement(dateList);
      // while current date matches the date regex
      while (stringOfEightNumbers(currentDate)) {
        // get next date
        const nextDate: string = await getNextComicDate(currentDate);
        // if next date matches the date regex
        if (stringOfEightNumbers(nextDate)) {
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
          console.log("finished date update");
          updateLists();
          saveData(latestSavedDateKey, currentDate);
        }
      }
    }
  } catch (error) {
    console.log("Error in update function");
    console.error(error);
  }
};
// 20030106>20030106b (20030106 points to the wrong comic)
// 20141226a-20141226b (a is the comic, b is a wallpaper)
