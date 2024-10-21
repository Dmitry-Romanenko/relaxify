import { IArticle } from './article';
import { IMeditation } from './meditation';
import { ISound } from './sound';

export type TAppData = IMeditation | ISound | IArticle;
export type TAppDataArr = IMeditation[] | ISound[] | IArticle[];
