import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { DateContext } from "../context/DateContext";
import Toast from "react-native-root-toast";

export default function BookmarkLink({
  date,
  nav,
}: {
  date: string;
  nav: any;
}) {
  const { removeBookmark, changeCurrentDate } = useContext(DateContext);

  return (
    <View>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          changeCurrentDate(date);
          nav.navigate("Home");
        }}
      >
        <Text style={styles.linkText}>{date}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Toast.show(`Removed ${date} from bookmarks`)
          removeBookmark(date);
        }}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    borderColor: "black",
    borderWidth: 1,
  },
  linkText: {
    textAlign: "center",
  },
});
