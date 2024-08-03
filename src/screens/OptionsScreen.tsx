import { StyleSheet, Text, View } from "react-native";
import PreloadOption from "../components/control components/PreloadOptionSwitch";

export default function Options({ navigation }: { navigation: any }) {
  return (
    <View style={styles.screen}>
      <Text>Options</Text>
      <PreloadOption />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
