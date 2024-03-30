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
import { DateContext } from "../context/DateContext";

export default function App(props: any) {
  const { getCurrentDate, goToPreviousPage, goToNextPage } =
    useContext(DateContext);
  const { side } = props;
  const date: string = getCurrentDate();
  const onSide: SharedValue<boolean> = useSharedValue(true);
  const position: SharedValue<number> = useSharedValue(0);
  const END_POSITION: number = side === "left" ? 50 : -50;

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onSide.value) {
        position.value = clamp(
          e.translationX,
          side === "left" ? 0 : -50,
          side === "left" ? 50 : 0
        );
      }
    })
    .onEnd((e) => {
      if (side === "left" && position.value >= END_POSITION) {
        runOnJS(goToPreviousPage)(date);
      } else if (side === "right" && position.value <= END_POSITION) {
        runOnJS(goToNextPage)(date);
      }
      position.value = withTiming(0, { duration: 100 });
      onSide.value = true;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    left: side === "left" ? 0 : null,
    right: side === "right" ? 0 : null,
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      position.value,
      side === "left" ? [0, 50] : [0, -50],
      [0, 1]
    ),
    transform: [side === "left" ? { rotate: "45deg" } : { rotate: "-135deg" }],
    left: side === "left" ? 0 : null,
    right: side === "right" ? 22.5 : null
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Animated.View style={[styles.arrow, arrowAnimatedStyle]} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    height: "100%",
    width: 20,
    position: "absolute",
    zIndex: 1,
    opacity: 1,
  },
  arrow: {
    height: 45,
    width: 45,
    borderStartWidth: 5,
    borderBottomWidth: 5,
    borderColor: "white",
    position: "relative",
    top: 250,
  },
});
