// ./screens/NewsScreenUS.js
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import NewsKiziUS from "../components/NewsKizi";
import { NEWS_KEY } from "../src/config/keys";
import axios from "axios";

const URI = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_KEY}`;

export default function NewsScreenUS({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const getNews = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const response = await axios.get(URI);
      setNews(response.data.articles || []);
    } catch (e) {
      setError(String(e.message));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getNews();
  }, [getNews]);

  const onRefresh = () => {
    setRefreshing(true);
    getNews(true);
  };

  if (loading && news.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Loading US news…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <Text style={{ color: "#c00", padding: 12 }}>Error: {error}</Text>
      ) : null}
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsKiziUS
            imageuri={item.urlToImage}
            title={item.title}
            subtext={item.publishedAt}
            onPress={() => navigation.navigate("Detail", { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
