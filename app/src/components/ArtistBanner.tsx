import type { Artist } from "@folkely/shared";
import { Image, Text, View } from "react-native";

export function ArtistBanner({ artist }: { artist: Artist }) {
  const overlay = (
    <View className="absolute inset-x-0 bottom-0 bg-black/55 px-4 pb-4 pt-10">
      <Text className="font-hoefler text-3xl text-white">{artist.name}</Text>
      {artist.genre && <Text className="mt-1 text-base text-white/80">{artist.genre}</Text>}
    </View>
  );

  if (artist.imageUrl) {
    return (
      <View className="aspect-[4/3] w-full overflow-hidden">
        <Image source={{ uri: artist.imageUrl }} className="h-full w-full" />
        {overlay}
      </View>
    );
  }

  return <View className="aspect-[4/3] w-full overflow-hidden bg-stone-700">{overlay}</View>;
}
