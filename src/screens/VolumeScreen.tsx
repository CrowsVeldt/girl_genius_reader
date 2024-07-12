import { ContextType, useContext } from "react";
import { Dimensions, Image, ScaledSize, StyleSheet } from "react-native";
import { PageType, VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { comicUrl } from "../utils/utilFunctions";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const window: ScaledSize = Dimensions.get("window");

export default function VolumeScreen({ navigation }: { navigation: any }) {
  const {
    getCurrentVolume,
    changeCurrentPage,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const volume: VolumeType = getCurrentVolume();

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
