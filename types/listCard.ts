import { ImageSourcePropType } from 'react-native';

export interface IListCard {
  id: string;
  imgUrl: ImageSourcePropType;
  title: string;
  duration: number;
  tag: string;
}
