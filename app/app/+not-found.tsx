import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "@/components/Text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found", headerTitleStyle: { fontFamily: "Quatro-SemiBold" } }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-lg font-quatro-semibold">This screen doesn't exist.</Text>
        <Link href="/lineup" className="mt-4 py-4">
          <Text>Go back to the lineup</Text>
        </Link>
      </View>
    </>
  );
}
