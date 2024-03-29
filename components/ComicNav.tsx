import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateContext } from "../context/DateContext";
import { lastElement } from "../utils/utilFunctions";

export default function ComicNav({ date }: { date: string }) {
  const {
    getDates,
    changeCurrentDate,
    goToNextPage,
    goToPreviousPage,
    addBookmark,
    removeBookmark,
    isDateBookmarked,
  } = useContext(DateContext);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isDateBookmarked(date));
  }, [date]);

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
        onPress={() => goToPreviousPage(date)}
      >
        <Text style={styles.buttonText}>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
          if (bookmarked) {
            removeBookmark(date);
          } else {
            addBookmark(date);
          }
          setBookmarked(!bookmarked);
        }}
      >
        <Text style={styles.buttonText}>{bookmarked ? "★" : "☆"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => goToNextPage(date)}
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
