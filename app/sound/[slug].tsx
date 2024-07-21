import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export default function Sound() {
  const { slug } = useLocalSearchParams();

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          // @ts-ignore
          sound.unloadAsync(); // Выгрузить звук, если компонент размонтирован
        }
      : undefined;
  }, [sound]);

  const loadAndPlaySound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/forest.mp3'), {
      shouldPlay: true,
    });
    // @ts-ignore
    setSound(sound);
    sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
  };

  const updatePlaybackStatus = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    } else {
      if (status.error) {
        console.log(`Ошибка воспроизведения: ${status.error}`);
      }
    }
  };

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        // @ts-ignore
        await sound.pauseAsync();
      } else {
        // @ts-ignore
        await sound.playAsync();
      }
    } else {
      await loadAndPlaySound();
    }
  };

  const formatTime = (millis: any) => {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="h-full w-full"
        source={{
          uri: 'https://images.unsplash.com/photo-1546609970-c10babead09a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
      >
        <View className="relative h-full w-full bg-[#0000007f]">
          <View className="ml-5 mt-4">
            <FontAwesome name="close" size={25} color={'#e0e0e0'} />
          </View>
          <View className="mt-24 flex w-full items-center justify-center">
            <View className="flex flex-col items-center justify-center gap-y-5 px-3">
              <TouchableOpacity
                onPress={playPauseSound}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-[#cdcbcba2]"
              >
                <FontAwesome name="play" size={50} className="h-4 w-4" color={'#ffff'} />
              </TouchableOpacity>

              <Text>Длительность: {duration ? formatTime(duration) : 'Загрузка...'}</Text>
              <Text>Проиграно: {position ? formatTime(position) : '0:00'}</Text>
              <Text className="font-mbold text-3xl text-tx-primary">{slug}</Text>
              <Text className="w-60 text-center font-mregular text-base text-tx-primary">
                Immerse Yourself in Tranquil Ocean Sounds
              </Text>
              <Text className="text-center font-mregular text-xs leading-5 text-tx-primary">
                Let the soothing sound of calm ocean waves wash over you, transporting you to a
                serene beach setting. Perfect for relaxation, meditation, or falling asleep, this
                track captures the gentle ebb and flow of the ocean, helping to ease stress and
                create a peaceful ambiance. Whether you’re looking to unwind after a long day or
                enhance your mindfulness practice, the rhythmic sound of waves provides a natural,
                calming backdrop to help you find your inner calm.
              </Text>
              <View className="flex flex-row items-center rounded-2xl bg-[#6a6868] px-2 py-1">
                <FontAwesome name="clock-o" size={12} color="#ffff" />
                <Text className="ml-1 text-xs text-white">20 min.</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
