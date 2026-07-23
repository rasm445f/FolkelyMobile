import { ActivityIndicator, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

const INITIAL_REGION = {
  latitude: 55.9639,
  longitude: 11.8594,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapScreen() {
  const { data: pois, loading, error } = useApi(api.getPois);

  if (loading) return <ActivityIndicator style={styles.status} />;
  if (error) return <Text style={styles.status}>Couldn't load the map. Try again soon.</Text>;

  return (
    <MapView style={styles.map} initialRegion={INITIAL_REGION}>
      {(pois ?? []).map((poi) => (
        <Marker
          key={poi.id}
          coordinate={{ latitude: poi.lat, longitude: poi.lng }}
          title={poi.name}
          description={poi.description ?? poi.type}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  status: { marginTop: 24, textAlign: "center" },
});
