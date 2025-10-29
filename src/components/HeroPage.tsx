"use client";

import Image from "next/image";
import NextLink from "next/link";
import { Box, Button, Container, Flex, Heading, Icon, type IconProps, Link, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
const heroImageSrc = "/assets/heroimage.png";

const brandTitle = "\u5730\u57DF\u652F\u63F4";
const heroTitle =
  "\u9AD8\u9F62\u8005\u306E\u65E5\u3005\u306E\u30CB\u30FC\u30BA\u3068\u7DCA\u6025\u4E8B\u614B\u3092\u5730\u57DF\u4F4F\u6C11\u304C\u652F\u63F4\u3059\u308B\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0";
const heroSubtitle =
  "\u5FC5\u8981\u306A\u4EBA\u3068\u3001\u52A9\u3051\u305F\u3044\u5730\u57DF\u306E\u4EBA\u3005\u3092\u3064\u306A\u304E\u307E\u3059\u3002\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3\u306E\u529B\u3067\u3001\u6BCE\u65E5\u3092\u3082\u3063\u3068\u5B89\u5FC3\u306B\u3002";
const postNeedLabel = "\u30CB\u30FC\u30BA\u3092\u6295\u7A3F";
const joinVolunteerLabel = "\u30DC\u30E9\u30F3\u30C6\u30A3\u30A2\u306B\u53C2\u52A0";

const CheckIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.59L7.41 13 6 14.41l5 5 9-9L18.59 9 11 16.59z" />
  </Icon>
);

const navLinks = [
  { href: "#", label: "Login" },
  { href: "#", label: "Sign Up" },
  { href: "#", label: "About Us" },
];

const HeroPage = () => {
  const pageBg = useColorModeValue("#F5F5DC", "#101c22");
  const pageText = useColorModeValue("#333333", "#F5F5DC");

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
              <CheckIcon color="#A3B899" boxSize={8} />
              <Text fontSize="xl" fontWeight="bold" letterSpacing="wide" color="white">
                {brandTitle}
              </Text>
            </Flex>
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
                  color="white"
                  _hover={{ color: "#87CEEB" }}
                >
                  {link.label}
                </Link>
              ))}
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
                  color="white"
                  letterSpacing="wide"
                  lineHeight="1.2"
                >
                  {heroTitle}
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="normal"
                  color="white"
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
