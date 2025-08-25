import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NewsScreen from "./screens/NewsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./screens/DetailScreen";

const Stack = createStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ニュース" component={NewsScreen} />
        <Stack.Screen name="詳細ページ" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
