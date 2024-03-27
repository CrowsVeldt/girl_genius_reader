import { Text, View } from "react-native";
import { volumeObject } from "../../utils/types";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { formatDate } from "../../utils/utilFunctions";
import ComicLink from "../ComicLink";

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

  const renderItem = (date: string, title: string) => (
    <ComicLink date={date} nav={nav}/>
  );
  // make renderItems links to the comics
  // offset scene titles to make them clearly separate from the dates

  return (
    <View>
      <Text>{`Volume ${index + 1}`}</Text>
      <FlatList
        data={datesAndTitles}
        renderItem={({ item, index, separators }) =>
          open ? renderItem(item[0], item[1]) : null
        }
      />
    </View>
  );
};
