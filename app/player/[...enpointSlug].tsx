import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import Slider from '@react-native-community/slider';
import { usePlayer } from '@/hooks/usePlayer';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { useFetchSound } from '@/hooks/useFetchSound';
import { TEnpoints } from '@/types/api';

export default function Player() {
  const { enpointSlug } = useLocalSearchParams<{ enpointSlug: string[] }>();
  const [enpoint, slug] = enpointSlug!;
  const { audio, error, loading, getAudioBySlug } = useFetchSound(
    slug as string,
    enpoint as TEnpoints
  );
  const {
    duration,
    formatTime,
    handleSliderValueChange,
    playPauseSound,
    position,
    soundError,
    isPlaying,
    isEnded,
  } = usePlayer(audio?.sound.url!);
  useEffect(() => {
    if (isEnded) {
      router.navigate(`sound/${slug}`);
    }
  }, [isEnded]);

  if (loading) return <Loading />;
  if ((error || audio === null || soundError) && !loading)
    return <ErrorMsg retryFun={getAudioBySlug} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        style={styles.imageBackground}
        source={{
          uri: audio?.img.url,
        }}
      >
        <View style={styles.container}>
          <View style={styles.closeButton}>
            <TouchableWithoutFeedback onPress={() => router.back()}>
              <FontAwesome name="close" size={25} color={'#e0e0e0'} />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{audio?.title}</Text>
          </View>

          <View style={styles.playButtonContainer}>
            <View style={styles.innerPlayButtonContainer}>
              <TouchableOpacity onPress={playPauseSound} style={styles.playButton}>
                <FontAwesome name={isPlaying ? 'play' : 'pause'} size={40} color={'#ffff'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onValueChange={handleSliderValueChange}
              minimumTrackTintColor="#3b5998"
              maximumTrackTintColor="#e0e0e0"
              thumbTintColor="white"
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(duration - position)}</Text>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#0000007f',
    paddingVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  titleContainer: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  playButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerPlayButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
  playButton: {
    height: 96,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#cdcbcba2',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  slider: {
    width: '100%',
  },
  timeContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  timeText: {
    fontSize: 12,
    color: '#e0e0e0',
  },
});
