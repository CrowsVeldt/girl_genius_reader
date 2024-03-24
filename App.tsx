import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import HomeScreen from "./screens/HomeScreen";
import BookmarkScreen from "./screens/BookmarksScreen";
import ListScreen from "./screens/ListScreen";

import DateProvider from "./context/DateContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <DateProvider>
            <Stack.Navigator
              initialRouteName="Girl Genius"
              screenOptions={{
                headerStyle: { backgroundColor: "#00152d" },
                headerTitleStyle: { color: "white" },
              }}
            >
              <Stack.Screen name="Girl Genius" component={HomeScreen} />
              <Stack.Screen
                name="Bookmarks"
                component={BookmarkScreen}
                options={{
                  title: "Bookmarks",
                }}
              />
              <Stack.Screen
                name="List"
                component={ListScreen}
                options={{
                  title: "List",
                }}
              />
            </Stack.Navigator>
          </DateProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
