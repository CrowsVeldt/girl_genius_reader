import { ContextType, useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScaledSize,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { PageType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { ImageZoomRef } from "../components/image_zoom_files/types";
import ImageZoom from "../components/image_zoom_files/components/ImageZoom";
import PageTurn from "../components/GestureComponents/PageTurn";
import NetStatus from "../components/NetStatus";
import { comicUrl } from "../utils/utilFunctions";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function ComicPageScreen() {
  const { getCurrentPage, getDataStatus }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const [loaded, setLoaded] = useState<boolean>(false);
  const imageRef = useRef<ImageZoomRef>();
  const page: PageType = getCurrentPage();
  const dataReady: boolean = getDataStatus();

  return (
    <View style={styles.comicPage}>
      <NetStatus />
      {!loaded && (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} color={"gray"} />
        </View>
      )}
      {dataReady && (
        <ScrollView contentContainerStyle={styles.comicContainer}>
          <PageTurn side={"left"} />
          <ImageZoom
            ref={imageRef}
            alt={`Comic page for ${page.date}`}
            uri={comicUrl(page.date)}
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
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  comicPage: {
    height: screen.height,
    width: screen.width,
    alignContent: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  comicContainer: {
    paddingTop: 50,
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
    alignItems: "center",
  },
});
