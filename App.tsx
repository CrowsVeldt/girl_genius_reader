import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootSiblingParent } from "react-native-root-siblings";
import HomeScreen from "./screens/HomeScreen";
import BookmarkScreen from "./screens/BookmarksScreen";
import ListScreen from "./screens/ListScreen";
import CustomHeader from "./components/CustomHeader";

import ComicProvider from "./context/ComicContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <ComicProvider>
          <Drawer.Navigator
            initialRouteName="Girl Genius"
            screenOptions={{
              swipeEnabled: false,
              drawerStyle: {
                backgroundColor: process.env.EXPO_PUBLIC_LIGHT_DRAWER_COLOR,
              },
              header: ({ navigation, options, route, layout }) => (
                <CustomHeader
                  navigation={navigation}
                  options={options}
                  route={route}
                  layout={layout}
                />
              ),
              headerStyle: {
                height: 60,
                backgroundColor: process.env.EXPO_PUBLIC_LIGHT_HEAD_COLOR,
              },
            }}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Bookmarks" component={BookmarkScreen} />
            <Drawer.Screen name="List" component={ListScreen} />
          </Drawer.Navigator>
        </ComicProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
