import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Providers } from './providers';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const direction = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <head>
        <meta name="theme-color" content="#1e3c58" />
      </head>
      <body style={{ margin: 0 }}>
        <NextIntlClientProvider messages={messages}>
          <Providers direction={direction}>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
