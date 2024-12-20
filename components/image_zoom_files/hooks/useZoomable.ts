import { useGestures } from "./useGestures";
import { useZoomableLayout } from "./useZoomableLayout";
import { useZoomableHandle } from "./useZoomableHandle";
import type { UseZoomableProps } from "../types";

export const useZoomable = ({
  minScale,
  maxScale,
  scale,
  doubleTapScale,
  minPanPointers,
  maxPanPointers,
  isPanEnabled,
  isPinchEnabled,
  isSingleTapEnabled,
  isDoubleTapEnabled,
  onInteractionStart,
  onInteractionEnd,
  onPinchStart,
  onPinchEnd,
  onPanStart,
  onPanEnd,
  onSingleTap,
  onDoubleTap,
  onProgrammaticZoom,
  onResetAnimationEnd,
  onLayout,
  ref,
}: UseZoomableProps) => {
  const { width, height, center, onZoomableLayout } = useZoomableLayout({
    onLayout,
  });
  const { animatedStyle, gestures, reset, quickReset, zoom } = useGestures({
    width,
    height,
    center,
    minScale,
    maxScale,
    scale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isPanEnabled,
    isPinchEnabled,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onInteractionStart,
    onInteractionEnd,
    onPinchStart,
    onPinchEnd,
    onPanStart,
    onPanEnd,
    onSingleTap,
    onDoubleTap,
    onProgrammaticZoom,
    onResetAnimationEnd,
  });
  useZoomableHandle(ref, reset, quickReset, zoom);

  return { animatedStyle, gestures, onZoomableLayout };
};
