import { IImage } from './image';
import { TLabel } from './label';
import { TAppData } from './shared';

export interface IArticle {
  id: string;
  title: string;
  slug: string;
  tag: string;
  label: TLabel;
  duration: number;
  img: IImage;
  description: string;
}

export function isArticle(data: TAppData): data is IArticle {
  return (data as IArticle).description !== undefined;
}
