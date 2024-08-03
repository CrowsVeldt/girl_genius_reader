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
  const { getCurrentPage, getCurrentVolume } = useContext(ComicContext);
  const listRef = useRef<FlatList>(null);
  const currentPage = getCurrentPage();
  const currentVolume = getCurrentVolume();

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
      contentContainerStyle={styles.list}
      data={props.pages}
      renderItem={({ item, index }: { item: PageType; index: number }) => (
        <VolumeScrollImage
          page={item}
          navigation={props.navigation}
          key={index}
        />
      )}
      getItemLayout={(data, index) => ({
        length: window.height - 200,
        offset: (window.height - 200) * index,
        index,
      })}
      initialNumToRender={5}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: window.width,
    alignSelf: "center",
  },
});
