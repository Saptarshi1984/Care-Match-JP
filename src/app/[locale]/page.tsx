import HeroPage from "@/components/HeroPage";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type HomePageProps = {
  params: { locale: Locale };
};

export default function HomePage({ params: { locale } }: HomePageProps) {
  setRequestLocale(locale);

  return <HeroPage />;
}
