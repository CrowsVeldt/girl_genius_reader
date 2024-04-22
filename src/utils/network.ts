import axios, { AxiosResponse } from "axios";

export const getData: () => Promise<AxiosResponse> = async () => {
  const data = await axios.get("https://data-collector-yuw1.onrender.com/");
  return data;
};

export const checkForNewData: (date: string) => Promise<AxiosResponse> = async (
  date
) => {
  const link = `https://data-collector-yuw1.onrender.com/check?date=${date}`;
  const res = await axios.get(link);
  return res.data;
};

export const update: (
  date: string
) => Promise<AxiosResponse<any, any> | undefined> = async (date) => {
  try {
    const check = await checkForNewData(date);
    if (check.data) {
      const newData = await getData();
      return newData;
    }
  } catch (error) {
    console.error(error);
  }
};
