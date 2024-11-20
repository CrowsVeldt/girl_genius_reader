import { ContextType, useContext } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { PageType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import BookmarkLink from "../components/link components/BookmarkLink";
import NetStatus from "../components/NetStatus";

export default function Bookmarks() {
  const { getBookmarks }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const bookmarks: PageType[] = getBookmarks();

  const renderItem = ({ item, index }: { item: PageType; index: number }) => (
    <BookmarkLink key={index} page={item} />
  );

  return (
    <SafeAreaView style={styles.list}>
      <NetStatus />
      {bookmarks && <FlatList data={bookmarks} renderItem={renderItem} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
