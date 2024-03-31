import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootSiblingParent } from "react-native-root-siblings";
import HomeScreen from "./screens/HomeScreen";
import BookmarkScreen from "./screens/BookmarksScreen";
import ListScreen from "./screens/ListScreen";

import DateProvider from "./context/DateContext";
import TitleProvider from "./context/TitleContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <DateProvider>
          <TitleProvider>
            <Drawer.Navigator
              initialRouteName="Girl Genius"
              screenOptions={{
                swipeEnabled: false,
                drawerStyle: {
                  backgroundColor: process.env.EXPO_PUBLIC_LIGHT_DRAWER_COLOR,
                },
                headerStyle: {
                  backgroundColor: process.env.EXPO_PUBLIC_LIGHT_HEAD_COLOR,
                },
              }}
            >
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Bookmarks" component={BookmarkScreen} />
              <Drawer.Screen name="List" component={ListScreen} />
            </Drawer.Navigator>
          </TitleProvider>
        </DateProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
