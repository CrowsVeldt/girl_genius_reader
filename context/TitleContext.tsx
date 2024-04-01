import React, { createContext, useState, useEffect } from "react";
import titleFile from "../public/titles.json";

type TitleContextType = {
  getTitles: () => string[][];
  getVolumes: () => string[][];
};

export const TitleContext = createContext<TitleContextType>(
  null as unknown as TitleContextType
);

const TitleProvider = ({ children }: { children: any }) => {
  const [titles, setTitles] = useState<string[][]>([]);
  const [volumes, setVolumes] = useState<string[][]>([]);

  useEffect(() => {
    const list = titleFile;

    const titleList: string[][] = list.filter((item) => {
      return !(
        item[1].includes("Final") ||
        item[1].includes("Volume") ||
        item[1].includes("VOLUME") ||
        item[1].includes("BOOK") ||
        item[1].includes("---Jump to a Scene---")
      );
    });

    const volumeList: string[][] = list.filter((item) => {
      // list of conditions and exceptions to find the beginnings of volumes
      return (
        !item[1].includes("Final") &&
        !item[1].includes("Volume NINE") &&
        (item[1].includes("Volume") ||
          item[1].includes("VOLUME") ||
          item[1].includes("BOOK") ||
          item[1].includes("Volume Nine Web Cover & Wallpaper"))
      );
    });

    setTitles(titleList);
    setVolumes(volumeList);
  }, []);


  // TODO: Combine DateContext and TitleContext into ComicContext
  // Organize volumes into objects {Volume#: {date# : [page#, sceneTitle]}}
  // add getVolumeForDate(date), getTitleForDate(date), and getPageNumForDate(date)

  const getTitles = () => {
    return titles;
  };

  const getVolumes = () => {
    return volumes;
  };

  const value = {
    getTitles,
    getVolumes,
  };
  return (
    <TitleContext.Provider value={value}>{children}</TitleContext.Provider>
  );
};

export default TitleProvider;

// const collectVolumes = (
//   volumes: string[][],
//   titles: string[][],
//   dates: string[]
// ) => {
//   return volumes.map((volume, index) => {
//     const endDate =
//       volumes[index + 1] != undefined ? volumes[index + 1][0] : "end";

//     const volumeDates = dates.slice(
//       dates.indexOf(volume[0]),
//       dates.indexOf(endDate)
//     );

//     const volumeTitles = titles.filter((title) =>
//       volumeDates.includes(title[0])
//     );

//     return { volume: volume, dates: volumeDates, titles: volumeTitles };
//   });
// };