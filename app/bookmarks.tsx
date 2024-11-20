import { ContextType, useContext } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { PageType } from "../src/utils/types";
import { ComicContext } from "../src/context/ComicContext";
import BookmarkLink from "../src/components/link components/BookmarkLink";
import NetStatus from "../src/components/NetStatus";

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
