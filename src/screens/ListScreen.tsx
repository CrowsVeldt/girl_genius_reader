import { StyleSheet, ScrollView } from "react-native";
import { useContext } from "react";
import { ComicContext } from "../context/ComicContext";
import { ComicDataType } from "../utils/types";
import { VolumeList } from "../components/VolumeList";

export default function DateList({ navigation }: { navigation: any }) {
  const { getVolumes } = useContext(ComicContext);

  const volumes: ComicDataType[] = getVolumes();

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {volumes.map((volume: ComicDataType, index: number) => {
        return <VolumeList nav={navigation} volume={volume} key={index} />;
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
