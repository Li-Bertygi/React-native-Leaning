// ./screens/NewsScreenKR.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from "../src/config/keys";
import { NewsKiziKR } from "../components/NewsKizi";

const qs = (q) => encodeURIComponent(q);
const ENDPOINT = (q, start = 1, display = 20, sort = "date") =>
  `https://openapi.naver.com/v1/search/news.json?query=${qs(q)}&start=${start}&display=${display}&sort=${sort}`;

const clean = (s = "") =>
  s
    .replace(/<\/?b>/g, "")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

export default function NewsScreenKR_Naver({ navigation }) {
  const [items, setItems] = useState([]);
  const [start, setStart] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async (nextStart = 1, isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);
      const res = await fetch(ENDPOINT("대한민국", nextStart), {
        headers: {
          "X-Naver-Client-Id": NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const newItems = (json.items || []).map((x) => ({
        title: clean(x.title),
        description: clean(x.description),
        url: x.originallink || x.link,
        publishedAt: new Date(x.pubDate).toISOString(),
        image: null,
      }));
      setHasMore(newItems.length > 0);
      setItems((prev) => (nextStart === 1 ? newItems : [...prev, ...newItems]));
      setStart(nextStart);
    } catch (e) {
      setError(String(e.message));
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
    if (!loading && hasMore) fetchNews(start + 20);
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

  if (loading && items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>한국 뉴스 불러오는 중…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {error ? (
        <Text style={{ color: "#c00", padding: 12 }}>오류: {error}</Text>
      ) : null}
      <FlatList
        data={items}
        keyExtractor={(it, idx) => `${it.url}-${idx}`}
        renderItem={({ item }) => (
          <NewsKiziKR item={item} onPress={() => openDetail(item)} />
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
