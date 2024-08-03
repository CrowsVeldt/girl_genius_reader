import { ContextType, useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { ComicContext } from "../context/ComicContext";
import VolumeSubMenu from "./VolumeSubMenu";

export default function DrawerContent(props: any) {
  const {
    changeCurrentPage,
    getLatestPage,
    getDataStatus,
  }: ContextType<typeof ComicContext> = useContext(ComicContext);
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
  const drawerOpen = useDrawerStatus() === "open";
  const dataReady: boolean = getDataStatus();

  useEffect(() => {
    setSubMenuOpen(false);
  }, [drawerOpen]);

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
            props.navigation.navigate("ComicPage");
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
        label={"Comic Page"}
        onPress={() => {
          if (dataReady) {
            props.navigation.navigate("ComicPage");
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
        label={"Volumes"}
        onPress={() => {
          if (dataReady) {
            setSubMenuOpen(!subMenuOpen);
          }
        }}
      />
      {subMenuOpen && <VolumeSubMenu nav={props.navigation} />}
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
      <DrawerItem
        label={"Options"}
        onPress={() => {
          props.navigation.navigate("Options");
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
