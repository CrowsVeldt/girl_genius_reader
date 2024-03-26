import { useContext } from "react";
import { DateContext } from "../context/DateContext";
import ComicLink from "../components/ComicLink";
import { View, FlatList, StyleSheet } from "react-native";
import { TitleContext } from "../context/TitleContext";

export default function DateList({ navigation }: { navigation: any }) {
  const { getDates } = useContext(DateContext);
  const { getTitles, getVolumes } = useContext(TitleContext);

  const dates: string[] = getDates();
  const titles: string[][] = getTitles();
  const volumes: string[][] = getVolumes();

  return <View style={styles.list}></View>;
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: "center",
    width: "40%",
  },
});
