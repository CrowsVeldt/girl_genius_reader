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
    <View>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          changeCurrentDate(date);
          nav.navigate("Home");
        }}
      >
        <Text style={styles.linkText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeBookmark(date)}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
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
