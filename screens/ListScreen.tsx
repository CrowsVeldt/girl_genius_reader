import { useContext } from "react";
import { DateContext } from "../context/DateContext";
import ComicLink from "../components/ComicLink";
import { View, FlatList, StyleSheet } from "react-native";

export default function DateList({ navigation }: { navigation: any }) {
  const { getDates } = useContext(DateContext);
  const dates: string[] = getDates();

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <ComicLink key={index} date={item} nav={navigation} />
  );

  return (
    <View style={styles.list}>
      {dates && <FlatList data={dates} renderItem={renderItem} />}
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
