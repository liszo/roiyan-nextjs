'use client';

import { useEffect, createContext, useContext, useState } from 'react';
import { rtlLocales } from '@/i18n';

type Locale = 'en' | 'fa';

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}>({
  locale: 'en',
  setLocale: () => {},
  isRTL: false,
});

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
};

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem('locale') as Locale) || 'fa';
    setLocaleState(stored);
    setMounted(true);

    // Update HTML element attributes
    const htmlElement = document.documentElement;
    htmlElement.lang = stored;
    htmlElement.dir = rtlLocales.includes(stored) ? 'rtl' : 'ltr';
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);

    // Update HTML element attributes
    const htmlElement = document.documentElement;
    htmlElement.lang = newLocale;
    htmlElement.dir = rtlLocales.includes(newLocale) ? 'rtl' : 'ltr';

    // Reload to reflect locale changes across all components
    window.location.reload();
  };

  const isRTL = rtlLocales.includes(locale);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
}
