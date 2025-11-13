"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Separator,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { IconType } from "react-icons";
import { FaGoogle } from "react-icons/fa";
import { SiLine } from "react-icons/si";

type OAuthProvider = "google" | "line";

const oauthProviders: Array<{
  id: OAuthProvider;
  label: string;
  accent: string;
}> = [
  {
    id: "line",
    label: "Sign in with LINE",
    accent: "#06C755",
  },
  {
    id: "google",
    label: "Sign in with Google",
    accent: "#4285F4",
  },
];

export default function SignInPage() {
  const pageBg = useColorModeValue("#F7F3EF", "#050E12");
  const cardBg = useColorModeValue("#ffffff", "#0f1a1f");
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      minH="100vh"
      bg={pageBg}
      align="center"
      justify="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 16, md: 24 }}
    >
      <Card.Root
        w="full"
        maxW="480px"
        bg={cardBg}
        borderRadius="2xl"
        shadow="2xl"
        px={{ base: 4, md: 6 }}
      >
        <CardHeader textAlign="center" pb={4}>
          <Stack gap={2}>
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>Sign in</Heading>
            <Text color={subtextColor}>Choose a sign in method</Text>
          </Stack>
        </CardHeader>
        <CardBody pt={0}>
          <Stack gap={4}>
            {oauthProviders.map((provider) => (
              <Button
                key={provider.id}
                size="lg"
                fontWeight="600"
                gap={4}
                borderRadius="md"
                bg={provider.accent}
                _hover={{ filter: "brightness(1.05)" }}
                _active={{ filter: "brightness(0.95)" }}
                color="white"
              >
                <Stack align="flex-start">                  
                  <Text>{provider.label}</Text>
                </Stack>
              </Button>
            ))}
            <Separator />
            <Text fontSize="xs" color={subtextColor} textAlign="center">
              By continuing you agree to our Terms of Service and Privacy
              Policy.
            </Text>
            <Box textAlign="center">
              <Text fontSize="sm" color={subtextColor}>
                Need an account?{" "}
                <Link
                  as={NextLink}
                  href="/SignUp"
                  color="orange.400"
                  fontWeight="600"                  
                >
                  Sign Up
                </Link>
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card.Root>
    </Flex>
  );
}
