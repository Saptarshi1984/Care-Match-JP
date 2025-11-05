"use client";

import Image from "next/image";
import NextLink from "next/link";
import { Box, Button, Container, Flex, Heading, Icon, IconButton, type IconProps, Link, Stack, Text } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
const heroImageSrc = "/assets/heroimage.png";

const brandTitle = "地域支援";
const heroTitle =
  "高齢者の日々のニーズと緊急事態を地域住民が支援するプラットフォーム";
const heroSubtitle =
  "必要な人と、助けたい地域の人々をつなぎます。コミュニティの力で、毎日をもっと安心に。";
const postNeedLabel = "\u30CB\u30FC\u30BA\u3092\u6295\u7A3F";
const joinVolunteerLabel = "\u30DC\u30E9\u30F3\u30C6\u30A3\u30A2\u306B\u53C2\u52A0";



const navLinks = [
  { href: "#", label: "Login" },
  { href: "#", label: "About Us" },
];

const HeroPage = () => {
  const pageBg = useColorModeValue("#F5F5DC", "#101c22");
  const pageText = useColorModeValue("#333333", "#F5F5DC");
  const { toggleColorMode, colorMode } = useColorMode();
  const colorToggleLabel = useColorModeValue("Switch to dark mode", "Switch to light mode");
  const navLinkColor = useColorModeValue("#333333", "white");
  const navLinkHoverColor = useColorModeValue("#2C5282", "#87CEEB");
  const toggleHoverBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  
  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={pageBg}
      color={pageText}
      fontFamily="'Noto Sans JP', 'Public Sans', sans-serif"
    >
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
              
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="wide" color={navLinkColor}>
                {brandTitle}
              </Text>
            </Flex>
            <Flex align="center" gap={{ base: 2, md: 6 }}>
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
              <Flex
                gap={8}
                display={{ base: "none", md: "flex" }}
                align="center"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    as={NextLink}
                    href={link.href}
                    fontSize="sm"
                    fontWeight="medium"
                    color={navLinkColor}
                    _hover={{ color: navLinkHoverColor }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box
        as="main"
        flex="1"
        display="flex"
        
        justifyContent="center"
        py={{ base: 16, md: 20 }}
      >
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <Box
            position="relative"
            w="full"
            minH={{ base: "600px", md: "700px" }}
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={heroImageSrc}
              alt="A warm, inviting image of a multi-generational Japanese community happily interacting outdoors."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                filter: "blur(2px)",
                transform: "scale(1.06)",
              }}
            />
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-b, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7))"
            />
            <Stack position="relative" zIndex={1} gap={24} align="center" justify={'center'} textAlign="center" h={800} px={{ base: 4, md: 8 }} my={10}>
              <Stack gap={4}>
                <Heading
                  as="h1"
                  fontSize={{ base: "2.5rem", md: "3.5rem", lg: "4rem" }}
                  fontWeight="black"
                  color="pink"
                  letterSpacing="wide"
                  lineHeight="1.2"
                >
                  {heroTitle}
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="normal"
                  color={"gray.800"}
                >
                  {heroSubtitle}
                </Text>
              </Stack>
              <Stack gap={4} direction={{ base: "column", sm: "row" }} w="full" maxW="md">
                <Button
                  w={20}
                  minW={{ sm: "200px" }}
                  h="56px"
                  px={8}
                  bg="#A3B899"
                  color="white"
                  fontSize="lg"
                  fontWeight="bold"
                  borderRadius="lg"
                  boxShadow="lg"
                  transition="transform 0.2s ease-in-out"
                  _hover={{ transform: "scale(1.05)", bg: "#93a885" }}
                >
                  {postNeedLabel}
                </Button>
                <Button
                  w={20}
                  minW={{ sm: "200px" }}
                  h="56px"
                  px={8}
                  bg="#FFA07A"
                  color="white"
                  fontSize="lg"
                  fontWeight="bold"
                  borderRadius="lg"
                  boxShadow="lg"
                  transition="transform 0.2s ease-in-out"
                  _hover={{ transform: "scale(1.05)", bg: "#ef906a" }}
                >
                  {joinVolunteerLabel}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};

export default HeroPage;
