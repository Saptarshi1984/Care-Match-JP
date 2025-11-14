"use client";

import { useState } from "react";
import {
  Box,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import GiverProfileForm, {
  GiverProfileData,
} from "@/components/signup/GiverProfileForm";
import SeekerProfileForm, {
  SeekerProfileData,
} from "@/components/signup/SeekerProfileForm";

export type FormType = "seeker" | "giver";

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

export default function FormSelector() {
  const t = useTranslations("SignUp.formSelector");
  const [selectedForm] = useState<FormType>("seeker");
  const [seekerProfile, setSeekerProfile] = useState<SeekerProfileData>(
    DEFAULT_SEEKER_PROFILE
  );
  const [giverProfile, setGiverProfile] = useState<GiverProfileData>(
    DEFAULT_GIVER_PROFILE
  );

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
        {selectedForm === "seeker" ? (
          <SeekerProfileForm value={seekerProfile} onChange={setSeekerProfile} />
        ) : (
          <GiverProfileForm value={giverProfile} onChange={setGiverProfile} />
        )}
      </Box>
    </Stack>
  );
}
