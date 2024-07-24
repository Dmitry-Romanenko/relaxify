import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListHeader from '@/components/ListHeader';
import Card from '@/components/Card';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { useFetchHomeData } from '@/hooks/useFetchHomeData';

export default function Home() {
  const { articles, error, loading, meditations, sounds, getMainPageInfo } = useFetchHomeData();

  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getMainPageInfo} />;

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full w-full bg-bg-primary px-3 py-5">
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={meditations.slice(0, 4)}
          renderItem={({ item }) => (
            <View className="mb-4 h-52 w-full overflow-hidden rounded-3xl">
              <Card
                card={item}
                icon="leaf"
                iconColor="#388E3C"
                onPress={() => router.push(`sound/${item.slug}`)}
              />
            </View>
          )}
          ListHeaderComponent={
            <View>
              <ListHeader
                onPress={() => router.push(`sounds`)}
                title="Calming Sounds"
                subtitle="Explore our collection of nature sounds and ambient music for deep relaxation."
              />

              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={sounds.slice(0, 4)}
                horizontal
                renderItem={({ item }) => (
                  <View className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl">
                    <Card
                      card={item}
                      icon="play"
                      iconColor="#0D47A1"
                      onPress={() => router.push(`sound/${item.slug}`)}
                    />
                  </View>
                )}
              />
              <ListHeader
                onPress={() => router.push(`meditations`)}
                title="Find Your Zen"
                subtitle="Explore meditative practices that help you achieve balance and clarity."
              />
            </View>
          }
          ListFooterComponent={
            <View>
              <ListHeader
                onPress={() => router.push(`articles`)}
                title="Read Our Meditation Guides"
                subtitle="Gain knowledge from expert articles on effective meditation practices."
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={articles.slice(0, 4)}
                horizontal
                renderItem={({ item }) => (
                  <View className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl">
                    <Card
                      card={item}
                      icon="info"
                      iconColor="#AFB42B"
                      onPress={() => router.push(`article/${item.slug}`)}
                    />
                  </View>
                )}
              />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
