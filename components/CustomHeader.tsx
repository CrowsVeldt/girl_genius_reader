import { View, Text, Button, StyleSheet, StatusBar } from "react-native";
import StarButton from "./StarButton";
import { useContext } from "react";
import { DateContext } from "../context/DateContext";
import { TitleContext } from "../context/TitleContext";
export default function CustomHeader({
  navigation,
  route,
  options,
  layout,
}: {
  navigation: any;
  route: any;
  options: any;
  layout: any;
}) {
  const { getCurrentDate } = useContext(DateContext);
  const date = getCurrentDate()
  const title = route.name;

    // Get Volume#, Page#, and scene title from titleContext

  return (
    <View style={[options.headerStyle, styles.header]}>
      <Button title={"≡"} onPress={() => navigation.openDrawer()} />
      <Text>{title}</Text>
          <StarButton date={date} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
        justifyContent: "space-between",
    marginTop: StatusBar.currentHeight,
  },
});
