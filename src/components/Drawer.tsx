import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { ComicContext } from "../context/ComicContext";

export default function DrawerContent(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const { changeCurrentPage, getLatestPage } = useContext(ComicContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={">>> Go to Latest Comic >>>"}
        labelStyle={styles.latestLabel}
        style={styles.latest}
        onPress={() => {
          changeCurrentPage(getLatestPage());
          props.navigation.navigate("Home");
        }}
      />
      <DrawerItem
        label={`${open ? "I" : "-"} Other`}
        onPress={() => {
          setOpen(!open);
        }}
      />
      {open && (
        <DrawerItem
          label={"- Privacy Policy"}
          style={styles.subItem}
          onPress={() => {
            props.navigation.navigate("Privacy Policy");
          }}
        />
      )}
      {open && (
        <DrawerItem
          label={"- Acknowledgements"}
          style={styles.subItem}
          onPress={() => {
            props.navigation.navigate("Acknowledgements");
          }}
        />
      )}
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
