import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { formatDate } from "../utils/utilFunctions";
import { ComicContext } from "../context/ComicContext";
import { PageType } from "../utils/types";

export default function ComicLink({ page, nav }: { page: PageType; nav: any }) {
  const { changeCurrentPage } = useContext(ComicContext);
  return (
    <TouchableOpacity
      style={styles.linkButton}
      onPress={() => {
        changeCurrentPage(page);
        nav.navigate("Home");
      }}
    >
      <Text style={styles.linkNumber}>{`Page ${page.pageNumber}`}</Text>
      <Text style={styles.linkText}>{formatDate(page.date)}</Text>
      <Text style={styles.title}>{page.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    width: "100%",
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
  title: {
    flex: 3,
    overflow: "visible",
  },
});
