import { ContextType, useContext } from "react";
import {
  Dimensions,
  ScaledSize,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import NetStatus from "../components/NetStatus";
import { FlatList } from "react-native-gesture-handler";

const window: ScaledSize = Dimensions.get("window");

export default function ComicIndex({ navigation }: { navigation: any }) {
  const { getVolumes, changeCurrentVolume }: ContextType<typeof ComicContext> =
    useContext(ComicContext);

  const volumes: VolumeType[] = getVolumes();

  const renderElement = (item: VolumeType, index: number, separators: any) => {
    return (
      <TouchableOpacity
        style={styles.title}
        onPress={() => {
          changeCurrentVolume(item.volumeNumber);
          navigation.navigate("Volume", { volumeNumber: item.volumeNumber });
        }}
      >
        <Text>{`Volume ${item.volumeNumber}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.list}>
      <NetStatus />
      {volumes != null && (
        <FlatList
          data={volumes}
          contentContainerStyle={styles.list}
          renderItem={({ item, index, separators }) =>
            renderElement(item, index, separators)
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    alignSelf: "center",
    alignItems: "center",
    width: window.width,
    paddingTop: 10,
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: window.width,
    borderColor: "black",
    borderWidth: 1,
  },
});
