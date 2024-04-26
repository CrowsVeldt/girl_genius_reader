import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootSiblingParent } from "react-native-root-siblings";
import HomeScreen from "./src/screens/HomeScreen";
import BookmarkScreen from "./src/screens/BookmarksScreen";
import IndexScreen from "./src/screens/IndexScreen";
import CustomHeader from "./src/components/CustomHeader";

import ComicProvider from "./src/context/ComicContext";

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
            <Drawer.Screen name="Index" component={IndexScreen} />
          </Drawer.Navigator>
        </ComicProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
