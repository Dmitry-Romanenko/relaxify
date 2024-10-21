import { IImage } from './image';
import { TLabel } from './label';
import { TAppData } from './shared';
import { ISoundInfo } from './soundInfo';

export interface ISound {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  tag: string;
  label: TLabel;
  description: string;
  sound: ISoundInfo;
  img: IImage;
}

export function isSound(data: TAppData): data is ISound {
  return (data as ISound).sound.duration !== undefined;
}
