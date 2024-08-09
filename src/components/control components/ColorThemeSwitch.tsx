import { ContextType, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ComicContext } from "../../context/ComicContext";

export default function ColorThemeOption() {
  const { changeColorTheme, getColorTheme }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const [currentColorTheme, setCurrentColorTheme] = useState<string>(
    getColorTheme()
  );

  return (
    <View style={styles.option}>
      <Text>Color Theme: </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            changeColorTheme("light");
            setCurrentColorTheme("light");
          }}
          style={
            currentColorTheme === "light" ? styles.buttonCurrent : styles.button
          }
        >
          <Text>Light</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            changeColorTheme("dark");
            setCurrentColorTheme("dark");
          }}
          style={
            currentColorTheme === "dark" ? styles.buttonCurrent : styles.button
          }
        >
          <Text>Dark</Text>
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
