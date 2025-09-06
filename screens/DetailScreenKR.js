// ./screens/DetailScreenJP.js
import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function DetailScreenKR(props) {
  const { route } = props;
  const { url = "", publishedAt = "" } = route?.params || {};
  return <WebView style={styles.container} source={{ uri: url }} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
