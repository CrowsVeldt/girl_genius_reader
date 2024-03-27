import { Text, View } from "react-native";
import { volumeObject } from "../../utils/types";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const renderItem = (date: string, title: string) => (
  <Text>
    {date}, {title}
  </Text>
);

export const VolumeList = ({
  currentVolume, 
  index,
}: {
  currentVolume: volumeObject;
  index: number;
}) => {
  const [open, setOpen] = useState(true);
  const { volume, titles, dates } = currentVolume;

  const datesAndTitles = dates.map((date) => {
    const title = titles.find((item) => item[0] === date);
    return title ? title : [date, ""];
  });

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
