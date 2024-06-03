import { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ComicContext } from "../context/ComicContext";
import { VolumeList } from "../components/VolumeList";
import { VolumeType } from "../utils/types";

export default function ComicIndex({ navigation }: { navigation: any }) {
  const { getVolumes } = useContext(ComicContext);

  const volumes: VolumeType[] = getVolumes();

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {volumes != null &&
        volumes.map((volume: VolumeType, index: number) => {
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
    height: "100%",
    paddingTop: 30,
    paddingBottom: 60,
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
