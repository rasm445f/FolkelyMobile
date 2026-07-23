import { Button, Host, List, ListItem, Row } from "@expo/ui";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

// Always render in the festival's own timezone, not the viewer's device timezone —
// this is an in-person event, so a visitor's phone being set to a different zone
// shouldn't change what showtime they see.
const FESTIVAL_TIME_ZONE = "Europe/Copenhagen";

const FESTIVAL_DAYS = [
  { label: "Fri", date: "2026-07-24" },
  { label: "Sat", date: "2026-07-25" },
  { label: "Sun", date: "2026-07-26" },
];

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: FESTIVAL_TIME_ZONE,
  });
}

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
      <Host matchContents style={{ padding: 16 }}>
        <Row spacing={8}>
          {FESTIVAL_DAYS.map((day) => (
            <Button
              key={day.date}
              variant={selectedDay === day.date ? "filled" : "outlined"}
              label={day.label}
              onPress={() => setSelectedDay(day.date)}
            />
          ))}
        </Row>
      </Host>

      {loading && <ActivityIndicator className="mt-6" />}
      {error && <Text className="mt-6 text-center">Couldn't load the lineup. Try again soon.</Text>}
      {!loading && !error && dayPerformances.length === 0 && (
        <Text className="mt-6 text-center">No performances scheduled for this day yet.</Text>
      )}

      {!loading && !error && dayPerformances.length > 0 && (
        <Host style={{ flex: 1 }}>
          <List>
            {dayPerformances.map((performance) => (
              <ListItem
                key={performance.id}
                supportingText={`${formatTime(performance.startTime)} - ${formatTime(performance.endTime)} - ${performance.stage.name}`}>
                {performance.artist.name}
              </ListItem>
            ))}
          </List>
        </Host>
      )}
    </View>
  );
}
