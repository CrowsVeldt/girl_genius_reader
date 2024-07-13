import { ContextType, useContext } from "react";
import { Dimensions, Image, ScaledSize, StyleSheet } from "react-native";
import { PageType, VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { comicUrl } from "../utils/utilFunctions";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const window: ScaledSize = Dimensions.get("window");

export default function VolumeScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { getVolume, changeCurrentPage }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const { volumeNumber } = route.params;

  const volume: VolumeType = getVolume(volumeNumber);

  const renderElement = (item: PageType, index: number) => (
    <TouchableOpacity
      onPress={() => {
        changeCurrentPage(item);
        navigation.navigate("ComicPage");
      }}
    >
      <Image src={comicUrl(item.date)} style={styles.image} key={index} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={volume.pages}
      style={styles.page}
      renderItem={({ item, index, separators }) => renderElement(item, index)}
      getItemLayout={(data, index) => ({
        length: window.height - 190,
        offset: window.height - 190 * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  image: {
    height: window.height - 190,
  },
});
