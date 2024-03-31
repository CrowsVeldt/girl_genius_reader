import { StyleSheet, ScrollView } from "react-native";
import { useContext } from "react";
import { DateContext } from "../context/DateContext";
import { TitleContext } from "../context/TitleContext";
import { VolumeList } from "../components/VolumeList";
import { volumeObject } from "../utils/types";

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

export default function DateList({ navigation }: { navigation: any }) {
  const { getDates } = useContext(DateContext);
  const { getTitles, getVolumes } = useContext(TitleContext);

  const dates: string[] = getDates();
  const titles: string[][] = getTitles();
  const volumes: string[][] = getVolumes();
  const collectedVolumes = collectVolumes(volumes, titles, dates);

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {collectedVolumes.map((volume: volumeObject, index: number) => {
        return (
          <VolumeList
            nav={navigation}
            currentVolume={volume}
            index={index}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
    paddingBottom: 60,
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
