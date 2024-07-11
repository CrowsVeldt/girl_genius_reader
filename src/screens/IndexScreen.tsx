import { ContextType, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { VolumeList } from "../components/VolumeList";
import NetStatus from "../components/NetStatus";

export default function ComicIndex({ navigation }: { navigation: any }) {
  const { getVolumes }: ContextType<typeof ComicContext> =
    useContext(ComicContext);

  const volumes: VolumeType[] = getVolumes();

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <NetStatus />
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
    paddingTop: 30,
    paddingBottom: 60,
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
