import { SegmentedControl } from "@expo/ui/community/segmented-control";
import { Stack, router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";
import { PerformanceTile } from "@/components/PerformanceTile";

// Always render in the festival's own timezone, not the viewer's device timezone —
// this is an in-person event, so a visitor's phone being set to a different zone
// shouldn't change what showtime they see.
const FESTIVAL_TIME_ZONE = "Europe/Copenhagen";

const MAIN_STAGE_NAME = "Hovedscene";

const FESTIVAL_DAYS = [
  { label: "Fredag", date: "2026-07-24" },
  { label: "Lørdag", date: "2026-07-25" },
  { label: "Søndag", date: "2026-07-26" },
];

// Returns the performance's calendar date (YYYY-MM-DD) in the festival's local timezone,
// so late-night sets bucket under the day they're actually experienced as, not their UTC date.
function localDateKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: FESTIVAL_TIME_ZONE }).format(new Date(iso));
}

export default function LineupScreen() {
  const [selectedDay, setSelectedDay] = useState(FESTIVAL_DAYS[0].date);
  const { data: performances, loading, error } = useApi(api.getPerformances);

  const dayPerformances = useMemo(() => {
    if (!performances) return [];
    return performances
      .filter((performance) => localDateKey(performance.startTime) === selectedDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [performances, selectedDay]);

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: "Lineup", headerTransparent: true, headerLargeTitle: true }} />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <SegmentedControl
          style={{ marginBottom: 16 }}
          values={FESTIVAL_DAYS.map((day) => day.label)}
          selectedIndex={FESTIVAL_DAYS.findIndex((day) => day.date === selectedDay)}
          onChange={(event) => setSelectedDay(FESTIVAL_DAYS[event.nativeEvent.selectedSegmentIndex].date)}
        />

        {loading && <ActivityIndicator className="mt-6" />}
        {error && <Text className="mt-6 text-center">Couldn't load the lineup. Try again soon.</Text>}
        {!loading && !error && dayPerformances.length === 0 && (
          <Text className="mt-6 text-center">No performances scheduled for this day yet.</Text>
        )}

        <View className="gap-3">
          {dayPerformances.map((performance) => (
            <Pressable key={performance.id} onPress={() => router.push(`/performance/${performance.id}`)}>
              <PerformanceTile performance={performance} bold={performance.stage.name === MAIN_STAGE_NAME} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
