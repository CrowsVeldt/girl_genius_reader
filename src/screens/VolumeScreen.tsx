import { ContextType, useContext, useState } from "react";
import { Button, Dimensions, Image, ScaledSize, StyleSheet } from "react-native";
import { PageType, VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { comicUrl } from "../utils/utilFunctions";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { VolumeList } from "../components/VolumeList";

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
  const [image, setImage] = useState<boolean>(false);
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
    <ScrollView style={styles.page}>
      <Button title={image ? "Pages" : "Links"} onPress={() => setImage(!image)}/>
      {image && (
        <FlatList
          data={volume.pages}
          renderItem={({ item, index, separators }) =>
            renderElement(item, index)
          }
          getItemLayout={(data, index) => ({
            length: window.height - 190,
            offset: window.height - 190 * index,
            index,
          })}
        />
      )}
      {!image && <VolumeList volume={volume} nav={navigation} />}
    </ScrollView>
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
