import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import StarButton from "./StarButton";
import { useContext } from "react";
import { ComicContext } from "../context/ComicContext";

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
  const { getCurrentDate, getCurrentPage } = useContext(ComicContext);

  const date = getCurrentDate();
  const page = getCurrentPage()
  const routeName = route.name;

  // Get Volume# and Page# from ComicContext

  return (
    <View style={[options.headerStyle, styles.header]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.buttonText}>≡</Text>
      </TouchableOpacity>
      <Text>{`Volume ${page.volume}, Page ${page.pageNumber}`}</Text>
      {routeName === "Home" && <StarButton date={date} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: StatusBar.currentHeight,
  },
  button: {
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
    width: 50,
    alignItems:'center',
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
  },
});
