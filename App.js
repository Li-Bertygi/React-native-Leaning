// ./App.js
import React, { useState } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";

import NewsScreenKR from "./screens/NewsScreenKR";
import DetailScreenKR from "./screens/DetailScreenKR";
import NewsScreenJP from "./screens/NewsScreenJP";
import DetailScreenJP from "./screens/DetailScreenJP";
import NewsScreenUS from "./screens/NewsScreenUS";
import DetailScreenUS from "./screens/DetailScreenUS";

import WeatherScreenKR from "./screens/WeatherScreenKR";
import WeatherScreenJP from "./screens/WeatherScreenJP";
import WeatherScreenUS from "./screens/WeatherScreenUS";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewsStack = ({ country }) => {
  const NewsComponent =
    country === "KR"
      ? NewsScreenKR
      : country === "JP"
        ? NewsScreenJP
        : NewsScreenUS;

  const DetailComponent =
    country === "KR"
      ? DetailScreenKR
      : country === "JP"
        ? DetailScreenJP
        : DetailScreenUS;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsMain" component={NewsComponent} />
      <Stack.Screen name="Detail" component={DetailComponent} />
    </Stack.Navigator>
  );
};

const WeatherStack = ({ country }) => {
  const WeatherComponent =
    country === "KR"
      ? WeatherScreenKR
      : country === "JP"
        ? WeatherScreenJP
        : WeatherScreenUS;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WeatherMain" component={WeatherComponent} />
    </Stack.Navigator>
  );
};

const isDetailRoute = (route) => {
  const focused = getFocusedRouteNameFromRoute(route);
  return focused === "Detail";
};

// App.js
export default function App() {
  const [country, setCountry] = useState("US");

  const cycleCountry = () => {
    setCountry((prev) => (prev === "US" ? "JP" : prev === "JP" ? "KR" : "US"));
  };

  const flagImage =
    country === "KR"
      ? require("./assets/kr.png")
      : country === "JP"
        ? require("./assets/jp.png")
        : require("./assets/us.png");

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
                onPress={cycleCountry}
                style={{ marginRight: 16 }}
              >
                <Image
                  source={flagImage}
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
            headerTitle:
              country === "KR"
                ? "뉴스"
                : country === "JP"
                  ? "ニュース"
                  : "News",
            tabBarLabel:
              country === "KR"
                ? "뉴스"
                : country === "JP"
                  ? "ニュース"
                  : "News",
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              navigation.navigate("NewsTab", { screen: "NewsMain" });
            },
          })}
        >
          {() => <NewsStack country={country} />}
        </Tab.Screen>

        <Tab.Screen
          name="WeatherTab"
          options={{
            headerTitle:
              country === "KR"
                ? "일기예보"
                : country === "JP"
                  ? "天気予報"
                  : "Weather forecast",
            tabBarLabel:
              country === "KR"
                ? "일기예보"
                : country === "JP"
                  ? "天気予報"
                  : "Weather forecast",
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate("WeatherTab", { screen: "WeatherMain" });
            },
          })}
        >
          {() => <WeatherStack country={country} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
