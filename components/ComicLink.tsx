import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function ComicLink({ date, nav }) {
  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => nav.navigate("Comic", { date: date })}
    >
      <Text style={styles.linkText}>{date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    borderColor: "black",
    borderWidth: 1,
  },
  linkText: {
    textAlign: "center",
  },
});
