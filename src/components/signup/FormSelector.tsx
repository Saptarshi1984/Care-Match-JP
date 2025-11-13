"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  Box,
  CardHeader,
  Heading,
  Select,
  createListCollection,
  Stack,
  Text,
  Portal
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import GiverProfileForm, {
  GiverProfileData,
} from "@/components/signup/GiverProfileForm";
import SeekerProfileForm, {
  SeekerProfileData,
} from "@/components/signup/SeekerProfileForm";

type FormType = "seeker" | "giver";

const DEFAULT_SEEKER_PROFILE: SeekerProfileData = {
  address_text: "",
  geo: { type: "Point", coordinates: [0, 0] },
  needs_categories: [],
  emergency_contacts: [{ name: "", phone: "" }],
};

const DEFAULT_GIVER_PROFILE: GiverProfileData = {
  service_radius_km: 5,
  skills: [],
  availability: [],
  intro: "",
  is_vetted_helper: false,
};

const ROLE_ITEMS = [
  { labelKey: "seekerLabel", value: "care-seeker" },
  { labelKey: "giverLabel", value: "care-giver" },
] as const;

export default function FormSelector() {
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
  const [selectedForm, setSelectedForm] = useState<FormType>("seeker");
  const [seekerProfile, setSeekerProfile] = useState<SeekerProfileData>(
    DEFAULT_SEEKER_PROFILE
  );
  const [giverProfile, setGiverProfile] = useState<GiverProfileData>(
    DEFAULT_GIVER_PROFILE
  );



  const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(event.target.value as FormType);
  };

  return (
    <Stack gap={6}>
      
        <CardHeader>
          <Stack gap={1}>
            <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="wider">
              {t("stepLabel")}
            </Text>
            <Heading fontSize="xl">{t("title")}</Heading>
            
          </Stack>
        </CardHeader>
        <Box>
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
        {selectedForm === "seeker" ? (
          <SeekerProfileForm value={seekerProfile} onChange={setSeekerProfile} />
        ) : (
          <GiverProfileForm value={giverProfile} onChange={setGiverProfile} />
        )}
      </Box>
    </Stack>
  );
}
