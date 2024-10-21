import Card from '@/components/Card';
import ListHeader from '@/components/ListHeader';
import Tags from '@/components/Tags';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { selectSoundsByTag, selectSoundsTags, soundsState } from '@/state/sounds';
import { useFetchAllData } from '@/hooks/useFetchAllData';

export default function Sounds() {
  const { error, loading, setTag, tag, getAllData, renderItems, tags } = useFetchAllData(
    'music',
    soundsState,
    selectSoundsByTag,
    selectSoundsTags
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getAllData} />;

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full w-full bg-bg-primary px-6 py-5">
        <ListHeader onPress={() => router.push(`home`)} title="Sounds Library" isLeft={true} />
        <View className="mb-7">
          <Tags tagsList={tags} onPress={(tag) => setTag(tag)} activeTag={tag} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row flex-wrap justify-between gap-3">
            {renderItems.map((item) => (
              <View key={item.id} className={`mb-4 h-64 w-40 overflow-hidden rounded-3xl`}>
                <Card card={item} onPress={() => router.push(`sound/music/${item.slug}`)} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
