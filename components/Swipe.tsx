import Animated, { runOnJS } from "react-native-reanimated";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { DateContext } from "../context/DateContext";

export default function Swipe(props: any) {
  const { side } = props;
  const { goToPreviousPage, goToNextPage, getCurrentDate } =
    useContext(DateContext);
  const date = getCurrentDate();

  const gesture = Gesture.Fling()
    .direction(side === "left" ? Directions.RIGHT : Directions.LEFT)
    .onEnd((evt) => {
      if (side === "left") {
        runOnJS(goToPreviousPage)(date);
      } else {
        runOnJS(goToNextPage)(date);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={styles.swipe} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  swipe: {
    width: 20,
    height: "100%",
    zIndex: 1,
  },
});
