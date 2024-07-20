import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex h-full w-full items-center justify-center bg-bg-primary px-6">
        <Text className="text-s font-mbold text-2xl uppercase text-tx-primary">Articles</Text>
      </View>
    </SafeAreaView>
  );
}
