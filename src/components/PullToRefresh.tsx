import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ComicContext } from "../context/ComicContext";

export default function PullToRefresh() {
  const { runUpdate } = useContext(ComicContext);
  const [refresh, setRefresh] = useState<boolean>(false);
  const position: SharedValue<number> = useSharedValue(0);
  const endPosition: number = 100;
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      position.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY >= endPosition) {
        runOnJS(runUpdate)();
        runOnJS(setRefresh)(!refresh);
      }
      position.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(position.value, [0, 100], [0, 1]),
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.refreshView}>
        <Animated.View
          style={[styles.refreshSymbol, animatedStyle]}
        ></Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  refreshView: {
    position: "absolute",
    width: "100%",
    height: 80,
  },
  refreshSymbol: {
    height: 50,
    width: 50,
    backgroundColor: "red",
    borderRadius: 50,
    borderWidth: 1,
  },
});
