import axios, { Axios, AxiosResponse } from "axios";
import { latestSavedDateKey, retrieveData } from "./storage";

const rootUrl: string = "https://www.girlgeniusonline.com";

export const getLatestDate: () => Promise<string> = async () => {
  const { data }: AxiosResponse = await axios.get(`${rootUrl}/comic.php`);
  const index: number = data.search("topbookmark");
  const date: string = data.slice(index + 117, index + 125);
  return date;
};

export const checkForNewComics: () => Promise<boolean> = async () =>
  (await retrieveData(latestSavedDateKey)) === (await getLatestDate());

export const getNextComicDate: (date: string) => Promise<string> = async (
  date
) => {
  // fetch page markup
  const { data }: AxiosResponse = await axios.get(
    `${rootUrl}/comic.php?date=${date}`
  );
  // get next date
  const index: number = data.search("topnext");
  const nextDate: string = data.slice(index - 14, index - 6);
  // return next date
  return nextDate;
};

export const update: (startDate: string) => void = async (startDate) => {
  let currentDate = startDate;
  let lastDate = false;
  let dateList = [];
  while (!lastDate) {
    // starting from {start}, call getNextComicDate
    const nextDate = await getNextComicDate(currentDate);
    // add next date to list
    dateList.push(nextDate);
    // check for another next date
    const nextNextDate = await getNextComicDate(nextDate);
    const dateRegex = new RegExp("/d{8}/");
    if (nextNextDate.match(dateRegex) != null) {
      // save to storage
      // repeat loop
    } else {
      // when last date is reached save it to latestSavedDate
    }
  }
};
