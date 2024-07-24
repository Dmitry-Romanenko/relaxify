import ApiService from '@/services/ApiService';
import { ISound } from '@/types/sound';
import { IMeditation } from '@/types/meditation';
import { useEffect, useState } from 'react';

export const useGetSound = (slug: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [audio, setAudio] = useState<IMeditation | ISound | null>(null);
  const getAudioBySlug = async () => {
    try {
      setLoading(true);
      setError(false);
      const [meditationData, soundData] = await Promise.all([
        ApiService.fetchItemBySlug<IMeditation>({
          endpoint: 'meditations',
          slug: slug,
        }),
        ApiService.fetchItemBySlug<ISound>({ endpoint: 'sounds', slug: slug }),
      ]);
      if (meditationData.data) {
        setAudio(meditationData.data);
      }
      if (soundData.data) {
        setAudio(soundData.data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAudioBySlug();
  }, []);

  return {
    loading,
    error,
    getAudioBySlug,
    audio,
  };
};
