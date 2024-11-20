import { Text, StyleSheet, SafeAreaView } from "react-native";
import NetStatus from "../src/components/NetStatus";

export default function Acknowledgements() {
  return (
    <SafeAreaView style={styles.screen}>
      <NetStatus />
      <Text style={styles.text}>
        Absolutely everything to do with Girl Genius belongs to the Foglios
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,

  },
  text: {
    width: "80%",
    textAlign: "center",
  }
});
