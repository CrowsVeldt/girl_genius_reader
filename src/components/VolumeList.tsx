import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { TapGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture";
import { runOnJS } from "react-native-reanimated";
import ComicLink from "./ComicLink";
import { ComicDataType } from "../utils/types";

export const VolumeList = ({
  volume,
  nav,
}: {
  volume: ComicDataType;
  nav: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const doubleTap: TapGesture = Gesture.Tap()
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
          <Text>{`Volume ${volume.volumeNumber}`}</Text>
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
    width: "90%",
    paddingHorizontal: 10,
  },
  title: {
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
