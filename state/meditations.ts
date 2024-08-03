import { IMeditation } from '@/types/meditation';
import { atom, selector } from 'recoil';
import { selectorFamily } from 'recoil';

export const meditationsState = atom<IMeditation[]>({
  key: 'meditations',
  default: [],
});

export const selectMeditationsTags = selector({
  key: 'selectMeditationsTags',
  get: ({ get }) => {
    const meditations = get(meditationsState);
    return [...new Set(meditations.map((meditation) => meditation.tag))];
  },
});

export const selectMeditationsByTag = selectorFamily({
  key: 'selectMeditationsByTag',
  get:
    (tag: string) =>
    ({ get }) => {
      const meditations = get(meditationsState);
      return meditations.filter((meditation) => meditation.tag === tag);
    },
});
