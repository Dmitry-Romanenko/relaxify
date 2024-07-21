import Card from '@/components/Card';
import ListHeader from '@/components/ListHeader';
import Tags from '@/components/Tags';
import { articleCards } from '@/constant/card';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Articles() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex h-full w-full items-center justify-center bg-bg-primary px-6 py-5">
        <ListHeader title="Meditation Programms" isLeft={true} />
        <Tags />
        <ScrollView>
          <View className="flex flex-row flex-wrap justify-between">
            {articleCards.map((item) => (
              <TouchableHighlight
                key={item.id}
                activeOpacity={0.9}
                onPress={() => router.push(`/article/${item.title}`)}
                underlayColor="#ffff"
                className={`mb-4 h-64 w-40 overflow-hidden rounded-3xl`}
              >
                <Card card={item} icon="info" iconColor="#AFB42B" />
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
