import { FlatList, TouchableHighlight, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListHeader from '@/components/ListHeader';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { articlesState } from '@/state/articles';
import { soundsState } from '@/state/sounds';
import { meditationsState } from '@/state/meditations';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ApiService from '@/services/ApiService';
import { IMeditation } from '@/types/meditation';
import { IArticle } from '@/types/article';
import { ISound } from '@/types/sound';
import ErrorMsg from '@/components/ErrorMsg';

export default function Home() {
  const [meditations, setMeditations] = useRecoilState(meditationsState);
  const [articles, setArticles] = useRecoilState(articlesState);
  const [sounds, setSounds] = useRecoilState(soundsState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMainPageInfo = async () => {
    console.log('here');
    try {
      setLoading(true);
      setError(false);
      //replace to popular and remove to set State/ Set state only in tabs
      const [meditationsData, articlesData, soundsData] = await Promise.all([
        ApiService.fetchAllData<IMeditation[]>({ endpoint: 'meditations' }),
        ApiService.fetchAllData<IArticle[]>({ endpoint: 'articles' }),
        ApiService.fetchAllData<ISound[]>({ endpoint: 'sounds' }),
      ]);
      setMeditations(meditationsData.data);
      setArticles(articlesData.data);
      setSounds(soundsData.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMainPageInfo();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getMainPageInfo} />;

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full w-full bg-bg-primary px-3 py-5">
        <FlatList
          data={meditations.slice(0, 4)}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => router.push(`sound/${item.slug}`)}
              className="mb-4 h-52 w-full overflow-hidden rounded-3xl"
            >
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
                data={sounds.slice(0, 4)}
                horizontal
                renderItem={({ item }) => (
                  <TouchableHighlight
                    onPress={() => router.push(`sound/${item.slug}`)}
                    className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl"
                  >
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
                data={articles.slice(0, 4)}
                horizontal
                renderItem={({ item }) => (
                  <TouchableHighlight
                    onPress={() => router.push(`article/${item.slug}`)}
                    className="mb-4 mr-2 h-52 w-52 overflow-hidden rounded-3xl"
                  >
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
