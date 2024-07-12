import { ContextType, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PageType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import NetStatus from "../components/NetStatus";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }: { navigation: any }) {
  const { getCurrentPage, getDataStatus }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const page: PageType = getCurrentPage();
  const volume: VolumeType = getCurrentVolume()
  const dataReady: boolean = getDataStatus();

  return (
    <View style={styles.page}>
      <NetStatus />
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("ComicPage");
        }}
      >
        <Text>Comic Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Index");
        }}
      >
        <Text>Index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Bookmarks");
        }}
      >
        <Text>Bookmarks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Privacy Policy");
        }}
      >
        <Text>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Acknowledgements");
        }}
      >
        <Text>Acknowledgements</Text>
      </TouchableOpacity>

      <Text>Link to girlgeniusonline.com</Text>
      <Text>Link to girl genius shops</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  linkButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  verticalVolume: {},
});
