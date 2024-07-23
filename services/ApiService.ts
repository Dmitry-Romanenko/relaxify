import { IArticle } from '@/types/article';
import { IMeditation } from '@/types/meditation';
import { ISound } from '@/types/sound';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://192.168.178.90:5000';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: any;
}

type TFetchData = IMeditation | ISound | IArticle;
type TFetchAllData = IMeditation[] | ISound[] | IArticle[];

interface IFetchAll {
  endpoint: 'meditations' | 'articles' | 'sounds';
  limit?: number;
}

interface IFetchBySlug {
  endpoint: 'meditations' | 'articles' | 'sounds';
  slug: string;
}

class ApiService {
  async fetchAllData<T extends TFetchAllData>({
    endpoint,
    limit,
  }: IFetchAll): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `/${endpoint}${limit ? `?_limit=${limit}` : ''}`
      );
      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async fetchItemBySlug<T extends TFetchData>({
    endpoint,
    slug,
  }: IFetchBySlug): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await axiosInstance.get(`/${endpoint}?slug=${slug}`);
      return {
        data: response.data[0],
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError): void {
    console.error('API call error:', error.message);
  }
}

export default new ApiService();
