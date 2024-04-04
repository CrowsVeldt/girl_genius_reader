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
  const { getCurrentPage } = useContext(ComicContext);

  const page = getCurrentPage();
  const routeName = route.name;

  return (
    <View style={[options.headerStyle, styles.header]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.buttonText}>≡</Text>
      </TouchableOpacity>
      <Text>
        {routeName === "Home"
          ? `Volume ${page.volume}, Page ${page.pageNumber}`
          : routeName}
      </Text>
      {routeName === "Home" && <StarButton page={page} />}
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
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
  },
});
