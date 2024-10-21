import ApiService from '@/services/ApiService';
import { IArticle } from '@/types/article';
import { IMeditation } from '@/types/meditation';
import { ISound } from '@/types/sound';
import { useEffect, useState } from 'react';

export const useFetchHomeData = () => {
  const [meditations, setMeditations] = useState<IMeditation[]>([]);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [sounds, setSounds] = useState<ISound[]>([]);
  const [newContent, setNewContent] = useState<Array<ISound | IArticle | IMeditation>>([]);
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMainPageInfo = async () => {
    try {
      setLoading(true);
      setError(false);
      const meditationsData = await ApiService.fetchAllData<IMeditation[]>({
        endpoint: 'meditations',
        limit: 4,
      });
      const articlesData = await ApiService.fetchAllData<IArticle[]>({
        endpoint: 'articles',
        limit: 4,
      });
      const soundsData = await ApiService.fetchAllData<ISound[]>({ endpoint: 'music', limit: 4 });
      const affirmationData = await ApiService.fetchAffirmation();
      setMeditations(meditationsData.data);
      setSounds(soundsData.data);
      setArticles(articlesData.data);
      setNewContent([meditationsData.data[0], soundsData.data[0], articlesData.data[0]]);
      setAffirmation(affirmationData.data.affirmation);
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
    affirmation,
    newContent,
  };
};
