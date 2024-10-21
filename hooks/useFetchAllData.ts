import ApiService from '@/services/ApiService';
import { TAppDataArr } from '@/types/shared';
import { useEffect, useState } from 'react';
import { RecoilState, RecoilValueReadOnly, useRecoilState, useRecoilValue } from 'recoil';

export const useFetchAllData = <FetchedData extends TAppDataArr>(
  endpoint: 'meditations' | 'articles' | 'music',
  state: RecoilState<FetchedData>,
  selectorByTag: (param: string) => RecoilValueReadOnly<FetchedData>,
  selectAllTags: RecoilValueReadOnly<string[]>
) => {
  const [data, setData] = useRecoilState(state);
  const [tag, setTag] = useState<'all' | string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dataByTag = useRecoilValue(selectorByTag(tag));
  const tags = useRecoilValue(selectAllTags);
  const renderItems = tag === 'all' ? data : dataByTag;

  const getAllData = async () => {
    try {
      setLoading(true);
      setError(false);
      const fetchedData = await ApiService.fetchAllData<FetchedData>({
        endpoint,
      });
      setData(fetchedData.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return {
    data,
    tag,
    setTag,
    loading,
    error,
    getAllData,
    tags,
    renderItems,
  };
};
