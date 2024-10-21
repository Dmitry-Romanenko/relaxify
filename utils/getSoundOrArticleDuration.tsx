import { ICard } from '@/types/card';

const formatTime = (seconds: number | null) => {
  if (seconds === null) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const formatedSeconds = Math.floor(seconds % 60);
  return `${minutes}:${formatedSeconds < 10 ? '0' : ''}${formatedSeconds} min.`;
};

export const getSoundOrArticleDuration = (card: ICard) => {
  if ('sound' in card) return formatTime(card.sound.duration);
  return `${card.duration}:00 min.`;
};
