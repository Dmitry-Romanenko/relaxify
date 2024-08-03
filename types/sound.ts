import { TAppData } from './shared';

export interface ISound {
  id: string;
  title: string;
  slug: string;
  tag: string;
  imgUrl: string;
  label: 'sound';
  duration: number;
  description: string;
  soundUrl: string;
}

export function isSound(data: TAppData): data is ISound {
  return (data as ISound).soundUrl !== undefined;
}
