import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

const FESTIVAL_TIME_ZONE = "Europe/Copenhagen";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: FESTIVAL_TIME_ZONE,
  });
}

export default function PerformanceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: performance, loading, error } = useApi(() => api.getPerformance(id));
  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: performance?.artist.name ?? "Performance",
          headerBackButtonDisplayMode: "minimal",
          headerTransparent: true,
        }}
      />

      {loading && <ActivityIndicator style={{ marginTop: headerHeight + 24 }} />}
      {error && (
        <Text style={{ marginTop: headerHeight + 24 }} className="text-center">
          Couldn't load this performance. Try again soon.
        </Text>
      )}

      {performance && (
        <ScrollView>
          {performance.artist.imageUrl ? (
            <Image source={{ uri: performance.artist.imageUrl }} className="aspect-[2/1] w-full" />
          ) : (
            <View className="aspect-[2/1] w-full bg-stone-700" />
          )}

          <View className="p-4">
            <Text className="text-2xl font-extrabold">{performance.artist.name}</Text>
            {performance.artist.genre && <Text className="mt-1 text-stone-500">{performance.artist.genre}</Text>}

            <Text className="mt-3 text-base font-semibold">
              {formatTime(performance.startTime)} - {formatTime(performance.endTime)} · {performance.stage.name}
            </Text>

            {performance.artist.description && (
              <Text className="mt-4 text-stone-600">{performance.artist.description}</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
