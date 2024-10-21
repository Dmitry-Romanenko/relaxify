import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import Loading from '@/components/Loading';
import ErrorMsg from '@/components/ErrorMsg';
import { useFetchSound } from '@/hooks/useFetchSound';
import { TEnpoints } from '@/types/api';
import { getSoundOrArticleDuration } from '@/utils/getSoundOrArticleDuration';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Sound() {
  const { enpointSlug } = useLocalSearchParams<{ enpointSlug: string[] }>();
  const [enpoint, slug] = enpointSlug!;
  const { audio, error, loading, getAudioBySlug } = useFetchSound(
    slug as string,
    enpoint as TEnpoints
  );

  if (loading) return <Loading />;
  if (error || audio === null) return <ErrorMsg retryFun={getAudioBySlug} />;
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        style={styles.imageBackground}
        source={{
          uri: audio.img.url,
        }}
      >
        <View style={styles.container}>
          <View style={styles.closeButton}>
            <TouchableWithoutFeedback onPress={() => router.back()}>
              <FontAwesome name="close" size={25} color={'#e0e0e0'} />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.innerContent}>
              <TouchableOpacity
                onPress={() => router.push(`player/${enpoint}/${slug}`)}
                style={styles.playButton}
              >
                <FontAwesome name="play" size={50} color={'#ffff'} />
              </TouchableOpacity>

              <Text style={styles.title}>{audio.title}</Text>
              <Text style={styles.description}>{audio.subtitle}</Text>
              <Text style={styles.subDescription}>{audio.description}</Text>
              <View style={styles.durationContainer}>
                <FontAwesome name="clock-o" size={12} color="#ffff" />
                <Text style={styles.durationText}>{getSoundOrArticleDuration(audio)}</Text>
              </View>
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
    justifyContent: 'center',
    backgroundColor: '#0000007f',
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  centerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContent: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  description: {
    width: 240,
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
  },
  subDescription: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 20,
    color: '#ffffff',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#6a6868',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  durationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#ffffff',
  },
});
