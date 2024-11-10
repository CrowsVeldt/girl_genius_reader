import { useContext, useEffect, useRef } from "react";
import {
  Button,
  Dimensions,
  Pressable,
  ScaledSize,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PageType, ScrollDirectionType } from "../../utils/types";
import VolumeScrollImage from "./VolumeScrollImage";
import { ComicContext } from "../../context/ComicContext";
import { AppContext } from "../../context/AppContext";

const window: ScaledSize = Dimensions.get("window");

export default function VolumeScreenList(props: {
  pages: PageType[];
  navigation: any;
}) {
  const { getCurrentPage, getCurrentVolume } = useContext(ComicContext);
  const { getScrollDirection } = useContext(AppContext);
  const listRef = useRef<FlatList>(null);
  const currentPage: PageType = getCurrentPage();
  const currentVolume: number = getCurrentVolume();
  const dir: ScrollDirectionType = getScrollDirection();

  useEffect(() => {
    if (listRef.current) {
      if (currentPage.volumeNumber === currentVolume) {
        listRef.current.scrollToIndex({
          index: currentPage.index,
          viewPosition: 0,
          animated: false,
        });
      } else {
        listRef.current.scrollToIndex({
          index: 0,
          viewPosition: 0,
          animated: false,
        });
      }
    }
  }, [currentPage, currentVolume]);

  return (
    <View>
      <Pressable
        style={[styles.listNavButton, styles.topNavButton]}
        onPress={() => {
          if (listRef.current) {
            listRef.current.scrollToIndex({
              index: 0,
              viewPosition: 0,
              animated: true,
            });
          }
        }}
      >
        <Text style={[styles.upButtonText, styles.navButtonText]}>V</Text>
      </Pressable>
      <Pressable
        style={[styles.listNavButton, styles.bottomNavButton]}
        onPress={() => {
          if (listRef.current) {
            listRef.current.scrollToEnd();
          }
        }}
      >
        <Text style={styles.navButtonText}>V</Text>
      </Pressable>
      <FlatList
        ref={listRef}
        horizontal={dir === "horizontal"}
        contentContainerStyle={styles.list}
        data={props.pages}
        renderItem={({ item, index }: { item: PageType; index: number }) => (
          <VolumeScrollImage
            page={item}
            navigation={props.navigation}
            key={index}
          />
        )}
        getItemLayout={(data, index) =>
          dir === "vertical"
            ? {
                length: window.height - 200,
                offset: (window.height - 200) * index,
                index,
              }
            : {
                length: window.width,
                offset: window.width * index,
                index,
              }
        }
        initialNumToRender={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    alignSelf: "center",
  },
  listNavButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 80,
    backgroundColor: "white",
    opacity: 0.5,
    borderBlockColor: "blue",
    borderWidth: 1,
    zIndex: 2,
  },
  topNavButton: {
    top: 0,
    end: 0,
  },
  bottomNavButton: {
    bottom: 40,
    end: 0,
  },
  upButtonText: {
    transform: [{ rotate: "180deg" }],
  },
  navButtonText: {
    fontSize: 60
  },
});
