import { fetch } from "expo/fetch";
import {
  DateAndTitleType,
  ListCollectionType,
  PageType,
  VolumeType,
} from "./types";
import { getPageNumber } from "./pageNumbers";

const getTitles: () => Promise<string | undefined> = async () => {
  try {
    const data: string = await (
      await fetch(`${process.env.EXPO_PUBLIC_ROOT_URL}/comic.php?date=20021104`)
    ).text();
    const startIndex: number = data.indexOf("<option value='20021104'>");
    const endIndex: number = data.indexOf("---Jump to a Scene---<");
    const titles: string = data.substring(startIndex, endIndex);
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

const filterTitles: (titles: DateAndTitleType[]) => DateAndTitleType[] = (
  titles
) =>
  titles.filter((item: DateAndTitleType) => !item.title.includes("First Page"));

const volumeStartDates: (titles: DateAndTitleType[]) => DateAndTitleType[] = (
  titles
) => {
  const dates = titles.filter((item: DateAndTitleType) => {
    if (
      (item.title.includes("First Page") && item.date !== "20090116") ||
      item.date === "20090114"
    ) {
      return true;
    }
  });
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

const collectVolumePages: (
  dates: string[],
  titles: DateAndTitleType[],
  volume: number
) => PageType[] = (dates, titles, volume) =>
  dates.map((date: string, pageIndex: number) => {
    const title: DateAndTitleType | undefined = titles.find(
      (item: DateAndTitleType) => item.date === date
    );
    return {
      index: pageIndex,
      date: date,
      title: title != null ? title.title : "",
      pageNumber: getPageNumber(pageIndex + 1, volume + 1),
      volumeNumber: volume + 1,
    };
  });

const collectVolumeAndPageLists: (
  dates: string[],
  startDates: DateAndTitleType[],
  titles: DateAndTitleType[]
) => ListCollectionType | undefined = (dates, startDates, titles) => {
  try {
    let pages: PageType[] = [];

    const volumeList: VolumeType[] = startDates.map(
      (item: DateAndTitleType, volumeIndex: number) => {
        const lastDate: string | null =
          startDates[volumeIndex + 1] != null
            ? startDates[volumeIndex + 1].date
            : null;

        const volumeDates: string[] = getVolumeDates(item, dates, lastDate);

        const filteredTitles: DateAndTitleType[] = filterTitles(titles);

        const volumePages: PageType[] = collectVolumePages(
          volumeDates,
          filteredTitles,
          volumeIndex
        );

        pages = [...pages, ...volumePages];
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
