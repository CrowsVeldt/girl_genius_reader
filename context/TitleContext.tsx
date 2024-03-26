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
  const [titles, setTitles] = useState<string[][]>(titleFile);
  const [volumes, setVolumes] = useState<string[][]>([]);

  useEffect(() => {
    const volumeList: string[][] = titles.filter((item) => {
      return (
        !item[1].includes("Final") &&
        (item[1].includes("Volume") ||
          item[1].includes("VOLUME") ||
          item[1].includes("BOOK"))
      );
    });
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
