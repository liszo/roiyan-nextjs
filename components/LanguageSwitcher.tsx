'use client';

import { useLocale } from '@/components/LocaleProvider';
import { FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { locale, setLocale, isRTL } = useLocale();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'fa' as const, name: 'فارسی', flag: '🇮🇷' }
  ];

  return (
    <div className="flex items-center gap-2">
      <FiGlobe className="w-4 h-4 text-gray-600" />
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              locale === lang.code
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={lang.name}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
