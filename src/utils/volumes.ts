import axios, { AxiosResponse } from "axios";
import { DateAndTitleType, PageType, VolumeType } from "./types";
import Toast from "react-native-root-toast";

export const collectVolumes: (dates: string[]) => Promise<
  | {
      pageList: PageType[];
      volumeList: VolumeType[];
    }
  | undefined
> = async (dates) => {
  const parsedTitles: DateAndTitleType[] = await parseTitles();

  try {
    const volumeStarts: DateAndTitleType[] = volumeStartDates(parsedTitles);

    return collectVolumeAndPageLists(dates, volumeStarts, parsedTitles);
  } catch (error) {
    console.error("Error collecting volume/page data");
    console.error(error);
    Toast.show("error inside collectVolumes function");
  }
};

const getTitles = async () => {
  const page: AxiosResponse = await axios.get(
    `http://www.girlgeniusonline.com/comic.php?date=20021104`
  );
  const startIndex: number = page.data.indexOf("<option value='20021104'>");
  const endIndex: number = page.data.indexOf("---Jump to a Scene---<");
  const titles: string = page.data.substring(startIndex, endIndex);
  return titles;
};

const parseTitles: () => Promise<DateAndTitleType[]> = async () => {
  const res: string = await getTitles();
  const regex: RegExp = new RegExp(/^(.*)(<\/option>)/g);
  const list: string[] = res.split("<option value='");
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
};

const volumeStartDates: (titles: DateAndTitleType[]) => DateAndTitleType[] = (
  titles
) =>
  titles.filter((item: DateAndTitleType) => item.title.includes("First Page"));

const collectVolumeAndPageLists = (
  dates: string[],
  startDates: DateAndTitleType[],
  titles: DateAndTitleType[]
) => {
  const pages: PageType[] = [];
  const volumeList: VolumeType[] = startDates.map(
    (item: DateAndTitleType, volumeIndex: number) => {
      const lastDate: string | null =
        startDates[volumeIndex + 1] != null
          ? startDates[volumeIndex + 1].date
          : null;

      const volumeDates: string[] = dates.slice(
        dates.indexOf(item.date),
        lastDate != null ? dates.indexOf(lastDate) : dates.length
      );

      const filteredTitles: DateAndTitleType[] = titles.filter(
        (item: DateAndTitleType) => !item.title.includes("First Page")
      );

      const volumePages: PageType[] = volumeDates.map(
        (date: string, pageIndex: number) => {
          const title: DateAndTitleType | undefined = filteredTitles.find(
            (item: DateAndTitleType) => item.date === date
          );
          const page: PageType = {
            pageNumber: pageIndex + 1,
            date: date,
            title: title != null ? title.title : "",
            volumeNumber: volumeIndex + 1,
          };
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
};
