import axios from "axios";
import { latestSavedDateKey, retrieveData } from "./storage";

export const getLatestDate = async () => {
  const { data } = await axios.get("https://girlgeniusonline.com/comic.php");
  const index = data.search("topbookmark");
  const date = data.slice(index + 117, index + 125);
  return date;
};

export const checkForNewComics: () => Promise<boolean> = async () =>
  (await retrieveData(latestSavedDateKey)) === (await getLatestDate());
