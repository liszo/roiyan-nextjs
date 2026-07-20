import en from '@/messages/en.json';
import fa from '@/messages/fa.json';

type Messages = typeof en;

const messages: Record<string, Messages> = {
  en,
  fa,
};

export function getMessages(locale: string = 'en'): Messages {
  return messages[locale] || messages.en;
}

export function t(locale: string, path: string, defaultValue?: string): string {
  const keys = path.split('.');
  let value: any = getMessages(locale);

  for (const key of keys) {
    value = value?.[key];
  }

  return typeof value === 'string' ? value : defaultValue || path;
}
