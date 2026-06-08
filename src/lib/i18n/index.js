// Lightweight i18n core — locale list, detection, and resolution.
// Detection is browser-language based (Accept-Language server-side,
// navigator.language client-side); a `lang` cookie overrides it.

export const LOCALES = ['es', 'en'];
export const DEFAULT_LOCALE = 'es';

/** Pick a locale from an Accept-Language header (or navigator.language string). */
export function detectFromHeader(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const tags = acceptLanguage
    .split(',')
    .map((s) => s.trim().split(';')[0].toLowerCase());
  for (const tag of tags) {
    if (tag.startsWith('en')) return 'en';
    if (tag.startsWith('es')) return 'es';
  }
  return DEFAULT_LOCALE;
}

/** Cookie wins if valid; otherwise fall back to browser-language detection. */
export function resolveLocale(cookieValue, acceptLanguage) {
  if (cookieValue && LOCALES.includes(cookieValue)) return cookieValue;
  return detectFromHeader(acceptLanguage);
}
