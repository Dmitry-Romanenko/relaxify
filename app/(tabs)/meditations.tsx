import Card from '@/components/Card';
import ListHeader from '@/components/ListHeader';
import Tags from '@/components/Tags';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  meditationsState,
  selectMeditationsByTag,
  selectMeditationsTags,
} from '@/state/meditations';
import { useEffect, useState } from 'react';
import ApiService from '@/services/ApiService';
import { IMeditation } from '@/types/meditation';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';

export default function Meditations() {
  const [meditations, setMeditations] = useRecoilState(meditationsState);
  const [tag, setTag] = useState<'all' | string>('all');
  const meditationsByTag = useRecoilValue(selectMeditationsByTag(tag));
  const meditationsTags = useRecoilValue(selectMeditationsTags);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const renderItems = tag === 'all' ? meditations : meditationsByTag;

  const getMeditations = async () => {
    try {
      setLoading(true);
      setError(false);
      const meditationsData = await ApiService.fetchAllData<IMeditation[]>({
        endpoint: 'meditations',
      });
      setMeditations(meditationsData.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeditations();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMsg retryFun={getMeditations} />;

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full w-full bg-bg-primary px-6 py-5">
        <ListHeader title="Meditation Programms" isLeft={true} />
        <View className="mb-7">
          <Tags tagsList={meditationsTags} onPress={(tag) => setTag(tag)} activeTag={tag} />
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
                <Card card={item} icon="leaf" iconColor="#388E3C" />
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
