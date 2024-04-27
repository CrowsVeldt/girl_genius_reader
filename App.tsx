import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./src/components/Drawer";
import { RootSiblingParent } from "react-native-root-siblings";
import CustomHeader from "./src/components/CustomHeader";
import AckScreen from "./src/screens/AckScreen"
import BookmarkScreen from "./src/screens/BookmarksScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen";
import PrivacyScreen from "./src/screens/PrivacyScreen";

import ComicProvider from "./src/context/ComicContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <ComicProvider>
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
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
            <Drawer.Screen name="Privacy Policy" component={PrivacyScreen} />
            <Drawer.Screen name="Acknowledgements" component={AckScreen} />
          </Drawer.Navigator>
        </ComicProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
