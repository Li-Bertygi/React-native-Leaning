// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";

import NewsScreen from "./screens/NewsScreen";
import DetailScreen from "./screens/DetailScreen";
import NewsScreenJP from "./screens/NewsScreenJP";
import DetailScreenJP from "./screens/DetailScreenJP";
import WeatherScreen from "./screens/WeatherScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewsStack = ({ isJapanese }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="NewsMain"
      component={isJapanese ? NewsScreenJP : NewsScreen}
    />
    <Stack.Screen
      name="Detail"
      component={isJapanese ? DetailScreenJP : DetailScreen}
    />
  </Stack.Navigator>
);

const WeatherStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WeatherMain" component={WeatherScreen} />
  </Stack.Navigator>
);

export default function App() {
  const [isJapanese, setIsJapanese] = useState(false);
  const toggleLang = () => setIsJapanese((prev) => !prev);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === "NewsTab" || route.name === "ニュースTab") {
              icon = "newspaper-o";
            } else {
              icon = "sun-o";
            }
            return <FontAwesome name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name={isJapanese ? "ニュースTab" : "NewsTab"}
          options={{
            headerTitle: isJapanese ? "ニュース" : "News",
            tabBarLabel: isJapanese ? "ニュース" : "News",
            headerRight: () => (
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
                  style={{ width: 28, height: 18 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ),
          }}
        >
          {() => <NewsStack isJapanese={isJapanese} />}
        </Tab.Screen>

        <Tab.Screen
          name={isJapanese ? "天気予報Tab" : "WeatherTab"}
          component={WeatherStack}
          options={{
            headerTitle: isJapanese ? "天気予報" : "Weather forecast",
            tabBarLabel: isJapanese ? "天気予報" : "Weather forecast",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
