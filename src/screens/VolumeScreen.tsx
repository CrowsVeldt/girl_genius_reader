import { ContextType, useContext, useState } from "react";
import {
  Dimensions,
  Image,
  ScaledSize,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  Switch,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { PageType, VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { comicUrl } from "../utils/utilFunctions";
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
  const [image, setImage] = useState<boolean>(true);
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
    <View style={styles.page}>
      <View style={styles.options}>
        <View style={styles.toggle}>
          <Text>Links</Text>
          <Switch
            onValueChange={() => setImage(!image)}
            thumbColor={image ? "blue" : "lightgray"}
            value={image}
          />
          <Text>Pages</Text>
        </View>
      </View>
      {image && (
        <FlatList
          data={volume.pages}
          renderItem={({ item, index }: { item: PageType; index: number }) =>
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  image: {
    height: window.height - 190,
    width: window.width,
  },
  options: {
    flexDirection: "row",
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
