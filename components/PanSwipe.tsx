import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
  runOnJS,
  clamp,
} from "react-native-reanimated";
import { DateContext } from "../context/DateContext";

const bg = process.env.EXPO_PUBLIC_BG_COLOR;

export default function App(props: any) {
  const { getCurrentDate, goToPreviousPage, goToNextPage } =
    useContext(DateContext);
  const { side } = props;
  const date = getCurrentDate();
  const onSide = useSharedValue(true);
  const position = useSharedValue(0);
  const END_POSITION = side === "left" ? 50 : -50;

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      console.log(position.value);
      if (onSide.value) {
        position.value = clamp(e.translationX, side === "left" ? 0 : -50 , side === "left" ? 50 : 0);
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
    borderColor: interpolateColor(
      position.value,
      [side === "left" ? 0 : -0, side === "left" ? 50 : -50],
      [bg as string, "black"]
    ),
    left: side === "left" ? 0 : null,
    right: side === "right" ? 0 : null,
    marginLeft: side === "left" ? 0 : 20,
    marginRight: side === "right" ? 0 : 20,
    borderStartWidth: side === "right" ? 0 : 10,
    borderEndWidth: side === "left" ? 0 : 10,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    height: "100%",
    width: 20,
    position: "absolute",
    zIndex: 1,
  },
});
