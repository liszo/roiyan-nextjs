export const locales = ['fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export const localeNames: Record<Locale, string> = {
  fa: 'فارسی'
};

export const rtlLocales: Locale[] = ['fa'];