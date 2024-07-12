import { ContextType, useContext } from "react";
import { Dimensions, ScaledSize, StyleSheet, Text, View } from "react-native";
import { PageType } from "../utils/types";
import { ComicContext } from "../context/ComicContext";
import NetStatus from "../components/NetStatus";

export default function Home() {
  const { getCurrentPage, getDataStatus }: ContextType<typeof ComicContext> =
    useContext(ComicContext);
  const page: PageType = getCurrentPage();
  const dataReady: boolean = getDataStatus();

  return (
    <View style={styles.page}>
      <NetStatus />
      <Text>Link to current comic</Text>
      <Text>Link to Index</Text>
      <Text>Link to Bookmarks</Text>
      <Text>Link to Settings?</Text>
      <Text>Link to girlgeniusonline.com</Text>
      <Text>Link to girl genius shops</Text>
      <Text>Link to Acknowledgements</Text>
      <Text>Link to Privacy policy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
});
