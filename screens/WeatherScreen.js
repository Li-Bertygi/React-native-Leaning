// .\screens\WeatherScreen.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import WeatherItem from "../components/WeatherItem";
import { WEATHER_KEY } from "../src/config/keys";
import axios from "axios";

const Hokkaido = {
  name: "北海道",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Asahikawa&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Touhoku = {
  name: "東北",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Yamagata&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Kantou = {
  name: "関東",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Hokuriku = {
  name: "北陸",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Nagano&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Toukai = {
  name: "東海",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Nagoya&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Kinnki = {
  name: "近畿",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Osaka&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Tyugoku = {
  name: "中国",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Hiroshima&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const sikoku = {
  name: "四国",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Matsuyama&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Kyusyu = {
  name: "九州",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Ozu&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};
const Okinawa = {
  name: "沖縄",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Okinawa&lang=ja&units=metric&appid=${WEATHER_KEY}`,
};

const TotalUri = [
  Hokkaido,
  Touhoku,
  Kantou,
  Hokuriku,
  Toukai,
  Kinnki,
  Tyugoku,
  sikoku,
  Kyusyu,
  Okinawa,
];

export default function WeatherScreen() {
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
    alignItems: "center",
    justifyContent: "center",
  },
});
