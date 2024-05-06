import axios, { AxiosDefaults, AxiosResponse } from "axios";

export const getData: () => Promise<AxiosResponse> = async () => {
  // Fetch data from collector
  const data: AxiosResponse = await axios.get(
    "https://data-collector-yuw1.onrender.com/"
  );
  return data;
};

export const checkForNewData: (date: string) => Promise<AxiosResponse> = async (
  date
) => {
  // Check for new data
  const link = `https://data-collector-yuw1.onrender.com/check?date=${date}`;
  const res: AxiosResponse = await axios.get(link);
  return res.data;
};

export const update: (
  date: string
) => Promise<AxiosResponse<any, any> | undefined> = async (date) => {
  try {
    // Check if there are new dates
    const check: AxiosResponse = await checkForNewData(date);
    if (check.data) {
      // if yes:
      // fetch data
      const newData: AxiosResponse = await getData();
      // and return said data
      return newData;
    } else {
      // TODO: render toast that no new data was found
    }
  } catch (error) {
    console.error(error);
  }
};
