import { FlatList, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { articleCards, meditationCards, musicCards } from '@/constant/card';
import ListHeader from '@/components/ListHeader';
import Card from '@/components/Card';

export default function Home() {
  return (
    <SafeAreaView className="flex-1">
      <View className="h-full w-full bg-bg-primary px-3 py-5">
        <FlatList
          data={meditationCards}
          renderItem={({ item }) => (
            <TouchableHighlight className="mb-4 h-52 w-full overflow-hidden rounded-3xl">
              <Card card={item} icon="leaf" iconColor="#388E3C" />
            </TouchableHighlight>
          )}
          ListHeaderComponent={
            <View>
              <ListHeader
                title="Calming Sounds"
                subtitle="Explore our collection of nature sounds and ambient music for deep relaxation."
              />

              <FlatList
                data={musicCards}
                horizontal
                renderItem={({ item }) => (
                  <TouchableHighlight className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl">
                    <Card card={item} icon="play" iconColor="#0D47A1" />
                  </TouchableHighlight>
                )}
              />
              <ListHeader
                title="Find Your Zen"
                subtitle="Explore meditative practices that help you achieve balance and clarity."
              />
            </View>
          }
          ListFooterComponent={
            <View>
              <ListHeader
                title="Read Our Meditation Guides"
                subtitle="Gain knowledge from expert articles on effective meditation practices."
              />
              <FlatList
                data={articleCards}
                horizontal
                renderItem={({ item }) => (
                  <TouchableHighlight className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl">
                    <Card card={item} icon="info" iconColor="#AFB42B" />
                  </TouchableHighlight>
                )}
              />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
