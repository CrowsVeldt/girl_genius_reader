import axios, { AxiosResponse } from "axios";

export const getRss: () => Promise<any[]> = async () => {
  const res: AxiosResponse = await axios.get(
    "http://www.girlgeniusonline.com/ggmain.rss"
  );
  const data: string = res.data;
  const dates: Set<string> = new Set(data.match(/[\d]{8}/g));
  return Array.from(dates).reverse();
};

export const getPage: (
  date?: string | null
) => Promise<AxiosResponse<any, any>> = async (date) => {
  const data: AxiosResponse = await axios.get(
    `http://www.girlgeniusonline.com/comic.php?date=${
      date != null ? date : "20021104"
    }`
  );
  return data;
};

// export const getData: () => Promise<AxiosResponse> = async () => {
// // Fetch data from collector
// const data: AxiosResponse = await axios.get(
// "https://data-collector-yuw1.onrender.com/"
// );
// return data;
// };

// export const checkForNewData: (date: string) => Promise<AxiosResponse> = async (
// date
// ) => {
// // Check for new data
// const link = `https://data-collector-yuw1.onrender.com/check?date=${date}`;
// const res: AxiosResponse = await axios.get(link);
// return res.data;
// };

// export const update: (
// date: string
// ) => Promise<AxiosResponse<any, any> | undefined> = async (date) => {
// try {
// // Check if there are new dates
// const check: AxiosResponse = await checkForNewData(date);
// if (check.data) {
// // if yes:
// // fetch data
// const newData: AxiosResponse = await getData();
// // and return said data
// return newData;
// } else {
// // TODO: render toast that no new data was found
// }
// } catch (error) {
// console.error(error);
// }
// };
