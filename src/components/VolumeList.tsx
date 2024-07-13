import { ContextType, useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScaledSize,
  Dimensions,
} from "react-native";
import { PageType, VolumeType } from "../utils/types";
import { FlatList } from "react-native-gesture-handler";
import { ComicContext } from "../context/ComicContext";
import { formatDate } from "../utils/utilFunctions";

const window: ScaledSize = Dimensions.get("window");

export const VolumeList = ({
  volume,
  nav,
}: {
  volume: VolumeType;
  nav: any;
}) => {
  const {
    changeCurrentPage,
    changeCurrentVolume,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const [open, setOpen] = useState<boolean>(false);

  const renderElement = (item: PageType, index: number, separators: any) => {
    return (
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          changeCurrentPage(item);
          nav.navigate("ComicPage");
        }}
      >
        <Text style={styles.linkNumber}>{item.pageNumber}</Text>
        <Text style={styles.linkText}>{formatDate(item.date)}</Text>
        <Text style={styles.linkTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.list}>
      <TouchableOpacity
        style={styles.pageListToggle}
        onPress={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.chevron}></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.title}
        onPress={() => {
          changeCurrentVolume(volume.volumeNumber);
          nav.navigate("Volume", { volumeNumber: volume.volumeNumber });
        }}
      >
        <Text>{`Volume ${volume.volumeNumber}`}</Text>
        {open && (
          <FlatList
            data={volume.pages}
            renderItem={({ item, index, separators }) =>
              renderElement(item, index, separators)
            }
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: window.width - 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  linkButton: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkNumber: {
    marginRight: 6,
    flex: 1,
  },
  linkText: {
    flex: 2,
  },
  linkTitle: {
    flex: 3,
    overflow: "visible",
  },
  pageListToggle: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  chevron: {
    height: 10,
    width: 10,
    borderColor: "black",
    borderEndWidth: 1,
    borderBottomWidth: 1,
  },
});

// {open && (
// <View style={styles.subtitleContainer}>
// <Text style={{ flex: 1 }}>Page #</Text>
// <Text style={{ flex: 2, marginStart: 20 }}>Date</Text>
// <Text style={{ flex: 3, paddingStart: 30 }}>Scene</Text>
// </View>
// )}
// <ScrollView>
// {volume.pages.map((page, index) =>
// open ? <ComicLink page={page} nav={nav} key={index} /> : null
// )}
// </ScrollView>
