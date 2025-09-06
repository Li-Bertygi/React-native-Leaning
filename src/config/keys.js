// ./src/config/keys.js
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? Constants.manifest2?.extra ?? {};

export const NEWS_KEY = extra.newsApiKey ?? "";
export const WEATHER_KEY = extra.weatherApiKey ?? "";
export const GOOGLE_NEWS_KEY = extra.googleNewsApiKey ?? "";
export const NAVER_CLIENT_ID = extra.naverClientId ?? "";
export const NAVER_CLIENT_SECRET = extra.naverClientSecret ?? "";
