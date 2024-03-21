import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { DateContext } from "../context/DateContext";
import { lastElement } from "../utils/utilFunctions";

export default function ComicNav({ date, nav }) {
  const { getDates, changeCurrentDate } = useContext(DateContext);

  const dates: string[] = getDates();

  const index: number = dates.findIndex((element) => element === date);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => changeCurrentDate("20021104")}
      >
        <Text>{"<<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() =>
          changeCurrentDate(index - 1 >= 0 ? dates[index - 1] : date)
        }
      >
        <Text>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => nav.navigate("Bookmarks")}
      >
        <Text>{"Bookmarks"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={
          () =>
            changeCurrentDate(
              dates[index + 1] ? dates[index + 1] : date
            ) /* I don't know why this works but it does */
        }
      >
        <Text>{">"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => changeCurrentDate(lastElement(dates))}
      >
        <Text>{">>"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowButton: {
    width: 82,
    height: 36,
    borderWidth: 1,
    borderColor: "black",
  },
});