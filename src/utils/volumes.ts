import axios, { AxiosResponse } from "axios";
import {
  DateAndTitleType,
  ListCollectionType,
  PageType,
  VolumeType,
} from "./types";

export const collectVolumes: (dates: string[]) => Promise<
  | {
      pageList: PageType[];
      volumeList: VolumeType[];
    }
  | undefined
> = async (dates) => {
  try {
    const parsedTitles: DateAndTitleType[] | undefined = await parseTitles();

    if (parsedTitles != undefined) {
      const volumeStarts: DateAndTitleType[] = volumeStartDates(parsedTitles);
      const lists: ListCollectionType | undefined = collectVolumeAndPageLists(
        dates,
        volumeStarts,
        parsedTitles
      );
      return lists != null ? lists : { pageList: [], volumeList: [] };
    }
  } catch (error) {
    console.warn("Error collecting volume/page data");
    console.error(error);
  }
};

const getTitles: () => Promise<string | undefined> = async () => {
  try {
    const page: AxiosResponse = await axios.get(
      `http://www.girlgeniusonline.com/comic.php?date=20021104`
    );
    const startIndex: number = page?.data.indexOf("<option value='20021104'>");
    const endIndex: number = page?.data.indexOf("---Jump to a Scene---<");
    const titles: string = page?.data.substring(startIndex, endIndex);
    return titles;
  } catch (error) {
    console.warn("Error getting titles ");
    console.error(error);
  }
};

const parseTitles: () => Promise<DateAndTitleType[] | undefined> = async () => {
  try {
    const res: string | undefined = await getTitles();
    const regex: RegExp = new RegExp(/^(.*)(<\/option>)/g);
    const list: string[] | undefined = res?.split("<option value='");
    if (list != undefined) {
      return list.map((item: string) => {
        const date: string = item.substring(0, 8);
        const titleReg: RegExpMatchArray | null = item.match(regex);
        const matchedTitle: string = titleReg != null ? titleReg[0] : "";
        const titleStartIndex: number = matchedTitle.indexOf(">");
        const titleEndIndex: number = matchedTitle.indexOf("</option>");
        const title: string = matchedTitle.substring(
          titleStartIndex + 1,
          titleEndIndex
        );
        return { date: date, title: title };
      });
    }
  } catch (error) {
    console.warn("Error in parseTitles function");
    console.error(error);
  }
};

const volumeStartDates: (titles: DateAndTitleType[]) => DateAndTitleType[] = (
  titles
) => {
  const dates = titles.filter(
    (item: DateAndTitleType) =>
      item.title.includes("First Page") || item.date === "20241025"
  );
  dates.push({ date: "20241025", title: "" });
  return dates;
};

const getVolumeDates: (
  item: DateAndTitleType,
  dates: string[],
  lastDate: string | null
) => string[] = (item, dates, lastDate) =>
  dates.slice(
    dates.indexOf(item.date),
    lastDate != null ? dates.indexOf(lastDate) : dates.length
  );

const filterTitles: (titles: DateAndTitleType[]) => DateAndTitleType[] = (
  titles
) =>
  titles.filter((item: DateAndTitleType) => !item.title.includes("First Page"));

const getPageNumber: (pageNumber: number, volumeNumber: number) => number = (
  pageNumber,
  volumeNumber
) => {
  if (volumeNumber === 4) {
    return pageNumber + 4;
  } else {
    return pageNumber;
  }
};

const collectVolumeAndPageLists: (
  dates: string[],
  startDates: DateAndTitleType[],
  titles: DateAndTitleType[]
) => ListCollectionType | undefined = (dates, startDates, titles) => {
  try {
    const pages: PageType[] = [];

    const volumeList: VolumeType[] = startDates.map(
      (item: DateAndTitleType, volumeIndex: number) => {
        const lastDate: string | null =
          startDates[volumeIndex + 1] != null
            ? startDates[volumeIndex + 1].date
            : null;

        const volumeDates: string[] = getVolumeDates(item, dates, lastDate);

        const filteredTitles: DateAndTitleType[] = filterTitles(titles);

        const volumePages: PageType[] = volumeDates.map(
          (date: string, pageIndex: number) => {
            const title: DateAndTitleType | undefined = filteredTitles.find(
              (item: DateAndTitleType) => item.date === date
            );
            const page: PageType = {
              date: date,
              title: title != null ? title.title : "",
              pageNumber: getPageNumber(pageIndex + 1, volumeIndex + 1),
              volumeNumber: volumeIndex + 1,
            };
            console.log(page)
            pages.push(page);
            return page;
          }
        );
        return {
          volumeStart: item.date,
          volumeNumber: volumeIndex + 1,
          pages: volumePages,
        };
      }
    );
    return { pageList: pages, volumeList: volumeList };
  } catch (error) {
    console.warn("Error collecting volume and page lists");
    console.error(error);
  }
};
