import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

export default function StoryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: story, loading, error } = useApi(() => api.getStory(id));
  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{ title: story?.title ?? "Story", headerBackButtonDisplayMode: "minimal", headerTransparent: true }}
      />

      {loading && <ActivityIndicator style={{ marginTop: headerHeight + 24 }} />}
      {error && <Text style={{ marginTop: headerHeight + 24 }} className="text-center">Couldn't load this story. Try again soon.</Text>}

      {story && (
        // Only the fallback (no cover image) needs the header-height offset --
        // when there's an image it's meant to bleed full-bleed behind the transparent header.
        <ScrollView contentContainerStyle={!story.imageUrl ? { paddingTop: headerHeight } : undefined}>
          {story.imageUrl && <Image source={{ uri: story.imageUrl }} className="aspect-[2/1] w-full" />}
          <View className="p-4">
            <Text className="text-2xl font-extrabold">{story.title}</Text>
            {story.body && <Text className="mt-2 text-stone-600">{story.body}</Text>}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
