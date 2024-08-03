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
import { useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { usePlayer } from '@/hooks/usePlayer';
import { router } from 'expo-router';
import { useGetSound } from '@/hooks/useSound';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';

export default function Player() {
  const { slug } = useLocalSearchParams();
  const { audio, error, loading, getAudioBySlug } = useGetSound(slug as string);
  const {
    duration,
    formatTime,
    handleSliderValueChange,
    playPauseSound,
    position,
    soundError,
    isPlaying,
    isEnded,
  } = usePlayer('../../assets/sounds/forest5.mp3');

  useEffect(() => {
    if (isEnded) {
      router.navigate(`sound/${slug}`);
    }
  }, [isEnded]);

  if (loading) return <Loading />;
  if (error || audio === null || soundError) return <ErrorMsg retryFun={getAudioBySlug} />;

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="h-full w-full"
        source={{
          uri: audio.imgUrl,
        }}
      >
        <View className="relative flex h-full w-full flex-col justify-between bg-[#0000007f] py-20">
          <View className="absolute left-5 top-4">
            <TouchableWithoutFeedback onPress={() => router.back()}>
              <FontAwesome name="close" size={25} color={'#e0e0e0'} />
            </TouchableWithoutFeedback>
          </View>

          <View className="flex w-[300px] items-center justify-center self-center">
            <Text className="text-center font-mbold text-3xl text-tx-primary">{audio.title}</Text>
          </View>

          <View className="flex w-full items-center justify-center">
            <View className="flex flex-col items-center justify-center gap-y-5 px-3">
              <TouchableOpacity
                onPress={playPauseSound}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-[#cdcbcba2]"
              >
                <FontAwesome
                  name={isPlaying ? 'play' : 'pause'}
                  size={40}
                  className="h-4 w-4"
                  color={'#ffff'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-[100%] px-2">
            <Slider
              className="w-full"
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onValueChange={handleSliderValueChange}
              minimumTrackTintColor="#3b5998"
              maximumTrackTintColor="#e0e0e0"
              thumbTintColor="white"
            />
            <View className="mt-1 flex flex-row justify-between px-[14px]">
              <Text className="text-xs text-tx-silver">{formatTime(duration - position)}</Text>
              <Text className="text-xs text-tx-silver">{formatTime(position)}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
