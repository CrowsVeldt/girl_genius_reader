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
            options={{drawerLabel: "Home", title: "Home"}}
            />
            <Drawer.Screen
            name="comicpage"
            options={{drawerLabel: "Comic Page", title: "Comic"}}
            />
            <Drawer.Screen
            name="bookmarks"
            options={{drawerLabel: "Bookmarks", title: "Bookmarks"}}
            />
            <Drawer.Screen
            name="volume"
            options={{drawerLabel: "Volume", title: "Volume"}}
            />
            <Drawer.Screen
            name="options"
            options={{drawerLabel: "Options", title: "Options"}}
            />
            <Drawer.Screen
            name="privacy"
            options={{drawerLabel: "Privacy", title: "Privacy"}}
            />
            <Drawer.Screen
            name="acknowledgments"
            options={{drawerLabel: "Acknowledgments", title: "Acknowledgments"}}
            />
            <Drawer.Screen
            name="changelog"
            options={{drawerLabel: "Changelog", title: "Changelog"}}
            />
            <Drawer.Screen
            name="message"
            options={{drawerLabel: "Message", title: "Message"}}
            />
          </Drawer>
        </ComicProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
