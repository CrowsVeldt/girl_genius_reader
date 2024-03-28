import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { DateContext } from "../context/DateContext";
import { formatDate } from "../utils/utilFunctions";

export default function ComicLink({
  date,
  nav,
  num,
  title,
}: {
  date: string;
  nav: any;
  num: number;
  title?: string;
}) {
  const { changeCurrentDate } = useContext(DateContext);
  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => {
        changeCurrentDate(date);
        nav.navigate("Home");
      }}
    >
      <Text>{`Page ${num}`}</Text>
      <Text style={styles.linkText}>{formatDate(date)}</Text>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linkText: {
    textAlign: "center",
  },
});
