import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  clamp,
  SharedValue,
} from "react-native-reanimated";
import { ComicContext } from "../context/ComicContext";
import { showToast } from "../utils/notifications";

export default function PullToRefresh(props: any) {
  // const {} = useContext(ComicContext);
  const position: SharedValue<number> = useSharedValue(0);
  const END_POSITION: number = 50;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      position.value = clamp(e.translationY, 0, 50);
    })
    .onEnd(() => {
      if (position.value >= END_POSITION) {
        runOnJS(showToast)("shit");
      }
      position.value = withTiming(0, { duration: 100 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(pan)}>
      <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    opacity: 1,
  },
});
