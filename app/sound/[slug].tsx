import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { useFetchSound } from '@/hooks/useFetchSound';

export default function Sound() {
  const { slug } = useLocalSearchParams();
  const { audio, error, loading, getAudioBySlug } = useFetchSound(slug as string);

  if (loading) return <Loading />;
  if (error || audio === null) return <ErrorMsg retryFun={getAudioBySlug} />;

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="h-full w-full"
        source={{
          uri: audio.imgUrl,
        }}
      >
        <View className="relative h-full w-full bg-[#0000007f]">
          <View className="ml-5 mt-4">
            <TouchableWithoutFeedback onPress={() => router.back()}>
              <FontAwesome name="close" size={25} color={'#e0e0e0'} />
            </TouchableWithoutFeedback>
          </View>

          <View className="mt-24 flex w-full items-center justify-center">
            <View className="flex flex-col items-center justify-center gap-y-5 px-3">
              <TouchableOpacity
                onPress={() => router.push(`player/${slug}`)}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-[#cdcbcba2]"
              >
                <FontAwesome name="play" size={50} className="h-4 w-4" color={'#ffff'} />
              </TouchableOpacity>

              <Text className="font-mbold text-3xl text-tx-primary">{audio.title}</Text>
              <Text className="w-60 text-center font-mregular text-base text-tx-primary">
                Immerse Yourself in Tranquil Ocean Sounds
              </Text>
              <Text className="text-center font-mregular text-xs leading-5 text-tx-primary">
                {audio.description}
              </Text>
              <View className="flex flex-row items-center rounded-2xl bg-[#6a6868] px-2 py-1">
                <FontAwesome name="clock-o" size={12} color="#ffff" />
                <Text className="ml-1 text-xs text-white">{audio.duration} min.</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
