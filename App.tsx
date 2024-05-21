import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootSiblingParent } from "react-native-root-siblings";

import DrawerContent from "./src/components/Drawer";
import CustomHeader from "./src/components/CustomHeader";

import AckScreen from "./src/screens/AckScreen";
import BookmarkScreen from "./src/screens/BookmarksScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen";
import PrivacyScreen from "./src/screens/PrivacyScreen";

import ComicProvider from "./src/context/ComicContext";
import { useEffect, useState } from "react";
import {
  checkForLocalFiles,
  getDateFile,
  initializeLocalFiles,
  updateLocalFiles,
} from "./src/utils/storage";
import { fetchNewDates } from "./src/utils/network";
import { lastElement } from "./src/utils/utilFunctions";

const Drawer = createDrawerNavigator();

export default function App() {
  const [filesExist, setFilesExist] = useState(false);

  useEffect(() => {
    (async () => {
      const filesExist = await checkForLocalFiles();

      if (!filesExist) {
        initializeLocalFiles();
      }

      setFilesExist(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dates = await getDateFile();
      const updates = fetchNewDates(lastElement(dates));
      updateLocalFiles([...dates, ...(await updates)]);
    })();
  }, [filesExist]);

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <ComicProvider>
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
              options={{ drawerItemStyle: { borderBottomWidth: 1 } }}
            />
            <Drawer.Screen
              name="Bookmarks"
              component={BookmarkScreen}
              options={{ drawerItemStyle: { borderBottomWidth: 1 } }}
            />
            <Drawer.Screen
              name="Index"
              component={IndexScreen}
              options={{ drawerItemStyle: { borderBottomWidth: 1 } }}
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
