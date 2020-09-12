import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Home from "./screens/Home";
import Search from "./screens/Search";
import Details from "./screens/Details";

import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";

function App() {
  const MainStack = createStackNavigator();

  const MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Details" component={Details} />
      <MainStack.Screen name="Search" component={Search} />
    </MainStack.Navigator>
  );

  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
}

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "cyan",
    accent: "yellow",
    white: "white",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);
