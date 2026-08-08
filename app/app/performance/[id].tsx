import { Host, HStack, Label } from "@expo/ui/swift-ui";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
import { ActivityIndicator, Platform, ScrollView, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";
import { ArtistBanner } from "@/components/ArtistBanner";

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
          title: "",
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
          <ArtistBanner artist={performance.artist} />

          <View className="p-4">
            {/* @expo/ui's SwiftUI Label is iOS-only; Android falls back to plain text. */}
            {Platform.OS === "ios" ? (
              <Host matchContents>
                <HStack spacing={16}>
                  <Label
                    title={`${formatTime(performance.startTime)} - ${formatTime(performance.endTime)}`}
                    systemImage="clock"
                  />
                  <Label title={performance.stage.name} systemImage="mappin.and.ellipse" />
                </HStack>
              </Host>
            ) : (
              <Text className="text-base font-semibold">
                {formatTime(performance.startTime)} - {formatTime(performance.endTime)} · {performance.stage.name}
              </Text>
            )}

            {performance.artist.description && (
              <Text className="font-quatro mt-4 text-stone-600">
                {performance.artist.description}
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
