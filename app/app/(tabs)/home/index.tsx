import { Stack, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";
import { StoryCard } from "@/components/StoryCard";
import { Text } from "@/components/Text";

export default function HomeScreen() {
  const { data: stories, loading, error } = useApi(api.getStories);

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "FOLKELY",
          // headerLargeTitle only takes effect on iOS — Android always shows the compact header.
          headerLargeTitle: true,
          // className doesn't reliably apply inside React Navigation's header styles (its own
          // inline styles interfere) — use style objects directly here instead.
          // headerTitleStyle/headerLargeTitleStyle only support fontFamily/fontSize/fontWeight/
          // color (native UINavigationBar title label) — no fontStyle, so the italic PostScript
          // name has to be used directly here.
          headerLargeTitleStyle: { fontFamily: "Quatro-UltraBlackItalic", fontSize: 34 },
          headerTitleStyle: { fontFamily: "Quatro-UltraBlackItalic", fontSize: 17 },
          headerTransparent: true,
        }}
      />

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {loading && <ActivityIndicator className="mt-6" />}
        {error && <Text className="mt-6 text-center">Couldn't load stories. Try again soon.</Text>}
        {!loading && !error && (stories?.length ?? 0) === 0 && (
          <Text className="mt-6 text-center">No stories yet.</Text>
        )}

        {!loading &&
          !error &&
          (stories ?? []).map((story) => (
            <Pressable key={story.id} onPress={() => router.push(`/story/${story.id}`)}>
              <StoryCard story={story} />
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
}
