import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Folkely",
  slug: "folkely",
  scheme: "folkely",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  platforms: ["ios", "android"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.example.folkely",
  },
  android: {
    package: "com.example.folkely",
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/android-icon-foreground.png",
      backgroundImage: "./assets/android-icon-background.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  plugins: ["expo-router", "expo-dev-client"],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
