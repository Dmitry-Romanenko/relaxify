import { TAppData } from './shared';

export interface IArticle {
  id: string;
  title: string;
  slug: string;
  tag: string;
  imgUrl: string;
  label: 'article';
  duration: number;
  text: string;
}

export function isArticle(data: TAppData): data is IArticle {
  return (data as IArticle).text !== undefined;
}
