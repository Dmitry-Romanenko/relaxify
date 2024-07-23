import Card from '@/components/Card';
import ListHeader from '@/components/ListHeader';
import Tags from '@/components/Tags';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import ApiService from '@/services/ApiService';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { articlesState, selectArticlesByTag, selectArticlesTags } from '@/state/articles';
import { IArticle } from '@/types/article';

export default function Sounds() {
  const [articles, setArticles] = useRecoilState(articlesState);
  const [tag, setTag] = useState<'all' | string>('all');
  const articlesByTag = useRecoilValue(selectArticlesByTag(tag));
  const articlesTags = useRecoilValue(selectArticlesTags);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const renderItems = tag === 'all' ? articles : articlesByTag;

  const getArticles = async () => {
    try {
      setLoading(true);
      setError(false);
      const articlesData = await ApiService.fetchAllData<IArticle[]>({
        endpoint: 'articles',
      });
      setArticles(articlesData.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getArticles} />;

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full w-full bg-bg-primary px-6 py-5">
        <ListHeader title="Articles Library" isLeft={true} />
        <View className="mb-7">
          <Tags tagsList={articlesTags} onPress={(tag) => setTag(tag)} activeTag={tag} />
        </View>
        <ScrollView>
          <View className="flex flex-row flex-wrap justify-between gap-3">
            {renderItems.map((item) => (
              <TouchableHighlight
                key={item.id}
                activeOpacity={0.9}
                onPress={() => router.push(`article/${item.slug}`)}
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
