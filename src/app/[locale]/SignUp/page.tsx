'use client'
import { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Select,
  createListCollection,
  Portal,
  Separator
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useTranslations } from "next-intl";
import SeekerProfileForm from "@/components/signup/SeekerProfileForm";
import GiverProfileForm from "@/components/signup/GiverProfileForm";

const ROLE_ITEMS = [
  { labelKey: "seekerLabel", value: "care-seeker" },
  { labelKey: "giverLabel", value: "care-giver" },
] as const;

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<(typeof ROLE_ITEMS)[number]["value"] | null>(
    null
  );
  const pageBg = useColorModeValue("#F7F3EF", "#050E12");
  const cardBg = useColorModeValue("#ffffff", "#0f1a1f");
  const muted = useColorModeValue("gray.600", "gray.300");
  const roleCardBg = useColorModeValue("rgba(15,23,42,0.04)", "rgba(15,23,42,0.7)");
  const roleCardBorder = useColorModeValue("rgba(15,23,42,0.08)", "rgba(148,163,184,0.3)");
  const roleTextColor = useColorModeValue("gray.800", "gray.100");
  const selectorT = useTranslations("SignUp.formSelector");
  const pageT = useTranslations("SignUp.page");
  const roles = useMemo(
    () =>
      createListCollection({
        items: ROLE_ITEMS.map((role) => ({
          value: role.value,
          label: selectorT(role.labelKey),
        })),
      }),
    [selectorT]
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
        gap={6}
        flexDirection={'column'}
        maxW="960px"
        bg={cardBg}
        borderRadius="2xl"
        shadow="2xl"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 10 }}
      >
        <Box pb={4} display='flex' direction='column' mx={'auto'}>
          <Stack gap={4} textAlign="center">
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              {pageT("title")}
            </Heading>
            <Text color={muted} fontSize="md">
              {pageT("subtitle")}
            </Text>
          </Stack>
        </Box>
        <Box
          borderRadius="2xl"
          border="1px solid"
          borderColor={roleCardBorder}
          bg={roleCardBg}
          px={{ base: 4, md: 6 }}
          py={{ base: 6, md: 8 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          shadow="xl"
        >
          <Heading
            fontSize="lg"
            color={roleTextColor}
            textAlign="center"
          >
            {selectorT("title")}
          </Heading>
          <Text color={muted} fontSize="sm" textAlign="center">
            {selectorT("selectLabel")}
          </Text>
          <Select.Root
            collection={roles}
            size="md"
            width={{ base: "100%", sm: "320px" }}
            value={selectedRole ? [selectedRole] : []}
            onValueChange={(details) =>
              setSelectedRole(
                details.value[0]
                  ? (details.value[0] as (typeof ROLE_ITEMS)[number]["value"])
                  : null
              )
            }
          >
            <Select.HiddenSelect />
            <Select.Label srOnly>{selectorT("selectLabel")}</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText fontSize="md" color={roleTextColor} placeholder={selectorT("selectPlaceholder")} />
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
        <Separator />
        {selectedRole === null ? (
          <Box fontSize='2xl' textAlign="center" py={10} color={muted} fontWeight="600">
            Please Select Your Role
          </Box>
        ) : selectedRole === "care-giver" ? (
          <GiverProfileForm />
        ) : (
          <SeekerProfileForm />
        )}
      </Flex>
    </Flex>
  );
}
