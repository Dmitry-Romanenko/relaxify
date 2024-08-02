import { ApiResponse } from '@/types/api';
import axios, { AxiosInstance, AxiosError } from 'axios';
import type { DeletedObjectResource, EmailAddressResource } from '@clerk/types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_CLERK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_CLERK_SECRET_KEY}`,
  },
});

class ClerkService {
  async verifiyUserPassword(
    userId: string,
    password: string
  ): Promise<
    ApiResponse<{
      verified: boolean;
    }>
  > {
    try {
      const response = await axiosInstance.post(`/users/${userId}/verify_password`, {
        password,
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async createUserEmail(userId: string, email: string): Promise<ApiResponse<EmailAddressResource>> {
    try {
      const response = await axiosInstance.post(`/email_addresses`, {
        user_id: userId,
        email_address: email,
        verified: true,
        primary: true,
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async deleteUserEmail(emailId: string): Promise<ApiResponse<DeletedObjectResource>> {
    try {
      const response = await axiosInstance.delete(`/email_addresses/${emailId}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError): void {
    console.error('API call error:', error.message);
  }
}

export default new ClerkService();
