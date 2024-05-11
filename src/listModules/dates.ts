import FS from "node:fs/promises" 
import PATH from "node:path"
import dateList from "../../public/dateList.json"
import { getRss } from "../utils/network"

const fetchDates: () => void = async () => {
  const root: string = PATH.resolve("./");
  const dates: string[] = dateList.length > 0 ? dateList : ["20021104"];
  const rssFeed: any[] = await getRss()
  const onlyNewDates: string[] = rssFeed.slice(rssFeed.indexOf(dates[dates.length - 1]) + 1)
  const newList: string[] = [...dates, ...onlyNewDates]

  FS.writeFile(`${root}/lists/dateList.json`, JSON.stringify(newList));
};

module.exports = { fetchDates };