import { Button, Host, List, ListItem, Row } from "@expo/ui";
import { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

const FESTIVAL_DAYS = [
  { label: "Fri", date: "2026-07-24" },
  { label: "Sat", date: "2026-07-25" },
  { label: "Sun", date: "2026-07-26" },
];

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function LineupScreen() {
  const [selectedDay, setSelectedDay] = useState(FESTIVAL_DAYS[0].date);
  const { data: performances, loading, error } = useApi(api.getPerformances);

  const dayPerformances = useMemo(() => {
    if (!performances) return [];
    return performances
      .filter((performance) => performance.startTime.startsWith(selectedDay))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [performances, selectedDay]);

  return (
    <View style={styles.container}>
      <Host matchContents style={styles.dayPicker}>
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

      {loading && <ActivityIndicator style={styles.status} />}
      {error && <Text style={styles.status}>Couldn't load the lineup. Try again soon.</Text>}
      {!loading && !error && dayPerformances.length === 0 && (
        <Text style={styles.status}>No performances scheduled for this day yet.</Text>
      )}

      {!loading && !error && dayPerformances.length > 0 && (
        <Host style={styles.list}>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  dayPicker: { padding: 16 },
  list: { flex: 1 },
  status: { marginTop: 24, textAlign: "center" },
});
