import { StyleSheet, Text, View } from "react-native";
import { changeList } from "../../changelog";

const changeLogItem = (item: string[], index: number) => {
  return (
    <View key={index} style={styles.changeItem}>
      <Text>{item[0]}</Text>
      <View>
        {item.slice(1).map((subItem, index) => <Text key={`item${index}`}>{subItem}</Text>)}
      </View>
    </View>
  );
};

export default function ChangeLogScreen() {
  return (
    <View style={styles.screen}>
      {changeList.map((item, index) => changeLogItem(item, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  changeItem: {
    flex: 1,
    flexDirection: "row"
  },
});
