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
  plugins: [
    "expo-router",
    "expo-dev-client",
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/FuturaLTW01-Light.ttf",
          "./assets/fonts/HelveticaNeueW01-45Light.ttf",
          "./assets/fonts/HoeflerText-Italic.ttf",
          "./assets/fonts/Quatro-ExtraLight.otf",
          "./assets/fonts/Quatro-ExtraLightItalic.otf",
          "./assets/fonts/Quatro-Light.otf",
          "./assets/fonts/Quatro-LightItalic.otf",
          "./assets/fonts/Quatro-Book.otf",
          "./assets/fonts/Quatro-BookItalic.otf",
          "./assets/fonts/Quatro-Regular.otf",
          "./assets/fonts/Quatro-RegularItalic.otf",
          "./assets/fonts/Quatro-Medium.otf",
          "./assets/fonts/Quatro-MediumItalic.otf",
          "./assets/fonts/Quatro-SemiBold.otf",
          "./assets/fonts/Quatro-SemiBoldItalic.otf",
          "./assets/fonts/Quatro-Bold.otf",
          "./assets/fonts/Quatro-BoldItalic.otf",
          "./assets/fonts/Quatro-Black.otf",
          "./assets/fonts/Quatro-BlackItalic.otf",
          "./assets/fonts/Quatro-UltraBlack.otf",
          "./assets/fonts/Quatro-UltraBlackItalic.otf",
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
