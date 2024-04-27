import { Text, View, StyleSheet } from "react-native";

export default function Acknowledgements () {
    return (
        <View style={styles.screen}>
            <Text>Acknowledgments</Text>
        </View>
    )
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
