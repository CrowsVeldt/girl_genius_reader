import { useContext, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ComicContext } from "../context/ComicContext";
import ImageZoom from "./image_zoom_files/components/ImageZoom";
import { ImageZoomRef } from "./image_zoom_files/types";

export default function VerticalPageView() {
  const { getDataStatus, getCurrentVolume } = useContext(ComicContext);
  const imageRef = useRef<ImageZoomRef>();
  const currentVolume = getCurrentVolume();
  const volumePages = currentVolume.pages;
  return (
    getDataStatus() &&
    volumePages.map((page, index) => {
      return (
        <ImageZoom
          key={index}
          ref={imageRef}
          uri={`https://www.girlgeniusonline.com/ggmain/strips/ggmain${page.date}.jpg`}
          minPanPointers={1}
          isDoubleTapEnabled
        />
      );
    })
  );
}

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
