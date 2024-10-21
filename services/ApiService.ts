import { ApiResponse, IFetchAll, IFetchBySlug } from '@/types/api';
import { TAppData, TAppDataArr } from '@/types/shared';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getClerkInstance } from '@clerk/clerk-expo';

const getAxiosInstance = async () => {
  const Clerk = getClerkInstance();
  const token = await Clerk.session?.id;
  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

class ApiService {
  async fetchAllData<T extends TAppDataArr>({
    endpoint,
    limit,
  }: IFetchAll): Promise<ApiResponse<T>> {
    try {
      const axiosInstance = await getAxiosInstance();
      const limitQuery = limit ? `?limit=${limit}` : '';
      const response: AxiosResponse = await axiosInstance.get(`/${endpoint}${limitQuery}`);
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

  async fetchItemBySlug<T extends TAppData>({
    endpoint,
    slug,
  }: IFetchBySlug): Promise<ApiResponse<T>> {
    try {
      const axiosInstance = await getAxiosInstance();
      const response: AxiosResponse = await axiosInstance.get(`/${endpoint}/${slug}`);
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

  async fetchAffirmation(): Promise<ApiResponse<{ affirmation: string }>> {
    try {
      const response: AxiosResponse = await axios.get(`https://www.affirmations.dev`);
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

  private handleError(error: AxiosError): void {
    console.error('API call error:', error.message);
  }
}

export default new ApiService();
