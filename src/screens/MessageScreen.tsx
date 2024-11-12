import { StyleSheet, Text, View } from "react-native";
import NetStatus from "../components/NetStatus";

export default function MessageScreen() {
  return (
    <View style={styles.screen}>
      <NetStatus />
      <Text>Message Screen</Text>
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
