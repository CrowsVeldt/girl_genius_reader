import { Dimensions, ScaledSize, StyleSheet, Text, View } from "react-native";
import NetStatus from "../components/NetStatus";
import { TouchableOpacity } from "react-native-gesture-handler";
import { changeList } from "../../changelog";
import ChangeLogModal from "../components/ChangeLogModal";
import { useEffect } from "react";
import { update } from "../utils/network";

const window: ScaledSize = Dimensions.get("window");

export default function Home({ navigation }: { navigation: any }) {
  useEffect(() => {
    (async () => {
      // get setFinishedUpdate from ComicContext
      // on startUp setFinishedUpdate to false
      const shit = await update();
      // when update finishes return true from it, and set finishedUpdate to true
      console.log(shit);
    })();
  }, []);

  return (
    <View style={styles.page}>
      <ChangeLogModal />
      <View>
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
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => {
            navigation.navigate("Options");
          }}
        >
          <Text>Options</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => {
            navigation.navigate("Changelog");
          }}
        >
          <Text>Change Log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => {
            // navigation.navigate("Acknowledgements");
          }}
        >
          <Text>Link to girlgeniusonline.com (not yet implemented)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => {
            // navigation.navigate("Acknowledgements");
          }}
        >
          <Text>Link to girl genius shops (not yet implemented)</Text>
        </TouchableOpacity>
      </View>
      <Text>{`Version ${changeList[0][0]}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  linkButton: {
    width: window.width,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
