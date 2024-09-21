import { useEffect, useRef, useState } from "react";
import { Dimensions, ScaledSize, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import { Image } from "expo-image";
import { ImageZoomRef } from "../components/image_zoom_files/types";

const screen: ScaledSize = Dimensions.get("screen");
const window: ScaledSize = Dimensions.get("window");

export default function ExpoImageZoom(props: any) {
  const [panEnabled, setPanEnabled] = useState<boolean>(true);
  const { uri } = props;
  const ref = useRef<ImageZoomRef>();
  const scale = useSharedValue(1);

  return (
    <Zoomable
      ref={ref}
      minScale={1}
      maxScale={3}
      scale={scale}
      doubleTapScale={3}
      minPanPointers={1}
      isPanEnabled={panEnabled}
      isSingleTapEnabled
      isDoubleTapEnabled
      onInteractionStart={() => {
        console.log("");
      }}
      onInteractionEnd={() => console.log("")}
      onPanStart={(values) => console.log(values)}
      onPanEnd={(values) => console.log("")}
      onPinchStart={(values) => console.log("")}
      onPinchEnd={(values) => setPanEnabled(scale.value !== 1)}
      onSingleTap={(values) => console.log("")}
      onDoubleTap={(zoomType) => {
        if (zoomType === "ZOOM_IN") {
          setPanEnabled(true);
        } else {
          setPanEnabled(false);
        }
      }}
      onProgrammaticZoom={(zoomType) => {
        console.log("");
      }}
      onResetAnimationEnd={(finished, values) => {
        console.log("onResetAnimationEnd", values);
        console.log("lastScaleValue:", values?.SCALE.lastValue);
      }}
    >
      <Image style={styles.image} source={uri} />
    </Zoomable>
  );
}

const styles = StyleSheet.create({
  image: {
    height: window.height - 100,
    width: window.width,
  },
});
