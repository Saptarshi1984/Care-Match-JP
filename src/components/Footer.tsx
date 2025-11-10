"use client";

import NextLink from "next/link";
import { Box, Container, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { useColorModeValue } from "./ui/color-mode";

const Footer = () => {
  const t = useTranslations("Footer");
  const bg = useColorModeValue("#F7F2ED", "#0F1A22");
  const textColor = useColorModeValue("#2D2A26", "#F5F5F5");
  const linkHover = useColorModeValue("#B7342C", "#87CEEB");

  const footerLinks = [
    { label: t("links.home"), href: "#" },
    { label: t("links.about"), href: "#" },
    { label: t("links.contact"), href: "#" },
    { label: t("links.privacy"), href: "#" },
  ];

  return (
    <Box bg={bg} color={textColor} py={6} mt={0}>
      <Container maxW="7xl">
        <Stack
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          
        >
          <Flex gap={6} wrap="wrap">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                as={NextLink}
                href={link.href}
                _hover={{ color: linkHover }}
                fontSize="sm"
                fontWeight="medium"
              >
                {link.label}
              </Link>
            ))}
          </Flex>

          <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.400")}>
            {t("copyright")}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
