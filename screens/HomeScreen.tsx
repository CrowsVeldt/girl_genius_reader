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
import { ImageZoomRef } from "../components/image_zoom_files/types";
import ImageZoom from "../components/image_zoom_files/components/ImageZoom";
import { formatDate } from "../utils/utilFunctions";
import FavoriteButton from "../components/FavoriteButton";
import Swipe from "../components/Swipe";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function Home({ navigation }: { navigation: any }) {
  const { getCurrentDate, goToNextPage, goToPreviousPage } =
    useContext(DateContext);
  const imageRef = useRef<ImageZoomRef>();
  const date: string = getCurrentDate();

  return (
    <View style={styles.comicPage}>
      <FavoriteButton date={date} />
      <View style={styles.header}>
        <Text>{formatDate(typeof date === "string" ? date : "")}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.comicContainer}>
        <Pressable
          style={styles.leftSideButton}
          onPress={() => goToPreviousPage(date)}
        />
        <Swipe side="left" style={styles.leftSideButton} />
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
        <Swipe side="right" styles={styles.rightSideButton} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  comicPage: {
    alignItems: "center",
    height: screen.height,
    width: screen.width,
    backgroundColor: process.env.EXPO_PUBLIC_BG_COLOR,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 80,
  },
  comicContainer: {
    height: window.height - 250,
    width: window.width,
    flexDirection: "row",
  },
  leftSideButton: {
    height: "100%",
    width: 50,
    left: 0,
    zIndex: 1,
    position: "absolute",
  },
  rightSideButton: {
    height: "100%",
    width: 50,
    right: -0,
    zIndex: 1,
    position: "absolute",
  },
});
