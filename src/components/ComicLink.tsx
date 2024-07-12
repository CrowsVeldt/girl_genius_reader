import { ContextType, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { formatDate } from "../utils/utilFunctions";
import { PageType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";

export default function ComicLink({ page, nav }: { page: PageType; nav: any }) {
  const { changeCurrentPage }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => {
        changeCurrentPage(page);
        nav.navigate("ComicPage");
      }}
    >
      <Text style={styles.linkNumber}>{page.pageNumber}</Text>
      <Text style={styles.linkText}>{formatDate(page.date)}</Text>
      <Text style={styles.title}>{page.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  linkNumber: {
    marginRight: 6,
    flex: 1,
  },
  linkText: {
    flex: 2,
  },
  title: {
    flex: 3,
    overflow: "visible",
  },
});
