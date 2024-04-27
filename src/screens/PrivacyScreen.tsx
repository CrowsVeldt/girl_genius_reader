import { Text, View, StyleSheet } from "react-native";

export default function Privacy() {
  return (
    <View style={styles.screen}>
      <Text style={styles.notice}>
        This app doesn't collect, save, share, or in anyway make use of any user
        data.
      </Text>
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
  notice: {
    width: "80%",
    textAlign: "center",
  },
});
