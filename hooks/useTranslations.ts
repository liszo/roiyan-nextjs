'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getMessages } from '@/lib/translations';

export function useTranslations() {
  const { locale } = useLocale();
  const messages = getMessages(locale);

  const t = (path: string): string => {
    const keys = path.split('.');
    let value: any = messages;

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        // Fallback to English if translation not found
        const enMessages = getMessages('en');
        value = enMessages;
        for (const k of keys) {
          value = value?.[k];
        }
        return typeof value === 'string' ? value : path;
      }
    }

    return typeof value === 'string' ? value : path;
  };

  return { t, locale };
}
