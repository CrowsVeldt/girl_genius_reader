import { useContext } from "react";
import { StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ComicContext } from "../context/ComicContext";

export default function DrawerContent(props: any) {
  const { changeCurrentPage, getLatestPage, getDataStatus } =
    useContext(ComicContext);
  const dataReady: boolean = getDataStatus();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={">>> Go to Latest Comic >>>"}
        labelStyle={styles.latestLabel}
        style={styles.latest}
        onPress={() => {
          if (dataReady) {
            changeCurrentPage(getLatestPage());
            props.navigation.navigate("Home");
          }
        }}
      />
      <DrawerItem
        label={"Home"}
        onPress={() => {
          if (dataReady) {
            props.navigation.navigate("Home");
          }
        }}
      />
      <DrawerItem
        label={"Bookmarks"}
        onPress={() => {
          if (dataReady) {
            props.navigation.navigate("Bookmarks");
          }
        }}
      />
      <DrawerItem
        label={"Index"}
        onPress={() => {
          if (dataReady) {
            props.navigation.navigate("Index");
          }
        }}
      />
      <DrawerItem
        label={"Privacy Policy"}
        onPress={() => {
          props.navigation.navigate("Privacy Policy");
        }}
      />
      <DrawerItem
        label={"Acknowledgements"}
        onPress={() => {
          props.navigation.navigate("Acknowledgements");
        }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  subItem: {
    marginStart: 30,
  },
  latest: {
    paddingStart: "7%",
  },
  latestLabel: {
    textAlign: "center",
  },
});
