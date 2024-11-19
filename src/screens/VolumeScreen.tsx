import { ContextType, useContext, useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScaledSize,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import { VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { VolumeList } from "../components/Volume Scroll components/VolumeList";
import VolumeScreenList from "../components/Volume Scroll components/VolumeScrollList";
import NetStatus from "../components/NetStatus";

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

  const { volumeNumber }: { volumeNumber: number } = route.params;
  const [image, setImage] = useState<boolean>(true);

  const volume: VolumeType = getVolume(volumeNumber);

  return (
    <SafeAreaView style={styles.page}>
      <NetStatus />
      <View style={styles.options}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.navButton, styles.navButtonPressed]
              : styles.navButton
          }
          onPress={() => {
            if (volumeNumber - 1 !== 0) {
              changeCurrentVolume(volumeNumber - 1);
              navigation.navigate("Volume", { volumeNumber: volumeNumber - 1 });
            }
          }}
        >
          <Text>Previous Volume</Text>
        </Pressable>
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
          style={({ pressed }) =>
            pressed
              ? [styles.navButton, styles.navButtonPressed]
              : styles.navButton
          }
          onPress={() => {
            // TOFIX!!!!! FINAL VOLUME NUMBER HARDCODED! FIX THIS!!!!
            if (volumeNumber + 1 !== 26) {
              changeCurrentVolume(volumeNumber + 1);
              navigation.navigate("Volume", {
                volumeNumber: volumeNumber + 1,
              });
            }
          }}
        >
          <Text>Next Volume</Text>
        </Pressable>
      </View>
      {image && (
        <VolumeScreenList pages={volume.pages} navigation={navigation} />
      )}
      {!image && <VolumeList volume={volume} nav={navigation} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  options: {
    height: 50,
    width: "100%",
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
  },
  navButtonPressed: {
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
  },
});
