import { useContext } from "react";
import { DateContext } from "../context/DateContext";
import { View, FlatList, StyleSheet } from "react-native";
import BookmarkLink from "../components/BookmarkLink";

export default function Bookmarks({ navigation }) {
  const { getBookmarks } = useContext(DateContext);
  const bookmarks: string[] = getBookmarks();

  const renderItem = ({ item, index }) => (
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
    width: "40%",
  },
});
