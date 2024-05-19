import axios, { AxiosResponse } from "axios";
import { showToast } from "./notifcations";

export const getRss: () => Promise<any[]> = async () => {
  const res: AxiosResponse = await axios.get(
    "http://www.girlgeniusonline.com/ggmain.rss"
  );
  const data: string = res.data;
  const dates: Set<string> = new Set(data.match(/[\d]{8}/g));
  showToast("Retrieving RSS feed")
  return Array.from(dates).reverse();
};
