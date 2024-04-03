import { useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import BookmarkLink from "../components/BookmarkLink";
import { ComicContext } from "../context/ComicContext";

export default function Bookmarks({ navigation }: any) {
  const { getBookmarks } = useContext(ComicContext);
  const bookmarks: string[] = getBookmarks();

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <BookmarkLink key={index} date={item} nav={navigation} />
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
