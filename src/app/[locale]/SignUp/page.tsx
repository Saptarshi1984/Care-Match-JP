'use client'
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import FormSelector from "@/components/signup/FormSelector";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function SignUpPage() {
  const pageBg = useColorModeValue("#F7F3EF", "#050E12");
  const cardBg = useColorModeValue("#ffffff", "#0f1a1f");
  const muted = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      minH="100vh"
      bg={pageBg}
      align="flex-start"
      justify="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 16, md: 24 }}
    >
      <Card.Root
        w="full"
        maxW="960px"
        bg={cardBg}
        borderRadius="2xl"
        shadow="2xl"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 10 }}
      >
        <CardHeader pb={4}>
          <Stack gap={2} textAlign="center">
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              Create your profile
            </Heading>
            <Text color={muted} fontSize="md">
              Let us know how you would like to participate in CareMatch Japan.
            </Text>
          </Stack>
        </CardHeader>
        <CardBody>
          <Stack gap={10}>
            <FormSelector />
            <Text fontSize="sm" color={muted} textAlign="center">
              We keep your information private and only share it with verified
              members for matching purposes.
            </Text>
          </Stack>
        </CardBody>
      </Card.Root>
    </Flex>
  );
}
