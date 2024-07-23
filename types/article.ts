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
