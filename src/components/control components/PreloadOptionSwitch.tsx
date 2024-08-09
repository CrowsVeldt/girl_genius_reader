import { ContextType, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PreloadPolicyType } from "../../utils/types";
import { ComicContext } from "../../context/ComicContext";

export default function PreloadOption() {
  const {
    getPreloadPolicy,
    changePreloadPolicy,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const [currentPolicy, setCurrentPolicy] = useState<PreloadPolicyType>(
    getPreloadPolicy()
  );

  return (
    <View style={styles.option}>
      <Text>Preload images: </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            changePreloadPolicy("always");
            setCurrentPolicy("always");
          }}
          style={
            currentPolicy === "always" ? styles.buttonCurrent : styles.button
          }
        >
          <Text>Always</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            changePreloadPolicy("wifi");
            setCurrentPolicy("wifi");
          }}
          style={
            currentPolicy === "wifi" ? styles.buttonCurrent : styles.button
          }
        >
          <Text>On WiFi Only</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            changePreloadPolicy("never");
            setCurrentPolicy("never");
          }}
          style={
            currentPolicy === "never" ? styles.buttonCurrent : styles.button
          }
        >
          <Text>Never</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10

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
