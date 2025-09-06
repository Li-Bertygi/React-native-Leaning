// ./app.config.js
import "dotenv/config";
export default ({ config }) => ({
  ...config,
  name: "News",
  slug: "may-new-project",
  owner: "bertygi",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: false,

  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
  },

  android: {
    package: "com.bertygi.maynewproject",
    versionCode: 1,
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff",
    },
  },

  web: {
    favicon: "./assets/favicon.png",
  },

  extra: {
    eas: { projectId: "PROJECT ID" },
    newsApiKey: process.env.NEWS_API_KEY,
    weatherApiKey: process.env.WEATHER_API_KEY,
    googleNewsApiKey: process.env.GOOGLE_NEWS_API_KEY,
    naverClientId: process.env.NAVER_CLIENT_ID,
    naverClientSecret: process.env.NAVER_CLIENT_SECRET,
  },
});
