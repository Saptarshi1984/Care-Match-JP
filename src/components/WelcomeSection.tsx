"use client";

import React from "react";
import { Prose } from "@/components/ui/prose";
import { useTranslations } from "next-intl";

const WelcomeSection = () => {
  const t = useTranslations("Hero.welcomeText");
  const points = t.raw("points");
  const safePoints = Array.isArray(points) ? points : [];

  return (
    <section>
      <Prose w="full" maxW="full" size={'lg'}>
        <h1 className="text-center">{t("heading")}</h1>
        <ul>
          {safePoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </Prose>
    </section>
  );
};

export default WelcomeSection;
