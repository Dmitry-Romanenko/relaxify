import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { useFetchArticle } from '@/hooks/useFetchArticle';

export default function Article() {
  const { slug } = useLocalSearchParams();
  const { article, error, getArticleBySlug, loading } = useFetchArticle(slug as string);

  if (loading) return <Loading />;
  if (error || article == null) return <ErrorMsg retryFun={getArticleBySlug} />;

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView>
        <View className="h-full w-full">
          <ImageBackground
            className="h-[400px] w-full"
            source={{
              uri: article.imgUrl,
            }}
          >
            <View className="flex h-full w-full flex-col justify-between bg-[#00000048] px-5 py-4">
              <TouchableWithoutFeedback onPress={() => router.back()}>
                <FontAwesome name="close" size={25} color={'#e0e0e0'} />
              </TouchableWithoutFeedback>
              <Text className="font-mbold text-2xl text-tx-primary">{article.title}</Text>
            </View>
          </ImageBackground>

          <Text className="px-5 py-3 font-mregular text-xs leading-5 text-tx-primary">
            {article.text}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
