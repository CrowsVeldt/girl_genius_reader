import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ComicContext } from "../context/ComicContext";

export default function StarButton({ date }: { date: string }) {
  const { addBookmark, removeBookmark, isDateBookmarked } =
    useContext(ComicContext);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isDateBookmarked(date));
  }, [isDateBookmarked(date)]);

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
  },
  buttonText: {
    color: "#dbbd69",
    fontSize: 40,
    lineHeight: 40,
  },
});
