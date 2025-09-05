// .\src\config\keys.js
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? Constants.manifest2?.extra ?? {};

export const NEWS_KEY = extra.newsApiKey ?? "";
export const WEATHER_KEY = extra.weatherApiKey ?? "";
