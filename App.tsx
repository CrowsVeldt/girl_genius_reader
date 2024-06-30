import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootSiblingParent } from "react-native-root-siblings";

import DrawerContent from "./src/components/CustomDrawer";
import CustomHeader from "./src/components/CustomHeader";

import AckScreen from "./src/screens/AckScreen";
import BookmarkScreen from "./src/screens/BookmarksScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen";
import PrivacyScreen from "./src/screens/PrivacyScreen";

import ComicProvider from "./src/context/ComicContext";
import { useEffect } from "react";
import { checkForNewComics } from "./src/utils/network";
import { updateLists } from "./src/utils/lists";
import { dataUpdatedKey, saveData } from "./src/utils/storage";

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      // Check for new date
      try {
      const update = await checkForNewComics();
        if (update) {

        const updated: boolean = await updateLists();
        if (updated) {
          saveData(dataUpdatedKey, true);
        }
        }
      // if found, run update, and start countdown to check again
      // when countdown finishes repeat
      
      } catch (error) {
        console.warn("error in comic context useeffect");
        console.error(error);
      }
    })();
  }, []);

  return (
    <RootSiblingParent>
      <NavigationContainer>
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
              name="Bookmarks"
              component={BookmarkScreen}
              options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen
              name="Index"
              component={IndexScreen}
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
          </Drawer.Navigator>
        </ComicProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
