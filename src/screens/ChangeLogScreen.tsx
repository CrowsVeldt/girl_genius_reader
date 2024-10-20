import { Text, View } from "react-native";
import { changeList } from "../../changelog";

export default function ChangeLogScreen() {
  return (
    <View>
    {changeList.map((item, index) => <Text key={index}>{`${item[0]}:  ${item[1]}`}</Text>)}
    </View>
  );
}
