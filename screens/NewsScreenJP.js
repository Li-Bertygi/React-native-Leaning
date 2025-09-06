// ./screens/NewsScreenJP.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { NewsKiziJP } from "../components/NewsKizi";
import { GOOGLE_NEWS_KEY } from "../src/config/keys";
const ENDPOINT = (page = 1) =>
  `https://gnews.io/api/v4/top-headlines?lang=ja&country=jp&max=20&page=${page}&apikey=${GOOGLE_NEWS_KEY}`;

export default function NewsScreenJP({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async (pageToLoad = 1, isRefresh = false) => {
    if (!GOOGLE_NEWS_KEY) {
      setError("GOOGLE_NEWS_KEY が設定されていません。");
      setLoading(false);
      return;
    }
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const res = await fetch(ENDPOINT(pageToLoad));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const newArticles = Array.isArray(json.articles) ? json.articles : [];

      setHasMore(newArticles.length > 0);
      setArticles((prev) =>
        pageToLoad === 1 ? newArticles : [...prev, ...newArticles]
      );
      setPage(pageToLoad);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(1);
  }, [fetchNews]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews(1, true);
  };

  const loadMore = () => {
    if (loading || !hasMore) return;
    fetchNews(page + 1);
  };

  const openDetail = (item) => {
    navigation.navigate("Detail", {
      title: item.title,
      imageUrl: item.image,
      content: item.description || item.title,
      url: item.url,
      publishedAt: item.publishedAt,
    });
  };

  if (loading && articles.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>最新ニュースを読み込み中…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {error ? (
        <Text style={{ color: "#c00", padding: 12 }}>
          読み込みエラー: {String(error)}
        </Text>
      ) : null}

      <FlatList
        data={articles}
        keyExtractor={(item, idx) => `${item.url}-${idx}`}
        renderItem={({ item }) => (
          <NewsKiziJP item={item} onPress={() => openDetail(item)} />
        )}
        onEndReachedThreshold={0.4}
        onEndReached={loadMore}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
