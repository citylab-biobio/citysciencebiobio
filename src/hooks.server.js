import { resolveLocale } from '$lib/i18n';
import { dict } from '$lib/i18n/dictionaries.js';

// Resolve the locale once per request (cookie override → Accept-Language),
// expose it on locals for load functions, and stamp <html lang> plus the SEO
// meta tags in the SSR output so the first paint is already in the right
// language (no flash).
export async function handle({ event, resolve }) {
  const cookieLocale = event.cookies.get('lang');
  const acceptLanguage = event.request.headers.get('accept-language');
  const locale = resolveLocale(cookieLocale, acceptLanguage);

  event.locals.locale = locale;
  const meta = dict[locale].meta;

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replace('%lang%', locale)
        .replace('%meta_description%', meta.description)
        .replace('%og_description%', meta.ogDescription)
  });
}
