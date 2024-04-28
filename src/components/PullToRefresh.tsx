import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SharedValue, runOnJS, useSharedValue } from "react-native-reanimated";
import { ComicContext } from "../context/ComicContext";

export default function PullToRefresh() {
  const { runUpdate } = useContext(ComicContext);
  const position: SharedValue<number> = useSharedValue(0);
  const endPosition: number = 100;
  const pan = Gesture.Pan()
    // if the swipe goes a certain distance fade in the refresh symbol
    .onEnd((e) => {
      if (e.translationY >= endPosition) {
        runOnJS(runUpdate)()
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.refreshView}></View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  refreshView: {
    borderWidth: 1,
    backgroundColor: "red",
    position: "absolute",
    width: "100%",
    height: 80,
  },
});
