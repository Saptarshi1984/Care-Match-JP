"use client";

import {
  Box,
  Container,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { LuMoon, LuSun } from "react-icons/lu";

import { useColorMode, useColorModeValue } from "./ui/color-mode";
import LanguageSwitch from "./LanguageSwitch";
import NavLinks from "./NavLinks";

const Navigation = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const navLinkColor = useColorModeValue("#2D2A26", "white");
  const navLinkHoverColor = useColorModeValue("#B7342C", "#87CEEB");
  const toggleHoverBg = useColorModeValue("rgba(0,0,0,0.06)", "whiteAlpha.200");
  const { toggleColorMode, colorMode } = useColorMode();

  const colorToggleLabel = useColorModeValue(
    t("aria.switchToDark"),
    t("aria.switchToLight"),
  );

  return (
    <Box
      as="header"
      position="absolute"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      py={4}
    >
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={4}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="wide"
              color={navLinkColor}
            >
              {t("brandTitle")}
            </Text>
          </Flex>
          <NavLinks />
          <Flex align="center" gap={{ base: 2, md: 6 }}>
            <Flex align="center" gap={3}>
              <IconButton
                aria-label={colorToggleLabel}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                color={navLinkColor}
                _hover={{ bg: toggleHoverBg, color: navLinkHoverColor }}
              >
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
              </IconButton>
            </Flex>
            <LanguageSwitch lang={locale as "en" | "ja"} />            
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navigation;
