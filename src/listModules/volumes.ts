import FS from "node:fs/promises";
import PATH from "node:path";
import { parseTitles } from "./titles";
import { DateAndTitleType, PageType, VolumeType } from "../utils/types";

export const collectVolumes: () => void = async () => {
  const root: string = PATH.resolve("./");
  const pages: any[] = [];
  const parsedTitles: DateAndTitleType[] = await parseTitles();
  const dates: string = await FS.readFile(
    `${root}/lists/dateList.json`,
    "utf8"
  );
  const parsedDates: string[] = JSON.parse(dates);

  const volumeStarts: DateAndTitleType[] = parsedTitles.filter((item) =>
    item.title.includes("First Page")
  );

  const volumeList: VolumeType[] = volumeStarts.map((item, volumeIndex) => {
    const lastDate: string | null =
      volumeStarts[volumeIndex + 1] != null
        ? volumeStarts[volumeIndex + 1].date
        : null;

    const volumeDates: string[] = parsedDates.slice(
      parsedDates.indexOf(item.date),
      lastDate != null ? parsedDates.indexOf(lastDate) : parsedDates.length
    );

    const filteredTitles: DateAndTitleType[] = parsedTitles.filter(
      (item) => !item.title.includes("First Page")
    );

    const volumePages: PageType[] = volumeDates.map((date, pageIndex) => {
      const title: DateAndTitleType | undefined = filteredTitles.find(
        (item) => item.date === date
      );

      const page: PageType = {
        pageNumber: pageIndex + 1,
        date: date,
        title: title != null ? title.title : "",
        volumeNumber: volumeIndex + 1,
      };

      pages.push(page);

      return page;
    });

    return {
      volumeStart: item.date,
      volumeNumber: volumeIndex + 1,
      pages: volumePages,
    };
  });

  FS.writeFile(`${root}/lists/pageList.json`, JSON.stringify(pages));
  FS.writeFile(`${root}/lists/volumeList.json`, JSON.stringify(volumeList));
};
