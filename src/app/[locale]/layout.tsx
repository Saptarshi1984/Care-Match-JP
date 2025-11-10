import { Box, Flex } from "@chakra-ui/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Provider } from "@/components/ui/provider";
import { routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <Provider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="max-h-screen flex flex-col">
          <Navigation />
          {children}
          <Footer />
        </div>
      </NextIntlClientProvider>
    </Provider>
  );
}
