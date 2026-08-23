import type { Story } from "@folkely/shared";
import { ImageBackground, View } from "react-native";
import { Text } from "@/components/Text";

const STORY_TIME_ZONE = "Europe/Copenhagen";

function formatStoryDate(iso: string) {
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    timeZone: STORY_TIME_ZONE,
  }).format(new Date(iso));
}

export function StoryCard({ story }: { story: Story }) {
  const overlay = (
    <View className="absolute inset-x-0 bottom-0 bg-black/55 px-4 py-3">
      <Text className="text-sm font-quatro-semibold text-white">{formatStoryDate(story.createdAt)}</Text>
      <Text className="mt-1 text-2xl font-quatro-black uppercase text-white">{story.title}</Text>
    </View>
  );

  if (story.imageUrl) {
    return (
      <ImageBackground
        source={{ uri: story.imageUrl }}
        className="aspect-[2/1] w-full overflow-hidden rounded-2xl"
        imageClassName="rounded-2xl">
        {overlay}
      </ImageBackground>
    );
  }

  return <View className="aspect-[2/1] w-full overflow-hidden rounded-2xl bg-stone-700">{overlay}</View>;
}
