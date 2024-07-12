import { Dimensions, Image, ScaledSize, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { comicUrl } from "../utils/utilFunctions";
import { PageType } from "../utils/types";

const window: ScaledSize = Dimensions.get("window");

const renderElement = (item: PageType, index: number) => (
  <Image src={comicUrl(item.date)} style={styles.image} key={index} />
);

export default function VerticalVolumeScroll({ ...props }) {
  const { volume } = props;

  return (
    <FlatList
      data={volume.pages}
      renderItem={({ item, index, separators }) => renderElement(item, index)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: window.height - 190,
  },
});
