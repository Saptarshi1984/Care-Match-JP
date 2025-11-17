
"use client";
import { FormEvent, useMemo, useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useLocale, useTranslations } from "next-intl";

export type SeekerProfileData = {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  contactNo: string;
  intro: string;
};

const SUBMIT_ENDPOINT = "/api/signup/seeker";

const DEFAULT_SEEKER: SeekerProfileData = {
  firstName: "",
  lastName: "",
  age: 0,
  address: "",
  contactNo: "",
  intro: "",
};

const createInitialFormState = (): SeekerProfileData => ({
  ...DEFAULT_SEEKER,
});

export type SeekerProfileFormProps = {
  locale?: string;
};

export default function SeekerProfileForm({ locale: localeProp }: SeekerProfileFormProps = {}) {
  const [formData, setFormData] = useState<SeekerProfileData>(() =>
    createInitialFormState()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string | null;
  }>({ type: null, text: null });
  const t = useTranslations("SeekerForm");
  const locale = localeProp ?? useLocale();

  const titleColor = useColorModeValue("#0f172a", "#f8fafc");
  const bodyTextColor = useColorModeValue("#0f172a", "#e2e8f0");
  const subtitleColor = useColorModeValue("#0f172a", "#cbd5f5");
  const cardBorderColor = useColorModeValue(
    "rgba(15,23,42,0.08)",
    "rgba(148,163,184,0.35)"
  );
  const cardBackground = useColorModeValue(
    "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(248,250,252,0.9))",
    "linear-gradient(135deg, rgba(2,6,23,0.92), rgba(15,23,42,0.92))"
  );
  const cardShadow = useColorModeValue(
    "0 20px 50px rgba(15,23,42,0.08)",
    "0 25px 60px rgba(0,0,0,0.55)"
  );
  const labelColor = useColorModeValue("#0f172a", "#e2e8f0");
  const inputBorderColor = useColorModeValue(
    "rgba(15,23,42,0.12)",
    "rgba(226,232,240,0.25)"
  );
  const inputBackground = useColorModeValue("#ffffff", "rgba(15,23,42,0.65)");
  const inputTextColor = useColorModeValue("#0f172a", "#f8fafc");
  const helperTextColor = bodyTextColor;
  const buttonGradient = useColorModeValue(
    "linear-gradient(120deg, #111827, #0f172a 60%, #334155)",
    "linear-gradient(120deg, #e2e8f0, #cbd5f5 60%, #94a3b8)"
  );
  const buttonTextColor = useColorModeValue("#ffffff", "#0f172a");
  const successColor = useColorModeValue("#027a48", "#34d399");
  const errorColor = useColorModeValue("#b42318", "#f87171");

  const cardStyles = useMemo(
    () => ({
      borderRadius: "1.25rem",
      border: `1px solid ${cardBorderColor}`,
      background: cardBackground,
      padding: "1.5rem",
      boxShadow: cardShadow,
      backdropFilter: "blur(6px)",
      width: "100%",
      color: bodyTextColor,
    }),
    [bodyTextColor, cardBackground, cardBorderColor, cardShadow]
  );

  const labelStyle = useMemo(
    () => ({ fontWeight: 600, marginBottom: "0.35rem", color: labelColor }),
    [labelColor]
  );

  const inputStyle = useMemo(
    () => ({
      width: "100%",
      borderRadius: "0.75rem",
      border: `1px solid ${inputBorderColor}`,
      padding: "0.85rem 1rem",
      fontSize: "1rem",
      backgroundColor: inputBackground,
      color: inputTextColor,
    }),
    [inputBackground, inputBorderColor, inputTextColor]
  );

  const gridStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1rem",
    }),
    []
  );

  const updateField = (
    field: keyof SeekerProfileData,
    next: SeekerProfileData[keyof SeekerProfileData]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: next }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: null, text: null });

    try {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let message = "Failed to save seeker profile.";
        try {
          const errorData = await response.json();
          if (errorData?.message) {
            message = errorData.message;
          }
        } catch {
          // Ignore JSON parsing issues and fall back to the default message.
        }
        throw new Error(message);
      }

      setFormData(createInitialFormState());
      setStatusMessage({
        type: "success",
        text: "Seeker profile uploaded successfully.",
      });
    } catch (error) {
      const text =
        error instanceof Error ? error.message : "Unexpected submission error.";
      setStatusMessage({ type: "error", text });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-label={t("ariaLabel")}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <header style={{ textAlign: "center", padding: "0 0.5rem" }}>
        <p style={{ color: titleColor, fontSize: "1.25rem", fontWeight: 700 }}>
          {t("header.title")}
        </p>
        <p
          style={{
            color: subtitleColor,
            fontSize: "0.95rem",
            marginTop: "0.25rem",
          }}
        >
          {t("header.subtitle")}
        </p>
      </header>

      <form
        className="seeker-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          width: "100%",
        }}
        lang={locale}
        onSubmit={handleSubmit}
      >
        <section style={cardStyles}>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            {t("sections.personalInfo")}
          </p>
          <div style={gridStyle}>
            <label className="form-field">
              <span style={labelStyle}>{t("fields.firstName.label")}</span>
              <input
                lang={locale}                               
                id="seeker-first-name"
                name="firstName"
                type="text"
                placeholder={t("fields.firstName.placeholder")}
                value={formData.firstName}
                onChange={(event) =>
                  updateField("firstName", event.target.value)
                }
                style={inputStyle}
                required
              />
            </label>
            <label className="form-field">
              <span style={labelStyle}>{t("fields.lastName.label")}</span>
              <input
                lang={locale}
                id="seeker-last-name"
                name="lastName"
                type="text"
                placeholder={t("fields.lastName.placeholder")}
                value={formData.lastName}
                onChange={(event) =>
                  updateField("lastName", event.target.value)
                }
                style={inputStyle}
                required
              />
            </label>
            <label className="form-field">
              <span style={labelStyle}>{t("fields.age.label")}</span>
              <input                
                id="seeker-age"
                name="age"
                type="number"
                min={60}
                max={120}
                placeholder={t("fields.age.placeholder")}
                value={formData.age === 0 ? "" : formData.age}
                onChange={(event) =>
                  updateField(
                    "age",
                    event.target.value === "" ? 0 : Number(event.target.value)
                  )
                }
                style={inputStyle}
                required
              />
            </label>
          </div>
        </section>

        <section style={cardStyles}>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            {t("sections.contactDetails")}
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <label className="form-field">
              <span style={labelStyle}>{t("fields.address.label")}</span>
              <textarea
                lang={locale}
                id="seeker-address"
                name="address"
                placeholder={t("fields.address.placeholder")}
                value={formData.address}
                onChange={(event) => updateField("address", event.target.value)}
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "120px",
                }}
                required
              />
            </label>

            <label className="form-field">
              <span style={labelStyle}>{t("fields.contactNo.label")}</span>
              <input
                id="seeker-contact"
                name="contactNo"
                type="tel"
                placeholder={t("fields.contactNo.placeholder")}
                value={formData.contactNo}
                onChange={(event) =>
                  updateField("contactNo", event.target.value)
                }
                style={inputStyle}
                required
              />
            </label>
          </div>
        </section>

        <section style={cardStyles}>          
          <div className="flex flex-col gap-4">
            <label className="form-field">
              <span style={labelStyle}>{t("fields.intro.label")}</span>
              <textarea
                id="seeker-intro"
                name="intro"
                lang={locale}
                placeholder={t("fields.intro.placeholder")}
                value={formData.intro}
                onChange={(event) => updateField("intro", event.target.value)}
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "120px",
                }}
                required
              />
            </label>
          </div>
        </section>

        <section style={cardStyles}>
          <div className="flex flex-col gap-4 items-center">
            <p className="m-0 color-[helperTextColor]">{t("helperText")}</p>
            <button
              className="w-50 m-auto p-4! font-bold! rounded-4xl"
              type="submit"
              disabled={isSubmitting}
              style={{              
                background: buttonGradient,
                color: buttonTextColor,
                border: "none",
                cursor: "pointer",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? t("cta.submitting") : t("cta.submit")}
            </button>

            {statusMessage.text && (
              <p
                role="status"
                aria-live="polite"
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  color:
                    statusMessage.type === "error" ? errorColor : successColor,
                }}
              >
                {statusMessage.text}
              </p>
            )}
          </div>
        </section>
      </form>
    </section>
  );
}
