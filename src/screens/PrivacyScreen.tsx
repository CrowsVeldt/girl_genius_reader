import { Text, StyleSheet, SafeAreaView } from "react-native";
import NetStatus from "../components/NetStatus";

export default function Privacy() {
  return (
    <SafeAreaView style={styles.screen}>
      <NetStatus />
      <Text style={styles.notice}>
        This app doesn't collect, save, share, or in anyway make use of any user
        data.
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
  notice: {
    width: "80%",
    textAlign: "center",
  },
});
