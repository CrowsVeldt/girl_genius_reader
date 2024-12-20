import { ContextType, useContext } from "react";
import { StyleSheet } from "react-native";
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
import { PageType, SideType } from "../../utils/types";
import { ComicContext } from "../../context/ComicContext";

export default function PageTurn(props: any) {
  const {
    getCurrentPage,
    goToNextPage,
    goToPreviousPage,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const side: SideType = props.side;
  const page: PageType = getCurrentPage();
  const onSide: SharedValue<boolean> = useSharedValue(true);
  const position: SharedValue<number> = useSharedValue(0);
  const END_POSITION: number = side === "left" ? 50 : -50;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (onSide.value) {
        position.value = clamp(
          e.translationX,
          side === "left" ? 0 : -50,
          side === "left" ? 50 : 0
        );
      }
    })
    .onEnd(() => {
      if (side === "left" && position.value >= END_POSITION) {
        runOnJS(goToPreviousPage)(page);
      } else if (side === "right" && position.value <= END_POSITION) {
        runOnJS(goToNextPage)(page);
      }
      position.value = withTiming(0, { duration: 100 });
      onSide.value = true;
    });

  const tap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(() => {
      if (side === "left") {
        runOnJS(goToPreviousPage)(page);
      } else {
        runOnJS(goToNextPage)(page);
      }
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
    right: side === "right" ? 22.5 : null,
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(pan, tap)}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Animated.View style={[styles.arrow, arrowAnimatedStyle]} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    height: "100%",
    width: 35,
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
