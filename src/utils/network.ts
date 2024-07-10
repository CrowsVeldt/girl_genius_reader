import axios, { AxiosResponse } from "axios";
import { updateLists } from "./lists";
import {
  dateListKey,
  latestSavedDateKey,
  retrieveData,
  saveData,
} from "./storage";
import { lastElement, stringOfEightNumbers } from "./utilFunctions";

const rootUrl: string = "https://www.girlgeniusonline.com";

export const getDateList: () => Promise<string[]> = async () => {
  try {
    const dateList: AxiosResponse<any, any> = await axios.get(
      "https://data-collector-yuw1.onrender.com/"
    );
    return dateList != null ? dateList.data.dates : [];
  } catch (error) {
    console.warn("Error in the getDateList function");
    console.error(error);
  }
};

export const getLatestDate: () => Promise<string | undefined> = async () => {
  try {
    const { data }: AxiosResponse = await axios.get(`${rootUrl}/comic.php`);
    const index: string = data.search("javascript:setPage");
    const date: string = data.slice(index + 19, index + 27);
    if (stringOfEightNumbers(date)) {
      return date;
    } else {
      throw new Error("not a proper number");
    }
  } catch (error) {
    console.warn("Error in getLatestDate function");
    console.error(error);
  }
};

export const areThereNewComics: () => Promise<
  boolean | undefined
> = async () => {
  try {
    return (await retrieveData(latestSavedDateKey)) !== (await getLatestDate());
  } catch (error) {
    console.warn("Error in areThereNewComics function");
    console.error(error);
  }
};

export const getNextComicDate: (
  date: string
) => Promise<string | undefined> = async (date) => {
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
    console.warn("Error in the getNextComicDate function");
    console.error(error);
  }
};

export const update: () => void = async () => {
  try {
    // If new dates are found
    const newComics: boolean | undefined = await areThereNewComics();
    if (newComics != null && newComics) {
      // get date list
      const savedDateList: string[] = await retrieveData(dateListKey);
      const networkDateList: string[] = await getDateList();
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
        const nextDate: string | undefined = await getNextComicDate(
          currentDate
        );
        // if next date matches the date regex
        if (nextDate != undefined && stringOfEightNumbers(nextDate)) {
          // add to date list
          // with exceptions handled below
          if (nextDate === "20030106") {
            // 20030106>20030106b (20030106 points to the wrong comic)
            dateList.push("20030106b");
          } else if (nextDate === "20060425") {
            // 20060425b-20060425c (Authors added second page)
            dateList.push("20060425b");
            dateList.push("20060425c");
          } else if (nextDate === "20141226") {
            // 20141226a-20141226b (a is the comic, b is a wallpaper)
            dateList.push("20141226a");
            dateList.push("20141226b");
          } else {
            dateList.push(nextDate);
          }

          // set current date to next date, to progress the loop
          currentDate = nextDate;
          // save date list to memory
          saveData(dateListKey, dateList);
        } else {
          // if next date does not match the date regex
          // save current date to latestSavedDate in memory
          updateLists();
          saveData(latestSavedDateKey, currentDate);
        }
      }
    }
  } catch (error) {
    console.warn("Error in update function");
    console.error(error);
  }
};
