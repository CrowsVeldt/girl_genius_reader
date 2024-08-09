import { useContext, useEffect, useRef } from "react";
import { Dimensions, ScaledSize, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PageType } from "../../utils/types";
import VolumeScrollImage from "./VolumeScrollImage";
import { ComicContext } from "../../context/ComicContext";

const window: ScaledSize = Dimensions.get("window");

export default function VolumeScreenList(props: {
  pages: PageType[];
  navigation: any;
}) {
  const { getCurrentPage, getCurrentVolume, getScrollDirection } =
    useContext(ComicContext);
  const listRef = useRef<FlatList>(null);
  const currentPage = getCurrentPage();
  const currentVolume = getCurrentVolume();
  const dir = getScrollDirection();

  useEffect(() => {
    if (listRef.current) {
      if (currentPage.volumeNumber === currentVolume) {
        listRef.current.scrollToIndex({
          index: currentPage.pageNumber - 1,
          viewPosition: 0,
          animated: false,
        });
      } else {
        listRef.current.scrollToIndex({
          index: 0,
          viewPosition: 0,
          animated: false,
        });
      }
    }
  }, [currentPage, currentVolume]);

  return (
    <FlatList
      ref={listRef}
      horizontal={dir === "horizontal"}
      contentContainerStyle={styles.list}
      data={props.pages}
      renderItem={({ item, index }: { item: PageType; index: number }) => (
        <VolumeScrollImage
          page={item}
          navigation={props.navigation}
          key={index}
        />
      )}
      getItemLayout={(data, index) =>
        dir === "vertical"
          ? {
              length: window.height - 200,
              offset: (window.height - 200) * index,
              index,
            }
          : {
              length: window.width,
              offset: window.width * index,
              index,
            }
      }
      initialNumToRender={5}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    alignSelf: "center",
  },
});