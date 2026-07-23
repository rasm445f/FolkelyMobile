import { Host, List, ListItem } from "@expo/ui";
import { ActivityIndicator, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

export default function NewsScreen() {
  const { data: announcements, loading, error } = useApi(api.getAnnouncements);

  return (
    <View className="flex-1">
      {loading && <ActivityIndicator className="mt-6" />}
      {error && <Text className="mt-6 text-center">Couldn't load announcements. Try again soon.</Text>}
      {!loading && !error && (announcements?.length ?? 0) === 0 && (
        <Text className="mt-6 text-center">No announcements yet.</Text>
      )}

      {!loading && !error && (announcements?.length ?? 0) > 0 && (
        <Host style={{ flex: 1 }}>
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
