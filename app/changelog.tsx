import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { changeList } from "../changelog";
import NetStatus from "../src/components/NetStatus";

const changeLogItem = (item: string[], index: number) => {
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
      {changeList.map((item, index) => changeLogItem(item, index))}
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
