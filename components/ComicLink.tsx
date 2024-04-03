import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { formatDate } from "../utils/utilFunctions";
import { ComicContext } from "../context/ComicContext";

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
  const { changeCurrentDate } = useContext(ComicContext);
  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => {
        changeCurrentDate(date);
        nav.navigate("Home");
      }}
    >
      <Text style={styles.linkNumber}>{`Page ${num}`}</Text>
      <Text style={styles.linkText}>{formatDate(date)}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1
  },
  linkNumber: {
    flex: 1
  },
  linkText: {
    flex: 2
  },
  title: {
    flex: 2,
    overflow: "visible"
  }
});
