import { Stack, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";
import { StoryCard } from "@/components/StoryCard";

export default function HomeScreen() {
  const { data: stories, loading, error } = useApi(api.getStories);

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: "Folkely", headerTransparent: true, headerLargeTitle: true }} />

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
