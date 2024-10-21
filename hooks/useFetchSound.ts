import ApiService from '@/services/ApiService';
import { TEnpoints } from '@/types/api';
import { IMeditation } from '@/types/meditation';
import { ISound } from '@/types/sound';
import { useEffect, useState } from 'react';

export const useFetchSound = (slug: string, endpoint: TEnpoints) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [audio, setAudio] = useState<IMeditation | ISound | null>(null);

  const getAudioBySlug = async () => {
    try {
      setLoading(true);
      setError(false);
      const audioData = await ApiService.fetchItemBySlug<IMeditation | ISound>({
        endpoint,
        slug: slug,
      });
      setAudio(audioData.data);
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
    audio,
    getAudioBySlug,
  };
};
