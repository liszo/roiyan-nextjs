# Farsi Translation & RTL Layout Setup

This guide explains how the internationalization (i18n) system is configured for Farsi (Persian) language support.

## Architecture Overview

### Components & Files

1. **LocaleProvider** (`components/LocaleProvider.tsx`)
   - Context provider that manages locale state
   - Handles reading/writing locale from localStorage
   - Updates HTML `dir` and `lang` attributes dynamically
   - Provides `useLocale()` hook for accessing locale

2. **LanguageSwitcher** (`components/LanguageSwitcher.tsx`)
   - UI component for switching between languages
   - Shows flags and language codes (EN/فارسی)
   - Triggers page reload on language change

3. **useTranslations Hook** (`hooks/useTranslations.ts`)
   - Custom hook for accessing translations in client components
   - Provides `t()` function for looking up translation strings
   - Falls back to English if translation not found

4. **Messages** (`messages/*.json`)
   - `en.json`: English translations (base language)
   - `fa.json`: Farsi translations (all 150+ UI strings)

5. **Locale Config** (`i18n.ts`)
   - Defines available locales: `['en', 'fa']`
   - Maps RTL locales: `['fa']`
   - Provides locale metadata

## How to Use

### In Client Components (with useTranslations hook)

```typescript
'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function MyComponent() {
  const { t, locale } = useTranslations();

  return (
    <div>
      <h1>{t('pages.solutions.title')}</h1>
      <p>{t('pages.solutions.description')}</p>
      <button>{t('nav.contact')}</button>
    </div>
  );
}
```

### In Server Components (with getMessages function)

```typescript
import { getMessages } from '@/lib/translations';

export default async function MyServerComponent({ locale = 'en' }) {
  const messages = getMessages(locale);
  
  return (
    <div>
      <h1>{messages.pages.solutions.title}</h1>
    </div>
  );
}
```

### Adding the Language Switcher

Add to your header or navigation component:

```typescript
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  return (
    <header>
      {/* ... other content ... */}
      <LanguageSwitcher />
    </header>
  );
}
```

## RTL Support

### Automatic RTL Detection

The `LocaleProvider` automatically:
- Detects RTL locales (currently: Farsi)
- Sets HTML `dir="rtl"` attribute for RTL locales
- Sets HTML `lang="fa"` for Farsi
- Updates on language switch

### Tailwind CSS for RTL

The `tailwind.config.ts` is configured with:
```typescript
important: '[dir] '
```

This allows Tailwind to respect the `dir` attribute for RTL layouts:

```html
<!-- Automatically uses RTL styles when dir="rtl" -->
<div class="ml-4">...</div>  <!-- becomes mr-4 in RTL -->
<div class="text-left">...</div>  <!-- becomes text-right in RTL -->
```

### Manual RTL Handling

For components that need custom RTL logic:

```typescript
import { useLocale } from '@/components/LocaleProvider';

export default function MyComponent() {
  const { isRTL } = useLocale();

  return (
    <div className={isRTL ? 'flex-row-reverse' : 'flex-row'}>
      {/* Content */}
    </div>
  );
}
```

## Translation String Structure

Translation strings are organized hierarchically:

```
hero.badge              → "راهکارهای دیجیتال نسل بعد"
hero.title              → "ما تجربیات دیجیتال خلاقانه می‌سازیم"
nav.services            → "خدمات"
pages.solutions.title   → "راهکارها"
cta.scheduleCall        → "برنامه‌ریزی تماس"
landing.contactForm.*   → Various contact form strings
```

## Adding New Translations

1. Add the string to `messages/en.json`
2. Add the Farsi translation to `messages/fa.json`
3. Use with dot notation: `t('path.to.string')`

Example:

```json
// messages/en.json
{
  "myNewString": "My new text"
}

// messages/fa.json
{
  "myNewString": "متن جدید من"
}

// In component
const { t } = useTranslations();
t('myNewString')  // Returns appropriate translation
```

## Locale Persistence

The current locale is stored in `localStorage['locale']`:
- Initial load: Checks localStorage, defaults to 'en'
- Language switch: Updates localStorage and reloads page
- Persists across browser sessions

## Next Steps for Full Implementation

To fully integrate translations throughout the app:

1. **Update Header.tsx**
   - Import `useTranslations()` hook
   - Replace hardcoded navigation strings with translations
   - Add `LanguageSwitcher` component
   - Example: `const { t } = useTranslations();` then `{t('nav.home')}`

2. **Update Navigation Links**
   - Services array
   - Case categories
   - Dropdown menus

3. **Update Key Pages**
   - `app/page.tsx` (home)
   - `app/solutions/page.tsx`
   - `app/tools/page.tsx`
   - `app/services/page.tsx`
   - `app/cases/page.tsx`
   - `app/contact/page.tsx`

4. **Update Components**
   - `components/Hero.tsx`
   - `components/CTA.tsx`
   - `components/Footer.tsx`
   - `components/Testimonials.tsx`
   - All landing page components

5. **Test RTL**
   - Switch to Farsi language
   - Verify HTML has `dir="rtl"` and `lang="fa"`
   - Test layouts, margins, and animations
   - Test on mobile and desktop

## Troubleshooting

### Translations Not Appearing
- Verify path is correct in `messages/fa.json`
- Check LocaleProvider is wrapping your component tree
- Ensure component is client-side (`'use client'`)

### RTL Not Applied
- Check browser DevTools: HTML element should have `dir="rtl"`
- Verify Tailwind classes use margin/padding utilities (Tailwind handles LTR↔RTL automatically)
- For custom CSS, use `[dir=rtl] .class` selectors

### Page Not Reloading on Language Switch
- Check LocaleProvider `setLocale` function includes `window.location.reload()`
- Verify localStorage is enabled in browser

## Current State

✅ **Completed:**
- i18n infrastructure setup
- LocaleProvider with RTL support
- 150+ translations in messages/fa.json
- LanguageSwitcher component
- useTranslations hook

⏳ **In Progress:**
- Updating components to use translations
- Testing RTL layouts

⏹️ **Not Started:**
- Full component migration (due to size/complexity)
