import { IArticle } from '@/types/article';
import { atom, selector, selectorFamily } from 'recoil';

export const articlesState = atom<IArticle[]>({
  key: 'articles',
  default: [],
});

export const selectArticlesTags = selector({
  key: 'selectArticlesTags',
  get: ({ get }) => {
    const articles = get(articlesState);
    return [...new Set(articles.map((article) => article.tag))];
  },
});

export const selectArticlesByTag = selectorFamily({
  key: 'selectArticlesByTag',
  get:
    (tag: string) =>
    ({ get }) => {
      const articles = get(articlesState);
      return articles.filter((article) => article.tag === tag);
    },
});
