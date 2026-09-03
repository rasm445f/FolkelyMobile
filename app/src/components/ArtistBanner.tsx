import type { Artist } from "@folkely/shared";
import { Image, View } from "react-native";
import { Text } from "@/components/Text";

export function ArtistBanner({ artist }: { artist: Artist }) {
  const overlay = (
    <View className="absolute inset-x-0 bottom-0  px-4 pb-3">
      <Text className="font-hoefler italic text-3xl text-white">{artist.name}</Text>
      {artist.genre && <Text className="mt-1 text-base text-white/80">{artist.genre}</Text>}
    </View>
  );

  if (artist.imageUrl) {
    return (
      <View className="aspect-[16/10] w-full overflow-hidden">
        <Image
          source={{ uri: artist.imageUrl }}
          resizeMode="cover"
          // Oversize the image and pull it up so the fixed-aspect crop window reveals more
          // of the photo's lower half instead of a plain center crop.
          style={{ position: "absolute", width: "100%", height: "160%" }}
        />
        {overlay}
      </View>
    );
  }

  return <View className="aspect-[4/3] w-full overflow-hidden bg-stone-700">{overlay}</View>;
}
