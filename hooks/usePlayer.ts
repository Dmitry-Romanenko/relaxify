import { Audio, AVPlaybackStatusError, AVPlaybackStatusSuccess } from 'expo-av';
import { useEffect, useState } from 'react';

export const usePlayer = (audioUrl: string) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [soundError, setSoundError] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  useEffect(() => {
    const initSound = async () => {
      try {
        setSoundError(false);
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          {
            shouldPlay: true,
          }
        );
        setSound(sound);
      } catch (e) {
        setSoundError(true);
      }
    };
    initSound();
  }, [audioUrl]);

  useEffect(() => {
    if (sound) {
      const updateStatus = setInterval(() => sound.setOnPlaybackStatusUpdate(updatePlaybackStatus));
      return () => {
        sound.unloadAsync();
        clearInterval(updateStatus);
      };
    }
  }, [sound]);

  useEffect(() => {
    if (sound && duration !== 0) {
      setIsEnded(duration === position);
    }
  }, [duration, position, sound]);

  const updatePlaybackStatus = (status: AVPlaybackStatusSuccess | AVPlaybackStatusError) => {
    if (status.isLoaded) {
      setSoundError(false);
      const statusSuccess = status as AVPlaybackStatusSuccess;
      setDuration(statusSuccess.durationMillis!);
      setPosition(statusSuccess.positionMillis);
      setIsPlaying(statusSuccess.isPlaying);
    }
    if ('error' in status) {
      setSoundError(true);
    }
  };

  const playPauseSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const formatTime = (millis: number | null) => {
    if (millis === null) return '0:00';
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSliderValueChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      await sound.pauseAsync();
      setPosition(value);
    }
  };

  return {
    handleSliderValueChange,
    formatTime,
    playPauseSound,
    sound,
    position,
    duration,
    soundError,
    isEnded,
    isPlaying,
  };
};
