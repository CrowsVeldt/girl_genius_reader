import { ContextType, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { PageType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import PullToRefresh from "./PullToRefresh";
import StarButton from "./StarButton";

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
  const { getCurrentPage }: ContextType<typeof ComicContext> =
    useContext(ComicContext);

  const page: PageType = getCurrentPage();
  const routeName: string = route.name;

  return (
    <View style={[options.headerStyle, styles.header]}>
      <PullToRefresh />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.buttonText}>≡</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {routeName === "Home"
          ? `Volume ${page.volumeNumber} - Page ${page.pageNumber}`
          : routeName}
      </Text>
      {routeName === "Home" && <StarButton page={page} />}
      {routeName !== "Home" && <View style={styles.placeholderBox}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: StatusBar.currentHeight,
    width: "100%",
  },
  headerTitle: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 18,
    flexGrow: 1,
  },
  button: {
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
    width: 50,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
  },
  placeholderBox: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
});
