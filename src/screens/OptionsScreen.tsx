import { StyleSheet, View } from "react-native";
import PreloadOption from "../components/control components/PreloadOptionSwitch";
import ScrollDirectionSwitch from "../components/control components/ScrollDirectionSwitch";
import NetStatus from "../components/NetStatus";

export default function Options({ navigation }: { navigation: any }) {
  return (
    <View style={styles.screen}>
      <NetStatus />
      <View style={styles.optionsContainer}>
        <ScrollDirectionSwitch />
        <PreloadOption />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
    paddingVertical: 10,
  },
  optionsContainer: {
    alignSelf: "center",
    alignItems: "stretch",
    width: "80%",
  },
});
