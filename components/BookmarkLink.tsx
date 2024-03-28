import { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { DateContext } from "../context/DateContext";
import { formatDate } from "../utils/utilFunctions";

export default function BookmarkLink({
  date,
  nav,
}: {
  date: string;
  nav: any;
}) {
  const { removeBookmark, changeCurrentDate } = useContext(DateContext);

  useEffect(() => {});
  return (
    <View style={styles.bookmark}>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          changeCurrentDate(date);
          nav.navigate("Home");
        }}
      >
        <Text style={styles.linkText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeBookmark(date)}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookmark: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    height: 35,
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 30,
  },
  linkButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    borderWidth: 1,
  },
  linkText: {},
});
