import { zh } from './zh';
import { en } from './en';

export const locales = {
  zh,
  en
};

export type SupportedLocale = keyof typeof locales;

export { zh, en };

