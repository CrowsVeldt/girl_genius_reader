import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ComicContext } from "../context/ComicContext";
import { VolumeType } from "../utils/types";

export default function VolumeSubMenu(props: any) {
  const { getVolumes, changeCurrentVolume } = useContext(ComicContext);
  const { nav } = props;
  const volumes: VolumeType[] = getVolumes();

  const subMenuItem = (item: VolumeType, index: number, nav: any) => {
    return (
      <TouchableOpacity
        style={styles.subMenuItem}
        key={index}
        onPress={() => {
          changeCurrentVolume(item.volumeNumber);
          nav.navigate("Volume", { volumeNumber: item.volumeNumber });
        }}
      >
        <Text>{`Volume ${item.volumeNumber}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.subMenu}>
      {volumes &&
        volumes.map((item: VolumeType, index: number) =>
          subMenuItem(item, index, nav)
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  subMenu: {
    marginStart: "15%",
  },
  subMenuItem: {
    marginTop: 2,
  },
});
