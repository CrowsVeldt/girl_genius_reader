import { ContextType, useContext, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScaledSize,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import { VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { VolumeList } from "../components/VolumeList";
import VolumeScreenList from "../components/Volume Scroll components/VolumeScrollList";

const window: ScaledSize = Dimensions.get("window");

export default function VolumeScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { getVolume, changeCurrentVolume }: ContextType<typeof ComicContext> =
    useContext(ComicContext);

  const [image, setImage] = useState<boolean>(true);
  const { volumeNumber }: { volumeNumber: number } = route.params;

  const volume: VolumeType = getVolume(volumeNumber);

  return (
    <View style={styles.page}>
      <View style={styles.options}>
        <Pressable
        style={styles.navButton}
          onPress={() => {
            if (volumeNumber - 1 !== 0) {
              changeCurrentVolume(volumeNumber - 1);
              navigation.navigate("Volume", { volumeNumber: volumeNumber - 1 });
            }
          }}
        ><Text>Previous Volume</Text></Pressable>
        <View style={styles.toggle}>
          <Text>Links</Text>
          <Switch
            onValueChange={() => setImage(!image)}
            thumbColor={image ? "blue" : "lightgray"}
            value={image}
          />
          <Text>Pages</Text>
        </View>
          <Pressable
          style={styles.navButton}
            onPress={() => {
              // TOFIX!!!!! FINAL VOLUME NUMBER HARDCODED! FIX THIS!!!!
              if (volumeNumber + 1 !== 26) {
                changeCurrentVolume(volumeNumber + 1);
                navigation.navigate("Volume", {
                  volumeNumber: volumeNumber + 1,
                });
              }
            }}
          ><Text>Next Volume</Text></Pressable>
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
    height: "100%",
    width: "100%",
  },
  options: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  navButton: {
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 10,
    borderWidth: 1,
  }
});
