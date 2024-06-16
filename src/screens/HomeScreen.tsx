import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScaledSize,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ComicContext } from "../context/ComicContext";
import PageTurn from "../components/PageTurn";
import VerticalPageView from "../components/VerticalPageView";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function Home() {
  const { getDataStatus } = useContext(ComicContext);
  const [loaded, setLoaded] = useState<boolean>(false);
  const dataReady: boolean = getDataStatus();

  return (
    <View style={styles.comicPage}>
      {!loaded && (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
      {dataReady && (
        <ScrollView contentContainerStyle={styles.comicContainer}>
          <PageTurn side={"left"} />
          <VerticalPageView />
          <PageTurn side={"right"} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  comicPage: {
    paddingTop: 50,
    height: screen.height,
    width: screen.width,
    alignContent: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  comicContainer: {
    height: "100%",
    width: window.width,
  },
  spinner: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

// <ImageZoom
// ref={imageRef}
// uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${page.date}.jpg`}
// minPanPointers={1}
// isDoubleTapEnabled
// resizeMode="contain"
// onLoadStart={() => {
// setLoaded(false);
// imageRef.current?.quickReset();
// }}
// onLoadEnd={() => {
// setLoaded(true);
// }}
// />
