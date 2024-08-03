import { TAppData } from './shared';

export interface IMeditation {
  id: string;
  title: string;
  slug: string;
  tag: string;
  imgUrl: string;
  label: 'meditation';
  duration: number;
  description: string;
  soundUrl: string;
}

export function isMeditation(data: TAppData): data is IMeditation {
  return (data as IMeditation).soundUrl !== undefined;
}
