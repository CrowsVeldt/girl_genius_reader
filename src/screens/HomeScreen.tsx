import {
  Dimensions,
  Pressable,
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
import { Link } from "expo-router";

const window: ScaledSize = Dimensions.get("window");

export default function Home({ navigation }: { navigation: any }) {
  const {
    changeCurrentPage,
    getCurrentPage,
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
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.comicButton, styles.buttonPressed]
                : styles.comicButton
            }
            onPress={() => {
              changeCurrentPage(getFirstPage());
              navigation.navigate("ComicPage");
            }}
          >
            <Text style={styles.comicButtonText}>Start at the Beginning!</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.continueButton, styles.buttonPressed]
                : styles.continueButton
            }
            onPress={() => {
              navigation.navigate("ComicPage");
            }}
          >
            <Text style={styles.comicButtonText}>
              Continue Where You Left Off!
            </Text>
            <Text style={styles.comicButtonText}>
              {`(Volume ${getCurrentPage().volumeNumber},`}
            </Text>
            <Text style={styles.comicButtonText}>
              {`Page ${getCurrentPage().pageNumber})`}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.comicButton, styles.buttonPressed]
                : styles.comicButton
            }
            onPress={() => {
              changeCurrentPage(getLatestPage());
              navigation.navigate("ComicPage");
            }}
          >
            <Text style={styles.comicButtonText}>
              Or Go Straight to the Latest Comic!
            </Text>
          </Pressable>
        </View>
        <View style={styles.otherButtonsContainer}>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton
            }
            onPress={() => {
              navigation.navigate("Bookmarks");
            }}
          >
            <Text style={styles.navButtonText}>Bookmarks</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton
            }
            onPress={() => {
              navigation.navigate("Privacy Policy");
            }}
          >
            <Text style={styles.navButtonText}>Privacy Policy</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton
            }
            onPress={() => {
              navigation.navigate("Acknowledgements");
            }}
          >
            <Text style={styles.navButtonText}>Acknowledgements</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton
            }
            onPress={() => {
              navigation.navigate("Options");
            }}
          >
            <Text style={styles.navButtonText}>Options</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton
            }
            onPress={() => {
              navigation.navigate("Changelog");
            }}
          >
            <Text style={styles.navButtonText}>Change Log</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton
            }
          >
            <Link
              style={styles.realLink}
              href={"https:www.girlgeniusonline.com/comic.php"}
            >
              Go to the Girl Genius Website!
            </Link>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.navButton, styles.buttonPressed]
                : styles.navButton
            }
          >
            <Link
              style={styles.realLink}
              href={"https://www.girlgeniusart.com/licensedgoods"}
            >
              Support the artists and check out the Girl Genius Store(s)!
            </Link>
          </Pressable>
        </View>
        <Text style={styles.versionText}>{`Version ${changeList[0][0]}`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // NOTE: button sizes set via window dimension because flex property wasn't working right
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  mainPageButtonsContainer: {
    flex: 1,
  },
  comicButtonContainer: {
    height: window.height / 4,
    flexDirection: "row",
  },
  otherButtonsContainer: {
    flex: 3,
  },
  comicButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: window.width / 3,
  },
  continueButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: window.width / 3,
  },
  buttonPressed: {
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
  },
  comicButtonText: {
    textAlign: "center",
  },
  navButton: {
    justifyContent: "center",
    borderWidth: 1,
    height: window.height / 12,
  },
  navButtonText: {
    textAlign: "center",
  },
  realLink: {
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  versionText: {
    textAlign: "center",
  },
});
