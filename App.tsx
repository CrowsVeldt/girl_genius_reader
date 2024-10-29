import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootSiblingParent } from "react-native-root-siblings";

import ComicProvider from "./src/context/ComicContext";
import AppProvider from "./src/context/AppContext";

import { StatusBar } from "expo-status-bar";
import DrawerContent from "./src/components/custom navigation components/CustomDrawer";
import CustomHeader from "./src/components/custom navigation components/CustomHeader";

import AckScreen from "./src/screens/AckScreen";
import BookmarkScreen from "./src/screens/BookmarksScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PrivacyScreen from "./src/screens/PrivacyScreen";
import ComicPageScreen from "./src/screens/ComicPageScreen";
import VolumeScreen from "./src/screens/VolumeScreen";
import ChangeLogScreen from "./src/screens/ChangeLogScreen";
import Options from "./src/screens/OptionsScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <AppProvider>
          <ComicProvider>
            <StatusBar style="dark" />
            <Drawer.Navigator
              // Custom drawer content
              drawerContent={(props) => <DrawerContent {...props} />}
              initialRouteName="Girl Genius"
              screenOptions={{
                swipeEnabled: false,
                drawerStyle: {
                  backgroundColor: process.env.EXPO_PUBLIC_LIGHT_DRAWER_COLOR,
                },
                header: ({ navigation, options, route, layout }) => (
                  // Custom header
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
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="ComicPage"
                component={ComicPageScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Volume"
                component={VolumeScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Bookmarks"
                component={BookmarkScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Privacy Policy"
                component={PrivacyScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Acknowledgements"
                component={AckScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Options"
                component={Options}
                options={{ drawerItemStyle: { display: "none" } }}
              />
              <Drawer.Screen
                name="Changelog"
                component={ChangeLogScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
            </Drawer.Navigator>
          </ComicProvider>
        </AppProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
