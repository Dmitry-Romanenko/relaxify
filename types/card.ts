import { IArticle } from './article';
import { IMeditation } from './meditation';
import { ISound } from './sound';

export type ICard = ISound | IMeditation | IArticle;
