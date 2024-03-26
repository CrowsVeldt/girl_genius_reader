import { Text, View } from "react-native";
import { volumeObject } from "../../utils/types";

// make table with act, volume, title, date
// start with table collapsed, open on click

export const VolumeList = ({
  currentVolume,
  index,
}: {
  currentVolume: volumeObject;
  index: number;
}) => {
  const { volume, titles, dates } = currentVolume;

    // add titles and dates under volume header
    // align titles with the date they share

  return (
    <View>
      <Text>{`Volume ${index}`}</Text>
    </View>
  );
};
