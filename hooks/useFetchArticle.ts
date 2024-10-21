import ApiService from '@/services/ApiService';
import { IArticle } from '@/types/article';
import { useEffect, useState } from 'react';

export const useFetchArticle = (slug: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [article, setArticle] = useState<IArticle | null>(null);
  const getArticleBySlug = async () => {
    try {
      setLoading(true);
      setError(false);
      const articleData = await ApiService.fetchItemBySlug<IArticle>({
        endpoint: 'articles',
        slug: slug,
      });

      setArticle(articleData.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticleBySlug();
  }, []);

  return {
    loading,
    error,
    article,
    getArticleBySlug,
  };
};
