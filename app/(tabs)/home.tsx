import { FlatList, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListHeader from '@/components/ListHeader';
import Card from '@/components/Card';
import { Redirect, router } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { useFetchHomeData } from '@/hooks/useFetchHomeData';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeCarousel from '@/components/HomeCarousel';
import { useAuth, useUser } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {
  const { articles, error, loading, meditations, sounds, getMainPageInfo } = useFetchHomeData();
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={'/sign-up'} />;
  }
  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getMainPageInfo} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <View className="h-full w-full bg-bg-primary px-4 pb-5">
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={meditations.slice(0, 4)}
            renderItem={({ item }) => (
              <View className="mb-4 h-52 w-full overflow-hidden rounded-3xl">
                <Card card={item} onPress={() => router.push(`sound/${item.slug}`)} />
              </View>
            )}
            ListHeaderComponent={
              <View>
                <View className="absolute left-4 top-4 z-20">
                  <View className="flex flex-row items-center rounded-2xl bg-[#00000041] px-3 py-2">
                    <Image source={{ uri: user?.imageUrl }} className="h-8 w-8 rounded-full" />
                    <View className="ml-2">
                      <Text className="text-sm capitalize text-tx-primary">
                        Hello, {user?.username}
                      </Text>
                      <View className="mt-1 flex flex-row items-end gap-x-1">
                        <Text className="text-xs text-tx-primary">Go to profile settings</Text>
                        <FontAwesome name="chevron-right" size={13} color={'#fff'} />
                      </View>
                    </View>
                  </View>
                </View>
                <HomeCarousel data={sounds} />
                <View className="mt-4" />
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
                      <Card card={item} onPress={() => router.push(`sound/${item.slug}`)} />
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
                      <Card card={item} onPress={() => router.push(`article/${item.slug}`)} />
                    </View>
                  )}
                />
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
