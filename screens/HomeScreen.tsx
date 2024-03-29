import { useContext, useRef } from "react";
import {
  Dimensions,
  Pressable,
  ScaledSize,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DateContext } from "../context/DateContext";
import { ImageZoomRef } from "../image_zoom_files/types";
import ImageZoom from "../image_zoom_files/components/ImageZoom";
import ComicNav from "../components/ComicNav";
import { formatDate } from "../utils/utilFunctions";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function Home({ navigation }: { navigation: any }) {
  const { getCurrentDate, goToNextPage, goToPreviousPage } =
    useContext(DateContext);
  const imageRef = useRef<ImageZoomRef>();
  const date: string = getCurrentDate();

  return (
    <View style={styles.comicPage}>
      <ComicNav date={date} />
      <View style={styles.header}>
        <Text>{formatDate(typeof date === "string" ? date : "")}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.comicContainer}>
        <Pressable
          style={styles.leftSideButton}
          onPress={() => goToPreviousPage(date)}
        />
        <ImageZoom
          ref={imageRef}
          uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${date}.jpg`}
          minPanPointers={1}
          isDoubleTapEnabled
          resizeMode="contain"
          onLoadStart={() => imageRef.current?.quickReset()}
        />
        <Pressable
          style={styles.rightSideButton}
          onPress={() => goToNextPage(date)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  comicPage: {
    alignItems: "center",
    height: screen.height,
    width: screen.width,
    backgroundColor: "#f9e6c9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comicContainer: {
    height: window.height - 250,
    width: window.width,
    flexDirection: "row",
  },
  leftSideButton: {
    height: "100%",
    width: 70,
    left: 0,
    zIndex: 1,
    position: "absolute",
  },
  rightSideButton: {
    height: "100%",
    width: 70,
    right: -0,
    zIndex: 1,
    position: "absolute",
  },
});
