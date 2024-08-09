import { Dimensions, ScaledSize, StyleSheet, Text, View } from "react-native";
import NetStatus from "../components/NetStatus";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext } from "react";
import { ComicContext } from "../context/ComicContext";

const window: ScaledSize = Dimensions.get("window");

export default function Home({ navigation }: { navigation: any }) {
  const { getColorTheme } = useContext(ComicContext);
  console.log(getColorTheme());
  return (
    <View
      style={[
        styles.page,
        getColorTheme() === "light" ? styles.lightTheme : styles.darkTheme,
      ]}
    >
      <NetStatus />
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("ComicPage");
        }}
      >
        <Text>Comic Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Bookmarks");
        }}
      >
        <Text>Bookmarks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Privacy Policy");
        }}
      >
        <Text>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Acknowledgements");
        }}
      >
        <Text>Acknowledgements</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          navigation.navigate("Options");
        }}
      >
        <Text>Options</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          // navigation.navigate("Acknowledgements");
        }}
      >
        <Text>Link to girlgeniusonline.com (not yet implemented)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => {
          // navigation.navigate("Acknowledgements");
        }}
      >
        <Text>Link to girl genius shops (not yet implemented)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  linkButton: {
    width: window.width,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  lightTheme: {
    backgroundColor: process.env.EXPO_PUBLIC_LIGHT_BG_COLOR,
  },
  darkTheme: {
    backgroundColor: process.env.EXPO_PUBLIC_DARK_BG_COLOR,
  },
});
