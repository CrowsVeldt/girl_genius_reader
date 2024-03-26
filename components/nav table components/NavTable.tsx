import { View, Text } from "react-native";
import { useContext } from "react";
import { DateContext } from "../../context/DateContext";
import { TitleContext } from "../../context/TitleContext";
import { VolumeList } from "./VolumeList";
import { volumeObject } from "../../utils/types";

const collectVolumes = (
  volumes: string[][],
  titles: string[][],
  dates: string[]
) => {
  return volumes.map((volume, index) => {
    const endDate =
      volumes[index + 1] != undefined ? volumes[index + 1][0] : "end";

    const volumeDates = dates.slice(
      dates.indexOf(volume[0]),
      dates.indexOf(endDate)
    );

    const volumeTitles = titles.filter((title) =>
      volumeDates.includes(title[0])
    );

    return { volume: volume, dates: volumeDates, titles: volumeTitles };
  });
};

export const NavTable = () => {
  const { getDates } = useContext(DateContext);
  const { getTitles, getVolumes } = useContext(TitleContext);

  const dates: string[] = getDates();
  const titles: string[][] = getTitles();
  const volumes: string[][] = getVolumes();
  const collectedVolumes = collectVolumes(volumes, titles, dates);

  return (
    <View>
      {collectedVolumes.map((volume: volumeObject, index: number) => {
        return (
          <VolumeList
            currentVolume={volume} 
            index={index}
            key={index}
          />
        );
      })}
    </View>
  );
};
