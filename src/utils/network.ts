import axios from "axios";

// TODO: host datefile in some network location
// TODO: have the datefile update each mon,wed,fri (or whenever the comic updates)
// TODO: implement function to fetch datefile startup
// export const fetchDates: () => Promise<string[] | undefined> = async () => {};

export const getData = async () => {
  const data = await axios.get("https://data-collector-yuw1.onrender.com/");
  return data;
};

export const checkForNewData = async (date: string) => {
  const link = `https://data-collector-yuw1.onrender.com/check?date=${date}`;
  const res = await axios.get(link);
  console.log(res);
  return res;
};
