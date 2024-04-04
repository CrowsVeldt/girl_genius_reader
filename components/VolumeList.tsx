import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import ComicLink from "./ComicLink";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { ComicDataType } from "../utils/types";

export const VolumeList = ({
  volume,
  nav,
}: {
  volume: ComicDataType;
  nav: any;
}) => {
  const [open, setOpen] = useState(false);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(setOpen)(false);
    });

  return (
    <GestureDetector gesture={doubleTap}>
      <View style={styles.list}>
        <TouchableOpacity
          style={styles.title}
          onPress={() => {
            setOpen(!open);
          }}
        >
          <Text>{volume.volumeNumber}</Text>
        </TouchableOpacity>
        <ScrollView>
          {volume.pages.map((page, index) =>
            open ? <ComicLink page={page} nav={nav} key={index} /> : null
          )}
        </ScrollView>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  list: {
    minHeight: 30,
    borderWidth: 1,
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 10,
  },
  title: {
    borderWidth: 1,
    alignItems: "center",
    width: "30%",
  },
});
