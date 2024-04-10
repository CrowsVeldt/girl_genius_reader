import { useContext, useRef } from "react";
import {
  Dimensions,
  ScaledSize,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ImageZoomRef } from "../components/image_zoom_files/types";
import ImageZoom from "../components/image_zoom_files/components/ImageZoom";
import PageTurn from "../components/PageTurn";
import { ComicContext } from "../context/ComicContext";
import { PageType } from "../utils/types";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function Home() {
  const { getCurrentPage } = useContext(ComicContext);
  const imageRef = useRef<ImageZoomRef>();
  const page: PageType = getCurrentPage();

  return (
    <View style={styles.comicPage}>
      <ScrollView contentContainerStyle={styles.comicContainer}>
        <PageTurn side={"left"} />
        <ImageZoom
          ref={imageRef}
          uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${page.date}.jpg`}
          minPanPointers={1}
          isDoubleTapEnabled
          resizeMode="contain"
          onLoadStart={() => imageRef.current?.quickReset()}
        />
        <PageTurn side={"right"} />
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
});
