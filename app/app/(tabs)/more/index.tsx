import { Stack } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
import { ScrollView, Text, View } from "react-native";

const FAQ = [
  { question: "When do gates open?", answer: "Gates open at 14:00 each day." },
  { question: "Can I bring my own food and drinks?", answer: "Outside food and drinks are not allowed, but water refill stations are available on site." },
  { question: "Is there parking?", answer: "Yes, parking is available near the main entrance." },
];

export default function MoreScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: "More", headerTransparent: true, headerLargeTitle: true }} />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingTop: headerHeight }}>
        <View className="p-4">
          <Text className="text-lg font-semibold">My Program</Text>
          <Text className="mt-2 text-stone-600">Your favorited performances will show up here.</Text>
        </View>

        <View className="p-4">
          <Text className="text-lg font-semibold">FAQ</Text>
          {FAQ.map((item) => (
            <View key={item.question} className="mt-3">
              <Text className="font-medium">{item.question}</Text>
              <Text className="mt-1 text-stone-600">{item.answer}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
