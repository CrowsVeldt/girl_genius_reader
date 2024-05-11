import * as fs from "expo-file-system"
import { parseTitles } from "./titles";
import { DateAndTitleType, PageType, VolumeType } from "../utils/types";

export const collectVolumes: () => void = async () => {
  const pages: PageType[] = [];
  const parsedTitles: DateAndTitleType[] = await parseTitles();
  const dates: string = await fs.readAsStringAsync(`${fs.documentDirectory}lists/dateList.json`);
  const parsedDates: string[] = JSON.parse(dates);

  const volumeStarts: DateAndTitleType[] = parsedTitles.filter(
    (item: DateAndTitleType) => item.title.includes("First Page")
  );

  const volumeList: VolumeType[] = volumeStarts.map(
    (item: DateAndTitleType, volumeIndex: number) => {
      const lastDate: string | null =
        volumeStarts[volumeIndex + 1] != null
          ? volumeStarts[volumeIndex + 1].date
          : null;

      const volumeDates: string[] = parsedDates.slice(
        parsedDates.indexOf(item.date),
        lastDate != null ? parsedDates.indexOf(lastDate) : parsedDates.length
      );

      const filteredTitles: DateAndTitleType[] = parsedTitles.filter(
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

  fs.writeAsStringAsync(`${fs.documentDirectory}lists/pageList.json`, JSON.stringify(pages));
  fs.writeAsStringAsync(`${fs.documentDirectory}lists/volumeList.json`, JSON.stringify(volumeList));
};
