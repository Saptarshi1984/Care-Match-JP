"use client";

import { HStack, Switch, Text, IconButton } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

type LanguageSwitchProps = {
  lang: "en" | "ja";
};

const LanguageSwitch = ({ lang }: LanguageSwitchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Hero");
  const [isPending, startTransition] = useTransition();

  const nextLocale = lang === "en" ? "ja" : "en";

  const languageToggle = () => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <HStack as="label" align="center">
      <IconButton onClick={languageToggle} variant="ghost" size="sm">
        {lang === "en" ? "Ja" : "En"}
      </IconButton>
    </HStack>
  );
};

export default LanguageSwitch;
