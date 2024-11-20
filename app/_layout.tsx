import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import AppProvider from "../src/context/AppContext";
import ComicProvider from "../src/context/ComicContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <AppProvider>
        <ComicProvider>
          <StatusBar style="dark" />
          <Drawer>
            <Drawer.Screen
            name="index"
            options={{drawerLabel: "Home", title: "Home", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="comicpage"
            options={{drawerLabel: "Comic Page", title: "Comic", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="bookmarks"
            options={{drawerLabel: "Bookmarks", title: "Bookmarks", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="volume"
            options={{drawerLabel: "Volume", title: "Volume", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="options"
            options={{drawerLabel: "Options", title: "Options", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="privacy"
            options={{drawerLabel: "Privacy", title: "Privacy", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="acknowledgments"
            options={{drawerLabel: "Acknowledgments", title: "Acknowledgments", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="changelog"
            options={{drawerLabel: "Changelog", title: "Changelog", swipeEnabled: false}}
            />
            <Drawer.Screen
            name="message"
            options={{drawerLabel: "Message", title: "Message", swipeEnabled: false}}
            />
          </Drawer>
        </ComicProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
