import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';
import { en } from '@Localization/en';

export type Translation = {
  SETTINGS: string;
  LANGUAGE: string;
  THEME: string;
  DARK_MODE: string;
  SIGN_IN: string;
  LOG_OUT: string;
};

const translations = {
  en,
};

export default new LocalizedStrings(translations);
