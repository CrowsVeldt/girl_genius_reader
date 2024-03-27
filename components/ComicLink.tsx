import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { DateContext } from "../context/DateContext";
import { formatDate } from "../utils/utilFunctions";

export default function ComicLink({ date, nav }: { date: string; nav: any }) {
  const { changeCurrentDate } = useContext(DateContext);
  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => {
        changeCurrentDate(date);
        nav.navigate("Home");
      }}
    >
      <Text style={styles.linkText}>{formatDate(date)}</Text>
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
