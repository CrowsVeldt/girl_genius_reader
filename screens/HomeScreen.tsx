import { useContext, useRef } from "react";
import {
  Dimensions,
  ScaledSize,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { DateContext } from "../context/DateContext";
import { ImageZoomRef } from "../components/image_zoom_files/types";
import ImageZoom from "../components/image_zoom_files/components/ImageZoom";
import PageTurn from "../components/PageTurn";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function Home({ navigation }: { navigation: any }) {
  const { getCurrentDate } = useContext(DateContext);
  const imageRef = useRef<ImageZoomRef>();
  const date: string = getCurrentDate();

  return (
    <View style={styles.comicPage}>
      <ScrollView contentContainerStyle={styles.comicContainer}>
        <PageTurn side={"left"} />
        <ImageZoom
          ref={imageRef}
          uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${date}.jpg`}
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
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  comicContainer: {
    height: window.height - 150,
    width: window.width,
  },
})