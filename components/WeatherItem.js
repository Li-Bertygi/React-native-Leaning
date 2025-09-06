// components/WeatherItem.js
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const WeatherItem = ({ description, icon, name }) => {
  return (
    <View style={styles.box}>
      <View style={styles.moziBox}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </View>

      <View style={styles.gazoBox}>
        <Image
          style={{ width: 95, height: 95 }}
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        />
        <Text style={styles.subText} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </View>
  );
};
export default WeatherItem;

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: "100%",
    borderColor: "lightblue",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  moziBox: {
    flex: 1,
    paddingRight: 12,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
  },
  gazoBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },

  subText: {
    fontSize: 14,
    color: "darkblue",
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 8,
    maxWidth: "70%",
  },
});
