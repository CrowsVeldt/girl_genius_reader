import {
  Dimensions,
  SafeAreaView,
  ScaledSize,
  StyleSheet,
  Text,
  View,
} from "react-native";
import NetStatus from "../components/NetStatus";
import { changeList } from "../../changelog";
import ChangeLogModal from "../components/ChangeLogModal";
import { useContext, useEffect } from "react";
import { updateDateList } from "../utils/network";
import { ComicContext } from "../context/ComicContext";
import {
  HomeScreenComicButton,
  HomeScreenContinueButton,
  HomeScreenNavButton,
  HomeScreenNavLink,
} from "../components/HomeScreenComponents";

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
    <SafeAreaView style={styles.page}>
      <ChangeLogModal />
      <NetStatus />
      <View style={styles.mainPageButtonsContainer}>
        <View style={styles.comicButtonContainer}>
          <HomeScreenComicButton
            onPress={() => {
              changeCurrentPage(getFirstPage());
              navigation.navigate("ComicPage");
            }}
            title="Start at the Beginning!"
          />
          <HomeScreenContinueButton
            onPress={() => {
              navigation.navigate("ComicPage");
            }}
            title="Continue Where You Left Off!"
          ></HomeScreenContinueButton>
          <HomeScreenComicButton
            onPress={() => {
              changeCurrentPage(getLatestPage());
              navigation.navigate("ComicPage");
            }}
            title="Or Go Straight to the Latest Comic!"
          />
        </View>
        <View style={styles.otherButtonsContainer}>
          <HomeScreenNavButton
            navigation={navigation}
            target={"Bookmarks"}
            title={"Bookmarks"}
          />
          <HomeScreenNavButton
            navigation={navigation}
            target={"Privacy Policy"}
            title={"Privacy Policy"}
          />
          <HomeScreenNavButton
            navigation={navigation}
            target={"Acknowledgements"}
            title={"Acknowledgements"}
          />
          <HomeScreenNavButton
            navigation={navigation}
            target={"Options"}
            title={"Options"}
          />
          <HomeScreenNavButton
            navigation={navigation}
            target={"Changelog"}
            title={"Change Log"}
          />
          <HomeScreenNavLink
            target={"https:www.girlgeniusonline.com/comic.php"}
            title="Go To The Girl Genius Website!"
          />
          <HomeScreenNavLink
            target={"https://www.girlgeniusart.com/licensedgoods"}
            title="Support the artists and check out the Girl Genius Store(s)!"
          />
        </View>
        <Text style={styles.versionText}>{`Version ${changeList[0][0]}`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  mainPageButtonsContainer: {
    flex: 1,
  },
  comicButtonContainer: {
    // NOTE: container height set via window dimension because flex property wasn't working right
    height: window.height / 4,
    flexDirection: "row",
  },
  otherButtonsContainer: {
    flex: 3,
  },
  versionText: {
    textAlign: "center",
  },
});
