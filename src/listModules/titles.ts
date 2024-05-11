import { AxiosResponse } from "axios";
import { getPage } from "../utils/network";
import { DateAndTitleType } from "../utils/types";

const getTitles = async () => {
  const res: AxiosResponse = await getPage();
  const startIndex: number = res.data.indexOf("<option value='20021104'>");
  const endIndex: number = res.data.indexOf("---Jump to a Scene---<");
  const titles: string = res.data.substring(startIndex, endIndex);
  return titles;
};

export const parseTitles: () => Promise<
  DateAndTitleType[]
> = async () => {
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