import { StyleSheet, View } from "react-native";
import PreloadOption from "../components/control components/PreloadOptionSwitch";
import ScrollDirectionSwitch from "../components/control components/ScrollDirectionSwitch";

export default function Options({ navigation }: { navigation: any }) {
  return (
    <View style={styles.screen}>
      <ScrollDirectionSwitch />
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
    paddingVertical: 10,
  },
});
