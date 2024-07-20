import { ContextType, useContext, useState } from "react";
import { Dimensions, ScaledSize, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { VolumeList } from "../components/VolumeList";
import VolumeScreenList from "../components/VolumeScrollList";

const window: ScaledSize = Dimensions.get("window");

export default function VolumeScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { getVolume }: ContextType<typeof ComicContext> =
    useContext(ComicContext);

  const [image, setImage] = useState<boolean>(true);
  const { volumeNumber }: { volumeNumber: number } = route.params;

  const volume: VolumeType = getVolume(volumeNumber);

  return (
    <View style={styles.page}>
      <View style={styles.options}>
        <View style={styles.toggle}>
          <Text>Links</Text>
          <Switch
            onValueChange={() => setImage(!image)}
            thumbColor={image ? "blue" : "lightgray"}
            value={image}
          />
          <Text>Pages</Text>
        </View>
      </View>
      {image && (
        <VolumeScreenList pages={volume.pages} navigation={navigation} />
      )}
      {!image && <VolumeList volume={volume} nav={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  options: {
    flexDirection: "row",
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
