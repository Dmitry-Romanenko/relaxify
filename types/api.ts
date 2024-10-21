export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: any;
}

export type TEnpoints = 'meditations' | 'articles' | 'music';

export interface IFetchAll {
  endpoint: TEnpoints;
  limit?: number;
}

export interface IFetchBySlug {
  endpoint: TEnpoints;
  slug: string;
}
