import { View, FlatList, StyleSheet } from "react-native";
import { NavTable } from "../components/nav table components/NavTable";

export default function DateList({ navigation }: { navigation: any }) {
  return (
    <View style={styles.list}>
      <NavTable />
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
