import { IImage } from './image';
import { TLabel } from './label';
import { TAppData } from './shared';
import { ISoundInfo } from './soundInfo';

export interface IMeditation {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  tag: string;
  label: TLabel;
  description: string;
  sound: ISoundInfo;
  img: IImage;
}

export function isMeditation(data: TAppData): data is IMeditation {
  return (data as IMeditation).sound.duration !== undefined;
}
