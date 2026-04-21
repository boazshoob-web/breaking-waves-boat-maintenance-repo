import { getRequestConfig } from 'next-intl/server';

export const locales = ['he', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'he';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
