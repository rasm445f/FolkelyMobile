import type { Performance } from "@folkely/shared";
import { ImageBackground, View } from "react-native";
import { Text } from "@/components/Text";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });
}

export function PerformanceTile({ performance, bold }: { performance: Performance; bold?: boolean }) {
  const overlay = (
    <View className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2">
      <Text numberOfLines={1} className={`text-white ${bold ? "font-quatro-bold" : "font-quatro-medium"}`}>
        {performance.artist.name}
      </Text>
      <Text className="mt-0.5 text-xs text-white/80">{formatTime(performance.startTime)}</Text>
    </View>
  );

  if (performance.artist.imageUrl) {
    return (
      <ImageBackground
        source={{ uri: performance.artist.imageUrl }}
        className="aspect-square w-full overflow-hidden rounded-xl"
        imageClassName="rounded-xl">
        {overlay}
      </ImageBackground>
    );
  }

  return <View className="aspect-square w-full overflow-hidden rounded-xl bg-stone-700">{overlay}</View>;
}
