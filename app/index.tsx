import { Link, router } from "expo-router";
import { useContext, useEffect } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScaledSize,
  StyleSheet,
  Text,
  View,
} from "react-native";
import NetStatus from "../src/components/NetStatus";
import { changeList } from "../changelog";
import ChangeLogModal from "../src/components/ChangeLogModal";
import { updateDateList } from "../src/utils/network";
import { ComicContext } from "../src/context/ComicContext";
import {
  HomeScreenComicButton,
  HomeScreenContinueButton,
} from "../src/components/HomeScreenComponents";

const window: ScaledSize = Dimensions.get("window");

export default function Home() {
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
              router.push("comicpage");
            }}
            title="Start at the Beginning!"
          />
          <HomeScreenContinueButton
            onPress={() => {
              router.push("comicpage");
            }}
            title="Continue Where You Left Off!"
          ></HomeScreenContinueButton>
          <HomeScreenComicButton
            onPress={() => {
              changeCurrentPage(getLatestPage());
              router.push("comicpage");
            }}
            title="Or Go Straight to the Latest Comic!"
          />
        </View>
        <View style={styles.otherButtonsContainer}>
          <Pressable
            onPress={() => router.push("bookmarks")}
            style={({ pressed }) => {
              return pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton;
            }}
          >
            <Text>Bookmarks</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("privacy")}
            style={({ pressed }) => {
              return pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton;
            }}
          >
            <Text>Privacy Policy</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("acknowledgments")}
            style={({ pressed }) => {
              return pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton;
            }}
          >
            <Text>Acknowledgments</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("options")}
            style={({ pressed }) => {
              return pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton;
            }}
          >
            <Text>Options</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("changelog")}
            style={({ pressed }) => {
              return pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton;
            }}
          >
            <Text>Changelog</Text>
          </Pressable>
          <Link
            href="https:www.girlgeniusonline.com/comic.php"
            style={styles.navButton}
          >
            Go To The Girl Genius Website!
          </Link>

          <Link
            href="https://www.girlgeniusart.com/licensedgoods"
            style={styles.navButton}
          >
            Support the artists and check out the Girl Genius Store(s)!
          </Link>
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
    width: "100%"
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
  navButton: {
    // NOTE: button height set via window dimension because flex property wasn't working right
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    height: window.height / 12,
  },
  buttonPressed: {
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
  },
});
