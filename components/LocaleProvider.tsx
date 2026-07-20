'use client';

import { createContext, useContext } from 'react';

const LocaleContext = createContext<{
  locale: 'fa';
  isRTL: true;
}>({
  locale: 'fa',
  isRTL: true,
});

export const useLocale = () => useContext(LocaleContext);

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  return (
    <LocaleContext.Provider value={{ locale: 'fa', isRTL: true }}>
      {children}
    </LocaleContext.Provider>
  );
}
