import axios, { AxiosResponse } from "axios";
import { ListCollectionType } from "./types";
import {
  latestSavedDateKey,
  pageListKey,
  retrieveData,
  saveData,
  volumeListKey,
} from "./storage";
import { collectVolumes } from "./volumes";
import { lastElement } from "./utilFunctions";

export const getDateList: () => Promise<string[]> = async () => {
  shouldAppUpdate();
  try {
    const dateList: AxiosResponse<any, any> = await axios.get(
      "https://data-collector-yuw1.onrender.com/update/dates/1"
    );

    return dateList.data;
  } catch (error) {
    console.error(error);
  }
};

const getDifferenceBetweenDates: (a: Date, b: string) => number = (a, b) => {
  // const currentDateString = `${currentDate.getDate()}/${
  // currentDate.getMonth().toString().length > 1
  // ? currentDate.getMonth().toString()
  // : `0${currentDate.getMonth().toString()}`
  // }/${currentDate.getFullYear()}`;
};

export const shouldAppUpdate: () => boolean | null = async () => {
  try {
    const latestSavedDate: string | null = await retrieveData(
      latestSavedDateKey
    );
    const currentDate: Date = new Date();

    //const shouldAppUpdate = currentDate.day !== 7
    //? currentDate.date > latestSavedDate.date + 1
    //? true : currentDate.date > latestSavedDate.date + 2
    //? true : false

    // if current day is not saturday
    // then:
    // if currentDate > LatestSavedDate + 1 => return true
    // else:
    // if currentDate > lastSavedDate + 2 => return true
    // else:
    // return false
    return false;
  } catch (error) {
    console.error(error);
  }
};

export const checkLists: () => Promise<boolean> = async () => {
  const pages = await retrieveData(pageListKey);
  const volumes = await retrieveData(volumeListKey);

  return pages != null && volumes != null;
};

export const updateLists: () => Promise<boolean> = async () => {
  try {
    const dateList: string[] = await getDateList();
    const dateSet: Set<string> = new Set(dateList);
    const dateArray: string[] = Array.from(dateSet);
    if (dateArray != null) {
      const lists: ListCollectionType = await collectVolumes(dateArray);

      saveData(pageListKey, lists?.pageList);
      saveData(volumeListKey, lists?.volumeList);
      saveData(latestSavedDateKey, lastElement(dateArray));

      return true;
    }
  } catch (error) {
    console.log("An error occurred while updating comic data");
    console.error(error);
  }
  return false;
};

// #TODO: implement these to exactly replace current updateLists function?

// const processDates = (dates: string[]) => Array.from(new Set(dates));

// const getLists = async () => {
// try {
// const rawDates = await getDateList();
// if (rawDates != null) {
// const processedDates: string[] = processDates(rawDates);
// return await collectVolumes(processedDates);
// } else {
// throw new Error("Data returned null");
// }
// } catch (error) {
// console.log(error);
// }
// };

// export const updateListsNew = async () => {
// try {
// const { pageList, volumeList } = await getLists();
// saveData(pageListKey, pageList);
// saveData(volumeListKey, volumeList);

// if (await checkLists()) {
// console.log("lists ready")
// }
// } catch (error) {
// console.log(error);
// }
// };
