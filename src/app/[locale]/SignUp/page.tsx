'use client'
import { useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Select,
  createListCollection,
  Portal,
} from "@chakra-ui/react";
import FormSelector from "@/components/signup/FormSelector";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useTranslations } from "next-intl";

const ROLE_ITEMS = [
  { labelKey: "seekerLabel", value: "care-seeker" },
  { labelKey: "giverLabel", value: "care-giver" },
] as const;

export default function SignUpPage() {
  const pageBg = useColorModeValue("#F7F3EF", "#050E12");
  const cardBg = useColorModeValue("#ffffff", "#0f1a1f");
  const muted = useColorModeValue("gray.600", "gray.300");
  const t = useTranslations("SignUp.formSelector");
  const roles = useMemo(
    () =>
      createListCollection({
        items: ROLE_ITEMS.map((role) => ({
          value: role.value,
          label: t(role.labelKey),
        })),
      }),
    [t]
  );

  return (
    <Flex
      minH="100vh"
      bg={pageBg}
      px={{ base: 4, md: 6 }}
      py={{ base: 16, md: 24 }}
      justify={'center'}      
    >
      <Flex
        w="full"
        flexDirection={'column'}
        maxW="960px"
        bg={cardBg}
        borderRadius="2xl"
        shadow="2xl"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 10 }}
      >
        <Box pb={4}>
          <Stack gap={2} textAlign="center">
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              Create your profile
            </Heading>
            <Text color={muted} fontSize="md">
              Let us know how you would like to participate in CareMatch Japan.
            </Text>
          </Stack>
        </Box>
        <Box pb={8} display="flex" justifyContent="center">
          <Select.Root collection={roles} size="sm" width="320px">
            <Select.HiddenSelect />
            <Select.Label>{t("selectLabel")}</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={t("selectPlaceholder")} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {roles.items.map((role) => (
                    <Select.Item item={role} key={role.value}>
                      {role.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Box>
        <Box>
          <Stack gap={10}>            
            <Text fontSize="sm" color={muted} textAlign="center">
              We keep your information private and only share it with verified
              members for matching purposes.
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
