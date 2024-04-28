import { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScaledSize,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ComicContext } from "../context/ComicContext";
import OnEdgeProvider from "../context/OnEdgeContext";
import { PageType } from "../utils/types";
import { ImageZoomRef } from "../components/image_zoom_files/types";
import ImageZoom from "../components/image_zoom_files/components/ImageZoom";
import PageTurn from "../components/PageTurn";
import PullToRefresh from "../components/PullToRefresh";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function Home() {
  const { getCurrentPage } = useContext(ComicContext);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<ImageZoomRef>();
  const page: PageType = getCurrentPage();

  return (
    <View style={styles.comicPage}>
      <PullToRefresh/>
      {!loaded && (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.comicContainer}>
        <OnEdgeProvider>
          <PageTurn side={"left"} />
          <ImageZoom
            ref={imageRef}
            uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${page.date}.jpg`}
            minPanPointers={1}
            isDoubleTapEnabled
            resizeMode="contain"
            onLoadStart={() => {
              setLoaded(false);
              imageRef.current?.quickReset();
            }}
            onLoadEnd={() => {
              setLoaded(true);
            }}
          />
          <PageTurn side={"right"} />
        </OnEdgeProvider>
      </ScrollView>
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
    height: window.height - 150,
    width: window.width,
  },
  spinner: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
});
