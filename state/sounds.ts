import { ISound } from '@/types/sound';
import { atom, selector, selectorFamily } from 'recoil';

export const soundsState = atom<ISound[]>({
  key: 'sounds',
  default: [],
});

export const selectSoundsTags = selector({
  key: 'selectSoundsTags',
  get: ({ get }) => {
    const sounds = get(soundsState);
    return [...new Set(sounds.map((sound) => sound.tag))];
  },
});

export const selectSoundsByTag = selectorFamily({
  key: 'selectSoundsByTag',
  get:
    (tag: string) =>
    ({ get }) => {
      const sounds = get(soundsState);
      return sounds.filter((sound) => sound.tag === tag);
    },
});
