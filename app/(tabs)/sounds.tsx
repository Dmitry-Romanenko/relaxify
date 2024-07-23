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
import { selectSoundsByTag, selectSoundsTags, soundsState } from '@/state/sounds';
import { ISound } from '@/types/sound';

export default function Sounds() {
  const [sounds, setSounds] = useRecoilState(soundsState);
  const [tag, setTag] = useState<'all' | string>('all');
  const soundsByTag = useRecoilValue(selectSoundsByTag(tag));
  const soundsTags = useRecoilValue(selectSoundsTags);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const renderItems = tag === 'all' ? sounds : soundsByTag;

  const getSounds = async () => {
    try {
      setLoading(true);
      setError(false);
      const soundsData = await ApiService.fetchAllData<ISound[]>({
        endpoint: 'sounds',
      });
      setSounds(soundsData.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSounds();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getSounds} />;

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full w-full bg-bg-primary px-6 py-5">
        <ListHeader title="Sounds Library" isLeft={true} />
        <View className="mb-7">
          <Tags tagsList={soundsTags} onPress={(tag) => setTag(tag)} activeTag={tag} />
        </View>
        <ScrollView>
          <View className="flex flex-row flex-wrap justify-between gap-3">
            {renderItems.map((item) => (
              <TouchableHighlight
                key={item.id}
                activeOpacity={0.9}
                onPress={() => router.push(`sound/${item.slug}`)}
                underlayColor="#ffff"
                className={`mb-4 h-64 w-40 overflow-hidden rounded-3xl`}
              >
                <Card card={item} icon="play" iconColor="#0D47A1" />
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
