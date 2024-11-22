import { fetch } from "expo/fetch";
import { retrieveData, saveData } from "./storage";
import { lastElement, stringOfEightNumbers } from "./utilFunctions";
import dates from "../assets/dateList.json";

export const getLatestDate: () => Promise<string | undefined> = async () => {
  try {
    const data: string = await (
      await fetch(`${process.env.EXPO_PUBLIC_ROOT_URL}/comic.php`)
    ).text();
    const index: number = data.search("javascript:setPage");
    const date: string = data.slice(index + 19, index + 27);
    if (stringOfEightNumbers(date)) {
      return date;
    } else {
      throw new Error("Not a string of eight numbers");
    }
  } catch (error) {
    console.warn("Error in getLatestDate function");
    console.error(error);
  }
};

export const areThereNewComics: () => Promise<boolean> = async () => {
  try {
    return (
      (await retrieveData(process.env.EXPO_PUBLIC_LATEST_SAVED_DATE_KEY!)) !==
      (await getLatestDate())
    );
  } catch (error) {
    console.warn("Error in areThereNewComics function");
    console.error(error);
    return false;
  }
};

export const getNextComicDate: (
  date: string
) => Promise<string | undefined> = async (date) => {
  try {
    // fetch page markup
    const data: string = await (
      await fetch(`${process.env.EXPO_PUBLIC_ROOT_URL}/comic.php?date=${date}`)
    ).text();
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

export const updateDateList: () => Promise<string[] | undefined> = async () => {
  try {
    const savedDateList: string[] = await retrieveData(
      process.env.EXPO_PUBLIC_DATE_LIST_KEY!
    );
    const initialDateList: string[] = dates;

    const dateList =
      savedDateList != null &&
      savedDateList.length > 0 &&
      savedDateList.length > initialDateList.length
        ? savedDateList
        : initialDateList;

    // set current date to start search
    let currentDate: string = lastElement(dateList);
    // set latest date
    const latestDate = await getLatestDate();
    // while current date matches the date regex
    while (stringOfEightNumbers(currentDate) && currentDate !== latestDate) {
      // get next date
      const nextDate: string | undefined = await getNextComicDate(currentDate);
      // if next date matches the date regex
      if (nextDate != undefined && stringOfEightNumbers(nextDate)) {
        // push the date to dateList
        dateList.push(nextDate);
        // set current date to next date, to progress the loop
        currentDate = nextDate;
        // save date list to memory
        saveData(process.env.EXPO_PUBLIC_DATE_LIST_KEY!, dateList);
      }
    }
    saveData(process.env.EXPO_PUBLIC_DATE_LIST_KEY!, dateList);
    saveData(process.env.EXPO_PUBLIC_LATEST_SAVED_DATE_KEY!, currentDate);
    return dateList;
  } catch (error) {
    console.warn("Error in update function");
    console.error(error);
  }
};
