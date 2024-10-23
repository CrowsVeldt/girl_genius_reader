import { ContextType, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { PageType } from "../../utils/types";
import { ComicContext } from "../../context/ComicContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function StarButton({ page }: { page: PageType }) {
  const {
    addBookmark,
    removeBookmark,
    isPageBookmarked,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    setBookmarked(isPageBookmarked(page));
  }, [isPageBookmarked(page)]);

  return (
    <TouchableOpacity
      style={styles.starButton}
      accessibilityLabel={
        bookmarked
          ? "Bookmark Button - Bookmarked"
          : "Bookmark Button - Not Bookmarked"
      }
      onPress={() => {
        if (bookmarked) {
          removeBookmark(page);
        } else {
          addBookmark(page);
        }
        setBookmarked(!bookmarked);
      }}
    >
      <MaterialIcons name={bookmarked ? "bookmark" : "bookmark-outline"} size={36} color={process.env.EXPO_PUBLIC_DARK_BG_COLOR}/>
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
