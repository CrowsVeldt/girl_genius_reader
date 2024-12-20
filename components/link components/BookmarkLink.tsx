import { router } from "expo-router";
import { ContextType, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PageType } from "../../utils/types";
import { ComicContext } from "../../context/ComicContext";

export default function BookmarkLink({ page }: { page: PageType }) {
  const {
    removeBookmark,
    changeCurrentPage,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);

  return (
    <View style={styles.bookmark}>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          changeCurrentPage(page);
          router.push("comicpage");
        }}
      >
        <Text>{`Volume ${page.volumeNumber} - Page ${page.pageNumber}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeBookmark(page)}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookmark: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    height: 35,
    width: "100%",
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 30,
  },
  linkButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    borderWidth: 1,
  },
});
