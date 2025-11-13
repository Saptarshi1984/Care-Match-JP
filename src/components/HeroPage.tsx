"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Portal,
  Select,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useColorModeValue } from "./ui/color-mode";
import WelcomeSection from "./WelcomeSection";

const heroImageSrc = "/assets/heroimage.png";

const HeroPage = () => {
  const t = useTranslations("Hero");
  const pageBg = useColorModeValue("#F2E8E1", "#101c22");
  const pageText = useColorModeValue("#2D2A26", "#F4F4F2");
  const [disabled, setDisabled] = useState(false);
  const [role, setRole] = useState<string | undefined>(undefined);
  const r = useRouter();


  function handleClick() {
    setDisabled(true);
    r.replace("./SignIn");
    setDisabled(false);
  }

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={pageBg}
      color={pageText}
      fontFamily="'Noto Sans JP', 'Public Sans', sans-serif"
    >
      <Box
        as="main"
        flex="1"
        display="flex"
        justifyContent="center"
        py={{ base: 16, md: 20 }}
      >
        <Container
          maxW="7xl"
          px={{ base: 4, md: 6 }}
          display={"flex"}
          flexDirection={"column"}
          gap={8}
        >
          <Box
            position="relative"
            w="full"
            minH={{ base: "600px", md: "700px" }}
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={heroImageSrc}
              alt={t("imageAlt")}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                filter: "blur(4px)",
                transform: "scale(1.06)",
              }}
            />
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-b, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7))"
            />
            <Stack
              position="relative"
              zIndex={1}
              gap={24}
              align="center"
              justify={"center"}
              textAlign="center"
              h={800}
              px={{ base: 4, md: 8 }}
              mt={10}
              mb={0}
            >
              <Stack gap={4}>
                <Heading
                  as="h1"
                  fontSize={{ base: "2.5rem", md: "3.5rem", lg: "4rem" }}
                  fontWeight="800"
                  color={useColorModeValue("pink", "pink")}
                  letterSpacing="wide"
                  lineHeight="1.2"
                >
                  {t("heroTitle")}
                </Heading>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="500"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  {t("heroSubtitle")}
                </Text>
              </Stack>
              <Stack
                gap={4}
                direction="column"
                w="full"
                minH={200}
                maxW="md"
                align="center"
                justify="center"
              >             

                  <Button                    
                    variant={"solid"}
                    color="white"
                    px={8}
                    py={4}
                    colorPalette={"orange"}
                    fontSize="md"
                    fontWeight="bold"
                    borderRadius="lg"
                    boxShadow="lg"
                    transition="transform 0.2s ease-in-out"
                    onClick={handleClick}
                    disabled={disabled}
                  >
                    {t("ctaJoin")}
                  </Button>
                
              </Stack>
            </Stack>
          </Box>
          <WelcomeSection />
        </Container>
      </Box>
    </Flex>
  );
};

export default HeroPage;
