import axios, { AxiosResponse } from "axios";
import { DateAndTitleType, PageType, VolumeType } from "./types";

export const collectVolumes: (dates: string[]) => Promise<{
  pageList: PageType[];
  volumeList: VolumeType[];
}> = async (dates) => {
  const parsedTitles: DateAndTitleType[] = await parseTitles();
  const pages: PageType[] = [];

  try {
    // find start dates for each volume
    const volumeStarts: DateAndTitleType[] = parsedTitles.filter(
      (item: DateAndTitleType) => item.title.includes("First Page")
    );

    //// collect volume and page data
    // start by mapping over volumeStarts
    const volumeList: VolumeType[] = volumeStarts.map(
      (item: DateAndTitleType, volumeIndex: number) => {
        // Calculate last date of current volume by decrementing from first date of next volume
        const lastDate: string | null =
          volumeStarts[volumeIndex + 1] != null
            ? volumeStarts[volumeIndex + 1].date
            : null;

        // slice dates by volume, if lastDate index is null set it to parsedDates.length
        const volumeDates: string[] = dates.slice(
          dates.indexOf(item.date),
          lastDate != null ? dates.indexOf(lastDate) : dates.length
        );

        // Filter all titles that do not include "First Page"
        const filteredTitles: DateAndTitleType[] = parsedTitles.filter(
          (item: DateAndTitleType) => !item.title.includes("First Page")
        );

        // Map over volumeDates to populate an array of pages
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

            // push page to top-level page array
            pages.push(page);

            return page;
          }
        );

        // Return volume object
        return {
          volumeStart: item.date,
          volumeNumber: volumeIndex + 1,
          pages: volumePages,
        };
      }
    );

    // write pages and volumeList to local file
    return { pageList: pages, volumeList: volumeList };
  } catch (error) {
    console.error("Error collecting volume/page data");
    console.error(error);
    return { pageList: [], volumeList: [] };
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

export const parseTitles: () => Promise<DateAndTitleType[]> = async () => {
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