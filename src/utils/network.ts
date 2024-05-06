import axios, { AxiosResponse } from "axios";

export const getData: () => Promise<AxiosResponse> = async () => {
  // Fetch data from collector
  const data: AxiosResponse = await axios.get("https://data-collector-yuw1.onrender.com/");
  return data;
};

export const checkForNewData: (date: string) => Promise<AxiosResponse> = async (
  date
) => {
  const link = `https://data-collector-yuw1.onrender.com/check?date=${date}`;
  const res: AxiosResponse = await axios.get(link);
  return res.data;
};

export const update: (
  date: string
) => Promise<AxiosResponse<any, any> | undefined> = async (date) => {
  try {
    const check: AxiosResponse = await checkForNewData(date);
    if (check.data) {
      // add type for newData
      const newData = await getData();
      return newData;
    }
  } catch (error) {
    console.error(error);
  }
};
