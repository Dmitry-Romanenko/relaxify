import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListHeader from '@/components/ListHeader';
import Card from '@/components/Card';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { useFetchHomeData } from '@/hooks/useFetchHomeData';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeCarousel from '@/components/HomeCarousel';
import { useUser } from '@clerk/clerk-expo';
import Affirmation from '@/components/Affirmation';
import ProfileButton from '@/components/ProfileButton';

export default function Home() {
  const { user } = useUser();
  const {
    articles,
    error,
    loading,
    meditations,
    sounds,
    getMainPageInfo,
    affirmation,
    newContent,
  } = useFetchHomeData();
  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getMainPageInfo} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <View className="h-full w-full bg-bg-primary">
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={meditations}
            renderItem={({ item }) => (
              <View className="px-3">
                <View className="mb-4 h-52 w-full overflow-hidden rounded-3xl">
                  <Card card={item} onPress={() => router.push(`sound/meditations/${item.slug}`)} />
                </View>
              </View>
            )}
            ListHeaderComponent={
              <View>
                <ProfileButton imageUrl={user?.imageUrl!} username={user?.username!} />
                <View>
                  <HomeCarousel data={newContent} />
                  <View className="absolute bottom-0 w-full">
                    <View className="h-6 w-full rounded-t-3xl bg-bg-primary" />
                  </View>
                </View>
                <View className="px-3">
                  <View />
                  <ListHeader
                    onPress={() => router.push(`sounds`)}
                    title="Calming Sounds"
                    subtitle="Explore our collection of nature sounds and ambient music for deep relaxation."
                  />
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={sounds}
                    horizontal
                    renderItem={({ item }) => (
                      <View className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl">
                        <Card card={item} onPress={() => router.push(`sound/music/${item.slug}`)} />
                      </View>
                    )}
                  />
                  <ListHeader
                    onPress={() => router.push(`meditations`)}
                    title="Find Your Zen"
                    subtitle="Explore meditative practices that help you achieve balance and clarity."
                  />
                </View>
              </View>
            }
            ListFooterComponent={
              <View className="px-3">
                <ListHeader
                  onPress={() => router.push(`articles`)}
                  title="Read Our Meditation Guides"
                  subtitle="Gain knowledge from expert articles on effective meditation practices."
                />
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={articles}
                  horizontal
                  renderItem={({ item }) => (
                    <View className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl">
                      <Card card={item} onPress={() => router.push(`article/${item.slug}`)} />
                    </View>
                  )}
                />
                <Affirmation text={affirmation} />
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
