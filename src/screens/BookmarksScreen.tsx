import { ContextType, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PageType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import BookmarkLink from "../components/BookmarkLink";

export default function Bookmarks({ navigation }: any) {
  const { getBookmarks }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const bookmarks: PageType[] = getBookmarks();

  const renderItem = ({ item, index }: { item: PageType; index: number }) => (
    <BookmarkLink key={index} page={item} nav={navigation} />
  );

  return (
    <View style={styles.list}>
      {bookmarks && <FlatList data={bookmarks} renderItem={renderItem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
