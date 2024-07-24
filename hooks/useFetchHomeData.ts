import ApiService from '@/services/ApiService';
import { IArticle } from '@/types/article';
import { IMeditation } from '@/types/meditation';
import { ISound } from '@/types/sound';
import { useEffect, useState } from 'react';

export const useFetchHomeData = () => {
  const [meditations, setMeditations] = useState<IMeditation[]>([]);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [sounds, setSounds] = useState<ISound[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMainPageInfo = async () => {
    try {
      setLoading(true);
      setError(false);
      const [meditationsData, articlesData, soundsData] = await Promise.all([
        ApiService.fetchAllData<IMeditation[]>({ endpoint: 'meditations', limit: 4 }),
        ApiService.fetchAllData<IArticle[]>({ endpoint: 'articles', limit: 4 }),
        ApiService.fetchAllData<ISound[]>({ endpoint: 'sounds', limit: 4 }),
      ]);
      setMeditations(meditationsData.data);
      setArticles(articlesData.data);
      setSounds(soundsData.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMainPageInfo();
  }, []);

  return {
    meditations,
    articles,
    sounds,
    loading,
    error,
    getMainPageInfo,
  };
};
