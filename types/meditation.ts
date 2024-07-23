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
