import { Text, View } from "react-native";
import { volumeObject } from "../../utils/types";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const renderItem = (data: string) => <Text>{data}</Text>;

export const VolumeList = ({
  currentVolume,
  index,
}: {
  currentVolume: volumeObject;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const { volume, titles, dates } = currentVolume;

    // for each date find if a title matches it
    // if yes, return item = [date, title]
    // else return item = [date, null]

    // if item[1] != null, render 'date-title'
    // else render 'date'

  return (
    <View>
      <Text>{`Volume ${index}`}</Text>
      <FlatList
        data={dates}
        renderItem={({ item, index, separators }) =>
          open ? renderItem(item) : null
        }
      />
    </View>
  );
};
