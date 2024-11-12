import "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";
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
import MessageScreen from "./src/screens/MessageScreen";

const Drawer = createDrawerNavigator();

Sentry.init({
  dsn: "https://ed8a42b2ba7424a0dcfd1ef4d9c810b9@o4508282626310144.ingest.de.sentry.io/4508282643087440",
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

function App() {
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
              <Drawer.Screen
                name="Message"
                component={MessageScreen}
                options={{ drawerItemStyle: { display: "none" } }}
              />
            </Drawer.Navigator>
          </ComicProvider>
        </AppProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

export default Sentry.wrap(App);
