import { ContextType, useContext } from "react";
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
  const { changeCurrentPage }: ContextType<typeof ComicContext> =
    useContext(ComicContext);

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
      <View style={styles.subtitleContainer}>
        <Text style={styles.linkNumber}>Page #</Text>
        <Text style={styles.linkText}>Date</Text>
        <Text style={styles.linkTitle}>Title</Text>
      </View>
      <FlatList
        data={volume.pages}
        renderItem={({ item, index, separators }) =>
          renderElement(item, index, separators)
        }
        getItemLayout={(data, index) => ({
          length: 40,
          offset: 40 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: window.width - 50,
    alignSelf: "center",
  },
  subtitleContainer: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  linkButton: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
