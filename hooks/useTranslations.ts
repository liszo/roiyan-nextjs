'use client';

import { useLocale } from '@/components/LocaleProvider';
import { getMessages } from '@/lib/translations';

function resolve(messages: any, keys: string[]): any {
  let value: any = messages;
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return undefined;
  }
  return value;
}

export function useTranslations() {
  const { locale } = useLocale();
  const messages = getMessages(locale);

  const t = (path: string): string => {
    const keys = path.split('.');
    const value = resolve(messages, keys);

    if (value === undefined) {
      const fallback = resolve(getMessages('en'), keys);
      return typeof fallback === 'string' ? fallback : path;
    }

    return typeof value === 'string' ? value : path;
  };

  // Returns raw value (array/object/string) instead of coercing to string.
  // Use for translated lists (e.g. process steps, FAQ items).
  const tRaw = <T = any>(path: string): T | undefined => {
    const keys = path.split('.');
    const value = resolve(messages, keys);
    if (value === undefined) {
      return resolve(getMessages('en'), keys);
    }
    return value;
  };

  return { t, tRaw, locale };
}
