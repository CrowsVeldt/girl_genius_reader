import { Text, View, StyleSheet } from "react-native";
import NetStatus from "../components/NetStatus";

export default function Acknowledgements() {
  return (
    <View style={styles.screen}>
      <NetStatus />
      <Text>Absolutely everything to do with Girl Genius belongs to the Foglios</Text>
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
