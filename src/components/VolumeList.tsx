import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { VolumeType } from "../utils/types";
import ComicLink from "./ComicLink";

export const VolumeList = ({
  volume,
  nav,
}: {
  volume: VolumeType;
  nav: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={styles.list}>
      <TouchableOpacity
        style={styles.title}
        onPress={() => {
          setOpen(!open);
        }}
      >
        <Text>{`Volume ${volume.volumeNumber}`}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.subtitleContainer}>
          <Text style={{ flex: 1 }}>Page #</Text>
          <Text style={{ flex: 2, marginStart: 20 }}>Date</Text>
          <Text style={{ flex: 3, paddingStart: 30 }}>Scene</Text>
        </View>
      )}
      <ScrollView>
        {volume.pages.map((page, index) =>
          open ? <ComicLink page={page} nav={nav} key={index} /> : null
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    minHeight: 30,
    width: "90%",
    paddingHorizontal: 10,
  },
  title: {
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  subtitleContainer: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
