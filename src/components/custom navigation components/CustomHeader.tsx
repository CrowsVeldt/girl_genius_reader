import { ContextType, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { PageType } from "../../utils/types";
import { ComicContext } from "../../context/ComicContext";
import PullToRefresh from "../gesture components/PullToRefresh";
import StarButton from "../control components/StarButton";

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
  const {
    getCurrentPage,
    getCurrentVolume,
    changeCurrentVolume,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);

  const page: PageType = getCurrentPage();
  const volumeNumber: number = getCurrentVolume();
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
      {routeName === "ComicPage" && (
        <View style={styles.volumeLink}>
          <TouchableOpacity
            onPress={() => {
              changeCurrentVolume(page.volumeNumber);
              navigation.navigate("Volume", {
                volumeNumber: page.volumeNumber,
              });
            }}
          >
            <Text style={styles.headerTitle}>
              {`Volume ${page.volumeNumber}`}
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{` - Page ${page.pageNumber}`}</Text>
        </View>
      )}
      {routeName === "Volume" && (
        <Text style={styles.headerTitle}>{`Volume ${volumeNumber}`}</Text>
      )}
      {routeName !== "ComicPage" && routeName !== "Volume" && (
        <Text style={styles.headerTitle}>{routeName}</Text>
      )}
      {routeName === "ComicPage" && <StarButton page={page} />}
      {routeName !== "ComicPage" && <View style={styles.placeholderBox}></View>}
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
  },
  volumeLink: {
    flexDirection: "row",
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