import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import HomeScreen from "./screens/HomeScreen";
import BookmarkScreen from "./screens/BookmarksScreen";
import ListScreen from "./screens/ListScreen";

import DateProvider from "./context/DateContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <DateProvider>
            <Drawer.Navigator initialRouteName="Girl Genius">
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Bookmarks" component={BookmarkScreen} />
              <Drawer.Screen name="Comic List" component={ListScreen} />
            </Drawer.Navigator>
          </DateProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
