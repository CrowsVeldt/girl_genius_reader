import { Ref, useImperativeHandle } from "react";
import type { ProgrammaticZoomCallback, ZoomableRef } from "../types";

export const useZoomableHandle = (
  ref: Ref<unknown> | undefined,
  reset: () => void,
  quickReset: () => void,
  zoom: ProgrammaticZoomCallback
) => {
  useImperativeHandle(
    ref,
    (): ZoomableRef => ({
      reset() {
        reset();
      },
      quickReset() {
        quickReset();
      },
      zoom(event) {
        zoom(event);
      },
    }),
    [reset, quickReset, zoom]
  );
};
