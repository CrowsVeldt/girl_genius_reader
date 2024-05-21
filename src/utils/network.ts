import axios, { AxiosResponse } from "axios";

export const getRss: () => Promise<any[]> = async () => {
  const res: AxiosResponse = await axios.get(
    "http://www.girlgeniusonline.com/ggmain.rss"
  );
  const data: string = res.data;
  const dates: Set<string> = new Set(data.match(/[\d]{8}/g));
  return Array.from(dates).reverse();
};

export const getDateList: () => Promise<string[]> = async () => {
  const dateList = await axios.get(
    "https://data-collector-yuw1.onrender.com/update/dates"
  );
  return dateList.data;
};

export const fetchNewDates: (latestDate: string) => Promise<string[]> = async (
  latestDate
) => {
  try {
    const rss: any[] = await getRss();

    return rss.slice(rss.indexOf(latestDate) + 1);

  } catch (error) {
    console.error("Error reading/fetching/writing dates");
    console.error(error);
    return [];
  }
};
