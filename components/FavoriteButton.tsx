import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateContext } from "../context/DateContext";

export default function FavoriteButton({ date }: { date: string }) {
  const { addBookmark, removeBookmark, isDateBookmarked } =
    useContext(DateContext);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isDateBookmarked(date));
  }, [date]);

  return (
      <TouchableOpacity
        style={styles.favoriteButton}
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
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    height: 40,
    width: 40,
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
  buttonText: {
    color: "#dbbd69",
    fontSize: 40,
    lineHeight: 40,
  },
});
