import { useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  ScaledSize,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { DateContext } from "../context/DateContext";
// import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import ImageZoom from "../image_zoom_files/components/ImageZoom";
import ComicNav from "../components/ComicNav";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function Home({ route, navigation }) {
  const { addBookmark, getCurrentDate } = useContext(DateContext);
  const date: string = getCurrentDate();
  const imageRef = useRef<ImageZoomRef>();

  return (
    <View style={styles.comicPage}>
      <ComicNav date={date} nav={navigation} />
      <View style={styles.header}>
        <Text>{date}</Text>
        <TouchableOpacity onPress={() => addBookmark(date)}>
          <Text>Add Bookmark</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.comicContainer}>
        {/* <ImageZoom
          uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${date}.jpg`}
          isDoubleTapEnabled={true}
          doubleTapScale={1.8}
        /> */}
        <ImageZoom
          ref={imageRef}
          uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${date}.jpg`}
          minScale={0.5}
          minPanPointers={1}
          isDoubleTapEnabled
          resizeMode="cover"
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comicContainer: {
    height: window.height - 250,
    width: window.width,
  },
});
