"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Portal,
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Text,
  Textarea,
  createListCollection,
  useToast,
} from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";

import GiverProfileForm, {
  GiverProfileData,
} from "@/components/signup/GiverProfileForm";
import SeekerProfileForm, {
  SeekerProfileData,
} from "@/components/signup/SeekerProfileForm";

type Role = "seeker" | "giver";
type RoleSelectValue = Role | "both";

type BaseProfile = {
  name: string;
  phone: string;
  email: string;
};

type Consent = {
  key: string;
  granted_at: string;
};

type SignupFormState = {
  _id?: string;
  line_user_id: string;
  roles: Role[];
  locale: string;
  base_profile: BaseProfile;
  seeker_profile: SeekerProfileData;
  giver_profile: GiverProfileData;
  consents: Consent[];
};

const createInitialState = (locale: string): SignupFormState => ({
  line_user_id: "",
  roles: [],
  locale,
  base_profile: {
    name: "",
    phone: "",
    email: "",
  },
  seeker_profile: {
    address_text: "",
    geo: { type: "Point", coordinates: [0, 0] },
    needs_categories: [],
    emergency_contacts: [],
  },
  giver_profile: {
    service_radius_km: 3,
    skills: [],
    availability: [],
    intro: "",
    is_vetted_helper: false,
  },
  consents: [],
});

const roleDescriptions: Record<Role, string> = {
  seeker: "I or my family member needs support",
  giver: "I want to volunteer / offer help",
};

export default function SignUpPage() {
  const nextLocale = useLocale();
  const params = useParams<{ locale: string }>();
  const [form, setForm] = useState<SignupFormState>(() =>
    createInitialState(nextLocale),
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeRoleTab, setActiveRoleTab] = useState<Role | undefined>(
    undefined,
  );
  const [selectedRoleOption, setSelectedRoleOption] = useState<
    RoleSelectValue | undefined
  >(undefined);
  const toast = useToast();

  const pageBg = useColorModeValue("#F7F3EF", "#050E12");
  const cardBg = useColorModeValue("#ffffff", "#0f1a1f");
  const muted = useColorModeValue("gray.600", "gray.300");
  const consentPreviewBg = useColorModeValue("gray.50", "gray.900");

  const roleSelectCollection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "Care seeker", value: "seeker" },
          { label: "Care giver", value: "giver" },
          { label: "Both roles (seeker + giver)", value: "both" },
        ],
      }),
    [],
  );

  useEffect(() => {
    setForm((prev) => ({ ...prev, locale: nextLocale }));
  }, [nextLocale]);

  useEffect(() => {
    setActiveRoleTab((current) => {
      if (form.roles.length === 0) {
        return undefined;
      }
      if (current && form.roles.includes(current)) {
        return current;
      }
      return form.roles[0];
    });
  }, [form.roles]);

  useEffect(() => {
    setSelectedRoleOption((prev) => {
      const computed: RoleSelectValue | undefined =
        form.roles.length === 2
          ? "both"
          : form.roles.length === 1
            ? form.roles[0]
            : undefined;
      if (prev === computed) {
        return prev;
      }
      return computed;
    });
  }, [form.roles]);

  const handleRoleSelect = (nextValue: string[] | string) => {
    const selection = Array.isArray(nextValue)
      ? (nextValue[0] as RoleSelectValue | undefined)
      : (nextValue as RoleSelectValue | undefined);
    setSelectedRoleOption(selection);

    setForm((prev) => {
      if (!selection) {
        return { ...prev, roles: [] };
      }
      if (selection === "both") {
        return { ...prev, roles: ["seeker", "giver"] };
      }
      return { ...prev, roles: [selection] };
    });
  };

  const updateBaseProfile = (field: keyof BaseProfile, value: string) => {
    setForm((prev) => ({
      ...prev,
      base_profile: { ...prev.base_profile, [field]: value },
    }));
  };

  const updateSeekerProfile = (next: SeekerProfileData) => {
    setForm((prev) => ({ ...prev, seeker_profile: next }));
  };

  const updateGiverProfile = (next: GiverProfileData) => {
    setForm((prev) => ({ ...prev, giver_profile: next }));
  };

  const selectedRoleLabels = useMemo(
    () =>
      form.roles.map((role) => {
        const label =
          role === "seeker" ? "Care seeker" : "Care giver";
        return label;
      }),
    [form.roles],
  );

  const activeTabIndex =
    activeRoleTab && form.roles.length > 0
      ? Math.max(0, form.roles.indexOf(activeRoleTab))
      : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.roles.length === 0) {
      toast({
        title: "Select a role",
        description: "Choose seeker, giver, or both before continuing.",
        status: "warning",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Accept the terms",
        description: "Please grant consent so we can process your signup.",
        status: "warning",
      });
      return;
    }

    setSubmitting(true);
    const payload: SignupFormState = {
      ...form,
      locale: params.locale ?? nextLocale,
      consents: [
        {
          key: "terms",
          granted_at: new Date().toISOString(),
        },
      ],
    };

    console.info("Sign-up payload", payload);

    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Signup data prepared",
        description: "Check console output for the JSON payload.",
        status: "success",
      });
    }, 600);
  };

  return (
    <Flex
      as="main"
      minH="100vh"
      bg={pageBg}
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 8 }}
      justify="center"
    >
      <Card.Root
        as="form"
        onSubmit={handleSubmit}
        w="full"
        maxW="960px"
        bg={cardBg}
        borderRadius="2xl"
        shadow="2xl"
        px={{ base: 4, md: 10 }}
        py={{ base: 6, md: 10 }}
      >
        <CardHeader pb={6}>
          <Stack gap={2} textAlign={{ base: "left", md: "center" }}>
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>
              Create your CareMatch profile
            </Heading>
            <Text color={muted}>
              Choose the role that fits you and fill its tailored questions.
            </Text>
          </Stack>
        </CardHeader>

        <CardBody>
          <Stack gap={8}>
            <Stack gap={4}>
              <Heading fontSize="lg">Account basics</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>LINE user ID</FormLabel>
                  <Input
                    placeholder="Uxxxxxxxx"
                    value={form.line_user_id}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        line_user_id: event.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Locale</FormLabel>
                  <Input value={form.locale} isReadOnly />
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    placeholder="田中 太郎"
                    value={form.base_profile.name}
                    onChange={(event) =>
                      updateBaseProfile("name", event.target.value)
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    placeholder="+81..."
                    value={form.base_profile.phone}
                    onChange={(event) =>
                      updateBaseProfile("phone", event.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email (optional)</FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.base_profile.email}
                    onChange={(event) =>
                      updateBaseProfile("email", event.target.value)
                    }
                  />
                </FormControl>
              </SimpleGrid>
            </Stack>

            <Divider />

            <Stack gap={3}>
              <Heading fontSize="lg">Roles</Heading>
              <Select.Root
                collection={roleSelectCollection}
                value={selectedRoleOption ? [selectedRoleOption] : []}
                onValueChange={(details) => handleRoleSelect(details.value)}
              >
                <Select.HiddenSelect />
                <Select.Label color="orange.500" fontWeight="600">
                  Select your role
                </Select.Label>
                <Select.Control>
                  <Select.Trigger
                    borderColor="#E2DDD7"
                    bg={useColorModeValue("#faf6f0", "#111b21")}
                    color={useColorModeValue("#1f1d1a", "#f7f4ef")}
                    _hover={{ borderColor: "#B7342C" }}
                  >
                    <Select.ValueText placeholder="Choose care role" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content
                      bg={useColorModeValue("#ffffff", "#0f1a1f")}
                      color={useColorModeValue("#1f1d1a", "#f5f5f5")}
                    >
                      {roleSelectCollection.items.map((option) => (
                        <Select.Item item={option} key={option.value}>
                          <Stack spacing={0}>
                            <Text fontWeight="600">{option.label}</Text>
                            {option.value !== "both" && (
                              <Text fontSize="xs" color={muted}>
                                {roleDescriptions[option.value as Role]}
                              </Text>
                            )}
                          </Stack>
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Flex gap={2} wrap="wrap">
                {selectedRoleLabels.map((label) => (
                  <Tag key={label} colorPalette="orange">
                    <TagLabel>{label}</TagLabel>
                  </Tag>
                ))}
              </Flex>
            </Stack>

            {form.roles.length === 0 ? (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                Select at least one role above to access the detailed form.
              </Alert>
            ) : (
              <Tabs
                index={activeTabIndex}
                onChange={(nextIndex) =>
                  setActiveRoleTab(form.roles[nextIndex] ?? form.roles[0])
                }
                variant="soft-rounded"
                colorPalette="orange"
              >
                <TabList gap={2} flexWrap="wrap">
                  {form.roles.map((role) => (
                    <Tab key={role}>
                      {role === "seeker" ? "Care seeker" : "Care giver"}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels mt={4}>
                  {form.roles.map((role) => (
                    <TabPanel key={role} px={0}>
                      {role === "seeker" ? (
                        <Box>
                          <Heading fontSize="lg" mb={4}>
                            Care seeker details
                          </Heading>
                          <SeekerProfileForm
                            value={form.seeker_profile}
                            onChange={updateSeekerProfile}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <Heading fontSize="lg" mb={4}>
                            Care giver details
                          </Heading>
                          <GiverProfileForm
                            value={form.giver_profile}
                            onChange={updateGiverProfile}
                          />
                        </Box>
                      )}
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            )}

            <Stack gap={3}>
              <Heading fontSize="lg">Consents</Heading>
              <Checkbox
                isChecked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
              >
                I agree to the CareMatch Terms of Service and Privacy Policy.
              </Checkbox>
              <Textarea
                value={JSON.stringify(
                  termsAccepted
                    ? [
                        {
                          key: "terms",
                          granted_at: new Date().toISOString(),
                        },
                      ]
                    : [],
                  null,
                  2,
                )}
                isReadOnly
                fontSize="xs"
                minH="80px"
                bg={consentPreviewBg}
              />
            </Stack>

            <Divider />

            <Button
              type="submit"
              colorPalette="orange"
              size="lg"
              alignSelf="flex-end"
              isLoading={submitting}
            >
              Submit registration
            </Button>
          </Stack>
        </CardBody>
      </Card.Root>
    </Flex>
  );
}
