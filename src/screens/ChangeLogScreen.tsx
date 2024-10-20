import { StyleSheet, Text, View } from "react-native";
import { changeList } from "../../changelog";

export default function ChangeLogScreen() {
  return (
    <View style={styles.screen}>
    {changeList.map((item, index) => <Text key={index} style={styles.changeItem}>{`${item[0]}:  ${item[1]}`}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  changeItem: {
    margin: 10
  }
});