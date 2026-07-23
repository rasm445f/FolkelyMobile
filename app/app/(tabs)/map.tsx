import type { PointOfInterest, PoiType } from "@folkely/shared";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { api } from "@/api/client";
import { useApi } from "@/api/useApi";

// Percentage-based x/y (see PointOfInterest.x/y) are overlaid on this placeholder.
// Swap in the real venue map graphic here once it's ready, e.g.
// <Image source={require("@/assets/map.png")} className="absolute inset-0 h-full w-full" resizeMode="cover" />
const PIN_COLORS: Record<PoiType, string> = {
  STAGE: "#7C3AED",
  FOOD: "#F97316",
  BAR: "#DB2777",
  TOILET: "#0891B2",
  ENTRANCE: "#16A34A",
  EXIT: "#DC2626",
  MEDICAL: "#DC2626",
  INFO: "#2563EB",
  CAMPING: "#65A30D",
  OTHER: "#57534E",
};

export default function MapScreen() {
  const { data: pois, loading, error } = useApi(api.getPois);
  const [selected, setSelected] = useState<PointOfInterest | null>(null);

  if (loading) return <ActivityIndicator className="mt-6" />;
  if (error) return <Text className="mt-6 text-center">Couldn't load the map. Try again soon.</Text>;

  return (
    <View className="flex-1">
      <View className="aspect-square w-full bg-stone-200">
        {(pois ?? []).map((poi) => (
          <Pressable
            key={poi.id}
            onPress={() => setSelected(poi)}
            className="absolute -ml-2 -mt-2 h-4 w-4 rounded-full border-2 border-white"
            style={{ left: `${poi.x}%`, top: `${poi.y}%`, backgroundColor: PIN_COLORS[poi.type] }}
          />
        ))}
      </View>

      <View className="p-4">
        <Text className="text-base font-semibold">{selected ? selected.name : "Tap a pin for details"}</Text>
        {selected?.description && <Text className="mt-1 text-stone-600">{selected.description}</Text>}
      </View>
    </View>
  );
}
