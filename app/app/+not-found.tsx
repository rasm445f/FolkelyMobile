import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-lg font-semibold">This screen doesn't exist.</Text>
        <Link href="/lineup" className="mt-4 py-4">
          Go back to the lineup
        </Link>
      </View>
    </>
  );
}
