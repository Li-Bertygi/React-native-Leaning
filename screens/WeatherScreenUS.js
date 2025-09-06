// .\screens\WeatherScreenUS.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import WeatherItem from "../components/WeatherItem";
import { WEATHER_KEY } from "../src/config/keys";
import axios from "axios";

const NewEngland = {
  name: "New England",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Boston,MA,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const MiddleAtlantic = {
  name: "Middle Atlantic",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=New York,NY,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const EastNorthCentral = {
  name: "East North Central",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Chicago,IL,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const WestNorthCentral = {
  name: "West North Central",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Minneapolis,MN,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const SouthAtlantic = {
  name: "South Atlantic",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Atlanta,GA,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const EastSouthCentral = {
  name: "East South Central",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Nashville,TN,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const WestSouthCentral = {
  name: "West South Central",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Dallas,TX,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const Mountain = {
  name: "Mountain",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Denver,CO,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const Pacific = {
  name: "Pacific",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles,CA,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const Alaska = {
  name: "Alaska",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Anchorage,AK,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};
const Hawaii = {
  name: "Hawaii",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Honolulu,HI,US&lang=en&units=metric&appid=${WEATHER_KEY}`,
};

const TotalUri = [
  NewEngland,
  MiddleAtlantic,
  EastNorthCentral,
  WestNorthCentral,
  SouthAtlantic,
  EastSouthCentral,
  WestSouthCentral,
  Mountain,
  Pacific,
  Alaska,
  Hawaii,
];

export default function WeatherScreenUS() {
  const [weather, setWeathers] = useState([]);
  useEffect(() => {
    TotalUri.forEach((info) => {
      getWeathers(info);
    });
  }, []);

  const getWeathers = async (info) => {
    const response = await axios.get(info.uri);
    const uriData = response.data.weather;
    uriData[0].name = info.name;
    setWeathers((weather) => [...weather, uriData[0]]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={weather}
        renderItem={({ item }) => (
          <WeatherItem
            description={item.description}
            icon={item.icon}
            name={item.name}
          />
        )}
        keyExtractor={(contact, index) => String(index)}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
