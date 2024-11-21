import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { changeList } from "../changelog";
import NetStatus from "../components/NetStatus";

const renderElement = (item: string[], index: number, separators: any) => {
  return (
    <View key={index} style={styles.changeItem}>
      <Text>{item[0]}</Text>
      <View style={styles.subItem}>
        {item.slice(1).map((subItem, index) => (
          <Text key={`item${index}`}>{`-- ${subItem}`}</Text>
        ))}
      </View>
    </View>
  );
};

export default function ChangeLogScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <NetStatus />
      <FlatList
        data={changeList}
        renderItem={({ item, index, separators }) =>
          renderElement(item, index, separators)
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  changeItem: {
    flexDirection: "row",
    width: "80%",
    borderColor: "black",
    borderBottomWidth: 1,
  },
  subItem: {
    flexShrink: 1,
    marginStart: 50,
  },
});
