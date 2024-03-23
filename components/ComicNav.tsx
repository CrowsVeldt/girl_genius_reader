import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { DateContext } from "../context/DateContext";
import { lastElement } from "../utils/utilFunctions";

export default function ComicNav({ nav }: { nav: any }) {
  const { getDates, changeCurrentDate, getCurrentDate } = useContext(DateContext);
  const date = getCurrentDate()
  const dates: string[] = getDates();

  const index: number = dates.findIndex((element) => element === date);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => changeCurrentDate("20021104")}
      >
        <Text style={styles.buttonText}>{"<<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() =>
          changeCurrentDate(index - 1 >= 0 ? dates[index - 1] : date)
        }
      >
        <Text style={styles.buttonText}>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => nav.navigate("Bookmarks")}
      >
        <Text style={styles.buttonText}>{"Bookmarks"}</Text>
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
        <Text style={styles.buttonText}>{">"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => changeCurrentDate(lastElement(dates))}
      >
        <Text style={styles.buttonText}>{">>"}</Text>
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
    borderColor: "#9b7434",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#220f07",
  },
  buttonText: {
    color: "#dbbd69",
  },
});
