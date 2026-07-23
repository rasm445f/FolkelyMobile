import { Host, List, ListItem } from "@expo/ui";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

export default function NewsScreen() {
  const { data: announcements, loading, error } = useApi(api.getAnnouncements);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={styles.status} />}
      {error && <Text style={styles.status}>Couldn't load announcements. Try again soon.</Text>}
      {!loading && !error && (announcements?.length ?? 0) === 0 && (
        <Text style={styles.status}>No announcements yet.</Text>
      )}

      {!loading && !error && (announcements?.length ?? 0) > 0 && (
        <Host style={styles.list}>
          <List>
            {(announcements ?? []).map((announcement) => (
              <ListItem key={announcement.id} supportingText={announcement.body}>
                {announcement.title}
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
  list: { flex: 1 },
  status: { marginTop: 24, textAlign: "center" },
});
