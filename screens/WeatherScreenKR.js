// ./screens/WeatherScreenJP.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import WeatherItem from "../components/WeatherItem";
import { WEATHER_KEY } from "../src/config/keys";
import axios from "axios";

const Sudogwon = {
  name: "수도권",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Seoul,KR&lang=kr&units=metric&appid=${WEATHER_KEY}`,
};
const Gangwon = {
  name: "강원",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Chuncheon,KR&lang=kr&units=metric&appid=${WEATHER_KEY}`,
};
const Chungcheong = {
  name: "충청",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Daejeon,KR&lang=kr&units=metric&appid=${WEATHER_KEY}`,
};
const Honam = {
  name: "호남",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Gwangju,KR&lang=kr&units=metric&appid=${WEATHER_KEY}`,
};
const Yeongnam = {
  name: "영남",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Busan,KR&lang=kr&units=metric&appid=${WEATHER_KEY}`,
};
const Jeju = {
  name: "제주",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Jeju,KR&lang=kr&units=metric&appid=${WEATHER_KEY}`,
};

const TotalUri = [Sudogwon, Gangwon, Chungcheong, Honam, Yeongnam, Jeju];

export default function WeatherScreenKR() {
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
