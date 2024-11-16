import { Dimensions, ScaledSize, StyleSheet, Text, View } from "react-native";
import NetStatus from "../components/NetStatus";
import { TouchableOpacity } from "react-native-gesture-handler";
import { changeList } from "../../changelog";
import ChangeLogModal from "../components/ChangeLogModal";
import { useContext, useEffect } from "react";
import { updateDateList } from "../utils/network";
import { ComicContext } from "../context/ComicContext";
import { Link } from "expo-router";

const window: ScaledSize = Dimensions.get("window");

export default function Home({ navigation }: { navigation: any }) {
  const {
    changeCurrentPage,
    getFirstPage,
    getLatestPage,
    triggerFinishedUpdate,
  } = useContext(ComicContext);

  useEffect(() => {
    (async () => {
      triggerFinishedUpdate((await updateDateList()) != null);
    })();
  }, []);

  return (
    <View style={styles.page}>
      <ChangeLogModal />
      <View>
        <NetStatus />
        <View style={styles.comicButtonContainer}>
          <TouchableOpacity
            style={styles.comicButton}
            onPress={() => {
              changeCurrentPage(getFirstPage());
              navigation.navigate("ComicPage");
            }}
          >
            <Text>Start at the beginning,</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.continueButton]}
            onPress={() => {
              navigation.navigate("ComicPage");
            }}
          >
            <Text>Continue Where You Left Off, </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.comicButton}
            onPress={() => {
              changeCurrentPage(getLatestPage());
              navigation.navigate("ComicPage");
            }}
          >
            <Text>Or go straight to the Latest Page!</Text>
          </TouchableOpacity>
        </View>
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
        <Link
          href={"https:www.girlgeniusonline.com/comic.php"}
          style={styles.linkButton}
        >
          Go to the Girl Genius Website!
        </Link>
        <Link
          href={"https://www.girlgeniusart.com/licensedgoods"}
          style={styles.linkButton}
        >
          Support the artists and check out the Girl Genius Store(s)!
        </Link>
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
  comicButtonContainer: {
    flexDirection: "row",
    width: window.width,
    height: 100,
  },
  comicButton: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
  continueButton: {
    flex: 2,
    borderColor: "black",
    borderWidth: 1,
  },
  linkButton: {
    width: window.width,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
  },
});
