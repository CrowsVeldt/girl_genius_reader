import axios from "axios";

export const getData = async () => {
  const data = await axios.get("https://data-collector-yuw1.onrender.com/");
  return data;
};

export const checkForNewData = async (date: string) => {
  const link = `https://data-collector-yuw1.onrender.com/check?date=${date}`;
  const res = await axios.get(link);
  return res.data;
};

export const update = async (date: string) => {
  const check = await checkForNewData(date)
  if (check.data) {
    const newData = await getData()
  }

}