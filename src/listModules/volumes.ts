import { parseTitles } from "./titles";
import { DateAndTitleType, PageType, VolumeType } from "../utils/types";

export const collectVolumes: (dates: string[]) => Promise<{
  pages: PageType[];
  volumes: VolumeType[];
}> = async (dates) => {
  const parsedTitles: DateAndTitleType[] = await parseTitles();
  // const parsedDates: string[] = JSON.parse(dates);
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
    // fs.writeAsStringAsync(pageListURI, JSON.stringify(pages));
    // fs.writeAsStringAsync(volumeListURI, JSON.stringify(volumeList));
    return { pages: pages, volumes: volumeList };
  } catch (error) {
    console.error("Error collecting volume/page data");
    console.error(error);
    // return value to simplify checking that collecting finished
    return { pages: [], volumes: [] };
  }
};
