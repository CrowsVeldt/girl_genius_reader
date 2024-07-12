import { ContextType, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import NetStatus from "../components/NetStatus";
import VerticalVolumeScroll from "../components/VolumeVerticalScroll";

export default function VolumeScreen({ navigation }: { navigation: any }) {
  const {
    getCurrentVolume,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const volume: VolumeType = getCurrentVolume();

  return (
    <View style={styles.page}>
      <NetStatus />
      <VerticalVolumeScroll volume={volume} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
