// App.js
import React, { useState } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";

import NewsScreenUS from "./screens/NewsScreenUS";
import DetailScreenUS from "./screens/DetailScreenUS";
import NewsScreenJP from "./screens/NewsScreenJP";
import DetailScreenJP from "./screens/DetailScreenJP";
import WeatherScreenJP from "./screens/WeatherScreenJP";
import WeatherScreenUS from "./screens/WeatherScreenUS";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewsStack = ({ isJapanese }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="NewsMain"
      component={isJapanese ? NewsScreenJP : NewsScreenUS}
    />
    <Stack.Screen
      name="Detail"
      component={isJapanese ? DetailScreenJP : DetailScreenUS}
    />
  </Stack.Navigator>
);

const WeatherStack = ({ isJapanese }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="WeatherMain"
      component={isJapanese ? WeatherScreenJP : WeatherScreenUS}
    />
  </Stack.Navigator>
);

const isDetailRoute = (route) => {
  const focused = getFocusedRouteNameFromRoute(route);
  return focused === "Detail";
};

export default function App() {
  const [isJapanese, setIsJapanese] = useState(false);
  const toggleLang = () => setIsJapanese((prev) => !prev);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }) => {
            const icon = route.name === "NewsTab" ? "newspaper-o" : "sun-o";
            return <FontAwesome name={icon} size={size} color={color} />;
          },
          headerRight: () => {
            if (isDetailRoute(route)) return null;
            return (
              <TouchableOpacity
                onPress={toggleLang}
                style={{ marginRight: 16 }}
              >
                <Image
                  source={
                    isJapanese
                      ? require("./assets/jp.png")
                      : require("./assets/us.png")
                  }
                  style={{ width: 28, height: 28 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          },
        })}
      >
        <Tab.Screen
          name="NewsTab"
          options={{
            headerTitle: isJapanese ? "ニュース" : "News",
            tabBarLabel: isJapanese ? "ニュース" : "News",
          }}
        >
          {() => <NewsStack isJapanese={isJapanese} />}
        </Tab.Screen>

        <Tab.Screen
          name="WeatherTab"
          options={{
            headerTitle: isJapanese ? "天気予報" : "Weather forecast",
            tabBarLabel: isJapanese ? "天気予報" : "Weather forecast",
          }}
        >
          {() => <WeatherStack isJapanese={isJapanese} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
