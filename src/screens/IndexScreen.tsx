import { ContextType, useContext } from "react";
import { Dimensions, ScaledSize, StyleSheet, View } from "react-native";
import { VolumeType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import { VolumeList } from "../components/VolumeList";
import NetStatus from "../components/NetStatus";
import { FlatList } from "react-native-gesture-handler";

const window: ScaledSize = Dimensions.get("window");

export default function ComicIndex({ navigation }: { navigation: any }) {
  const { getVolumes }: ContextType<typeof ComicContext> =
    useContext(ComicContext);

  const volumes: VolumeType[] = getVolumes();

  const renderElement = (item: VolumeType, index: number, separators: any) => {
    return <VolumeList nav={navigation} volume={item} key={index} />;
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
    width: "100%",
    paddingTop: 10,
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
