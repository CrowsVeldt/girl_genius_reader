import { ContextType, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollDirectionType } from "../../utils/types";
import { ComicContext } from "../../context/ComicContext";

export default function ScrollDirectionSwitch() {
  const {
    getScrollDirection,
    changeScrollDirection,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const [currentDirection, setCurrentDirection] = useState<ScrollDirectionType>(
    getScrollDirection()
  );

  return (
    <View style={styles.option}>
      <Text>Volume Scroll Direction: </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            changeScrollDirection("vertical");
            setCurrentDirection("vertical");
          }}
          style={
            currentDirection === "vertical"
              ? styles.buttonCurrent
              : styles.button
          }
        >
          <Text>Vertical</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            changeScrollDirection("horizontal");
            setCurrentDirection("horizontal");
          }}
          style={
            currentDirection === "horizontal"
              ? styles.buttonCurrent
              : styles.button
          }
        >
          <Text>Horizontal</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 4,
  },
  buttonCurrent: {
    flexDirection: "row",
    justifyContent: "center",
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 4,
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
  },
});
