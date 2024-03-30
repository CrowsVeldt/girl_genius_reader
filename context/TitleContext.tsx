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
      return (
        !item[1].includes("Final") &&
        !item[1].includes("NINE") &&
        (item[1].includes("Volume") ||
          item[1].includes("VOLUME") ||
          item[1].includes("BOOK") ||
          item[1].includes("Wallpaper"))
      );
    });

    setTitles(titleList);
    setVolumes(volumeList);
  }, []);

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
