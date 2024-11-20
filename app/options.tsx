import { SafeAreaView, StyleSheet, View } from "react-native";
import PreloadOption from "../components/control components/PreloadOptionSwitch";
import ScrollDirectionSwitch from "../components/control components/ScrollDirectionSwitch";
import NetStatus from "../components/NetStatus";

export default function Options({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.screen}>
      <NetStatus />
      <View style={styles.optionsContainer}>
        <ScrollDirectionSwitch />
        <PreloadOption />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  optionsContainer: {
    paddingTop: 10,
    alignItems: "stretch",
    width: "80%",
  },
});
