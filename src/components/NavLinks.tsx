"use client";

import NextLink from "next/link";
import { Flex, Link } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { useColorModeValue } from "./ui/color-mode";

const NavLinks = () => {
  const t = useTranslations("Hero");
  const navLinkColor = useColorModeValue("#333333", "white");
  const navLinkHoverColor = useColorModeValue("#2C5282", "#87CEEB");

  const navLinks = [
    { href: "#", label: t("nav.home") },
    { href: "#", label: t("nav.about") },
    { href: "#", label: t("nav.contact") },
  ];

  return (
    <Flex gap={8} display={{ base: "none", md: "flex" }} align="center">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          as={NextLink}
          href={link.href}
          fontSize="md"
          fontWeight="medium"
          color={navLinkColor}
          _hover={{ color: navLinkHoverColor }}
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

export default NavLinks;
