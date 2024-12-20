import { ContextType, useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  clamp,
  SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ComicContext } from "../../context/ComicContext";

export default function PullToRefresh(props: any) {
  const { refresh }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const position: SharedValue<number> = useSharedValue(0);
  const END_POSITION: number = 50;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      position.value = clamp(e.translationY, 0, 50);
    })
    .onEnd(() => {
      if (position.value >= END_POSITION) {
        runOnJS(refresh)();
      }
      position.value = withTiming(0, { duration: 100 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
    opacity: interpolate(position.value, [0, 1], [0, 1]),
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(pan)}>
      <Animated.View style={styles.box}>
        <Animated.View style={[styles.spinner, animatedStyle]}>
          <ActivityIndicator size={"large"} color={"gray"} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "75%",
    height: "50%",
    position: "absolute",
    left: "12.5%",
    top: 0,
    zIndex: 1,
    opacity: 1,
  },
  spinner: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  },
});
