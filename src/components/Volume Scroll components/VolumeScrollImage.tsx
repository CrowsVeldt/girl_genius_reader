import { memo, useContext } from "react";
import { Dimensions, Image, ScaledSize, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ComicContext } from "../../context/ComicContext";
import { comicUrl } from "../../utils/utilFunctions";
import { PageType } from "../../utils/types";

const window: ScaledSize = Dimensions.get("window");

function VolumeScrollImage({
  navigation,
  page,
}: {
  navigation: any;
  page: PageType;
}) {
  const { changeCurrentPage } = useContext(ComicContext);
  return (
    <TouchableOpacity
      onPress={() => {
        changeCurrentPage(page);
        navigation.navigate("ComicPage");
      }}
    >
      <Image src={comicUrl(page.date)} style={styles.image} />
    </TouchableOpacity>
  );
}

export default memo(VolumeScrollImage);

const styles = StyleSheet.create({
  image: {
    height: window.height - 200,
    width: window.width 
  },
});
