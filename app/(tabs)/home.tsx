import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { musicCards } from '@/constant/card';
import ListCard from '@/components/ListCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex h-full w-full bg-bg-primary px-3 py-3">
        <View className="flex flex-col gap-3">
          <View className="flex flex-row items-center justify-between px-1">
            <View className="w-[70%]">
              <Text className="font-msemibold text-lg text-tx-primary">Sounds</Text>
              <Text className="font-mregular text-xs text-tx-secondary">
                Explore Our Sounds Library
              </Text>
            </View>
            <TouchableOpacity className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-bg-secondary">
              <FontAwesome name="chevron-right" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={musicCards}
            renderItem={({ item }) => <ListCard card={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
