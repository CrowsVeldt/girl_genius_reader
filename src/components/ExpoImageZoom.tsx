import { Zoomable } from "@likashefqet/react-native-image-zoom";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { ImageZoomRef } from "../components/image_zoom_files/types";
import { useRef } from "react";

export default function ExpoImageZoom(props: any) {
  const { uri, scale } = props;
  const ref = useRef()
  return (
    <Zoomable
      ref={ref}
      minScale={1}
      maxScale={5}
      doubleTapScale={3}
      onInteractionStart={() => {
        console.log("onInteractionStart");
      }}
      onInteractionEnd={() => console.log("onInteractionEnd")}
      onPanStart={() => console.log("onPanStart")}
      onPanEnd={() => console.log("onPanEnd")}
      onPinchStart={() => console.log("onPinchStart")}
      onPinchEnd={() => console.log("onPinchEnd")}
      onSingleTap={() => console.log("onSingleTap")}
      onDoubleTap={(zoomType) => {
        console.log("onDoubleTap", zoomType);
      }}
      onProgrammaticZoom={(zoomType) => {
        console.log("onZoom", zoomType);
      }}
      style={styles.image}
      onResetAnimationEnd={(finished, values) => {
        console.log("onResetAnimationEnd", finished);
        console.log("lastScaleValue:", values?.SCALE.lastValue);
      }}
    >
      <Image style={styles.image} source={{ uri }} contentFit="cover" />
    </Zoomable>
  );
}

const styles = StyleSheet.create({
  image: {},
});
