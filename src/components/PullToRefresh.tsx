import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

// const distance = distance of swipe downward
// const maxDistance = maximum distance
// 
// track downward distance of swipe
// if the swipe goes a certain distance fade in the refresh symbol
// if the swipe ends outside maxDistance run refresh

const pan = Gesture.Pan().onEnd((e) => {
  console.log("shit");
});

export default function PullToRefresh() {
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
