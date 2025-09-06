// ./screens/DetailScreenUS.js
import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function DetailScreenUS(props) {
  const { route } = props;
  const article = route?.params?.article;
  const directUrl = route?.params?.url;
  const finalUrl = article?.url ?? directUrl ?? "";
  return <WebView style={styles.container} source={{ uri: finalUrl }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
