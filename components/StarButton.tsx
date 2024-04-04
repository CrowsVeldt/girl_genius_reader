import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ComicContext } from "../context/ComicContext";
import { PageType } from "../utils/types";

export default function StarButton({ page }: { page: PageType }) {
  const { addBookmark, removeBookmark, isPageBookmarked } =
    useContext(ComicContext);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isPageBookmarked(page));
  }, [isPageBookmarked(page)]);

  return (
    <TouchableOpacity
      style={styles.starButton}
      onPress={() => {
        if (bookmarked) {
          removeBookmark(page);
        } else {
          addBookmark(page);
        }
        setBookmarked(!bookmarked);
      }}
    >
      <Text style={styles.star}>{bookmarked ? "★" : "☆"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  starButton: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  star: {
    color: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: "bold",
  },
});
