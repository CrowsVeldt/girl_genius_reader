import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { volumeObject } from "../utils/types";
import { useState } from "react";
import ComicLink from "./ComicLink";

export const VolumeList = ({
  currentVolume,
  index,
  nav,
}: {
  currentVolume: volumeObject;
  index: number;
  nav: any;
}) => {
  const [open, setOpen] = useState(false);
  const { volume, titles, dates } = currentVolume;

  const datesAndTitles = dates.map((date) => {
    const title = titles.find((item) => item[0] === date);
    return title ? title : [date, ""];
  });

  return (
    <View style={styles.list}>
      <TouchableOpacity
        style={styles.title}
        onPress={() => {
          setOpen(!open);
        }}
      >
        <Text>{`Volume ${index + 1}`}</Text>
      </TouchableOpacity>
      <ScrollView>
        {datesAndTitles.map((item, index) =>
          open ? (
            <ComicLink
              date={item[0]}
              nav={nav}
              num={index + 1}
              title={item[1]}
              key={index}
            />
          ) : null
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    minHeight: 30,
    borderWidth: 1,
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 10
  },
  title: {
    borderWidth: 1,
    alignItems: "center",
    width: "30%"
  },
});