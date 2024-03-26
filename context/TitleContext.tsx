import React, { createContext, useState, useEffect } from "react";
import {
  retrieveData,
  saveData,
} from "../utils/storage";
import titleFile from '../public/titles.json'

type TitleContextType = {
    getTitles: () => string[][]
};

export const TitleContext = createContext<TitleContextType>(
  null as unknown as TitleContextType
);

const TitleProvider = ({ children }: { children: any }) => {
  const [titles, setTitles] = useState<string[][]>(titleFile);

  useEffect(() => {
    (async () => {})();
  }, []);

  const getTitles: () => string[][] = () => {
    return titles;
  };


  const value = {
    getTitles,
  };
  return <TitleContext.Provider value={value}>{children}</TitleContext.Provider>;
};

export default TitleProvider;
