import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { changeList } from "../changelog";
import NetStatus from "../components/NetStatus";
import { useState } from "react";

const RenderElement = ({
  item,
  index,
  separators,
}: {
  item: string[];
  index: number;
  separators: any;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <View key={index} style={styles.changeItem}>
      <Pressable onPress={() => setOpen(!open)} style={{ width: "80%" }}>
        <Text>{item[0]}</Text>
        {open && (
          <View style={styles.subItem}>
            {item.slice(1).map((subItem, index) => (
              <Text key={`item${index}`}>{`-- ${subItem}`}</Text>
            ))}
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default function ChangeLogScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <NetStatus />
      <FlatList
        data={changeList}
        renderItem={({ item, index, separators }) => (
          <RenderElement item={item} index={index} separators={separators} />
        )}
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
