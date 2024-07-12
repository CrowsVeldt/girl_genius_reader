import { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ComicContext } from "../context/ComicContext";
import { comicUrl } from "../utils/utilFunctions";

export default function VerticalVolumeScroll({ ...props }) {
  const { getVolume } = useContext(ComicContext);
  const { volumeNumber } = props;
  const volume = getVolume(volumeNumber);

  return (
    <ScrollView>
      {volume != null &&
        volume.pages.map((page, index) => (
          <Image
            src={comicUrl(volume.pages[index].date)}
            style={styles.image}
            key={index}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 640,
  },
});
