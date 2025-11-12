"use client";

import { ChangeEvent } from "react";

export type GiverProfileData = {
  service_radius_km: number;
  skills: string[];
  availability: string[];
  intro: string;
  is_vetted_helper: boolean;
};

type Props = {
  value: GiverProfileData;
  onChange: (next: GiverProfileData) => void;
  disabled?: boolean;
};

const SKILL_OPTIONS = ["shopping", "walk", "meal_prep", "tech_help", "chat"];
const AVAILABILITY_OPTIONS = [
  "weekday_morning",
  "weekday_afternoon",
  "weekday_evening",
  "weekend_morning",
  "weekend_afternoon",
];

export default function GiverProfileForm({ value, onChange, disabled }: Props) {
  const update = (field: keyof GiverProfileData, next: unknown) => {
    onChange({ ...value, [field]: next });
  };

  const handleMultiSelect =
    (field: "skills" | "availability") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked, value: option } = event.target;
      const current = value[field];
      const nextValues = checked
        ? [...current, option]
        : current.filter((entry) => entry !== option);
      update(field, nextValues);
    };

  return (
    <section
      className="giver-form"
      aria-label="Care giver profile"
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div className="form-field">
        <label htmlFor="service-radius">Service radius (km)</label>
        <input
          id="service-radius"
          type="number"
          min={1}
          max={30}
          value={value.service_radius_km}
          onChange={(event) =>
            update("service_radius_km", Number(event.target.value))
          }
          disabled={disabled}
        />
      </div>

      <fieldset className="form-field">
        <legend>Skills you offer</legend>
        <div
          className="checkbox-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {SKILL_OPTIONS.map((option) => (
            <label key={option} className="checkbox-option">
              <input
                type="checkbox"
                value={option}
                checked={value.skills.includes(option)}
                onChange={handleMultiSelect("skills")}
                disabled={disabled}
              />
              <span>{option.replace("_", " ")}</span>
            </label>
          ))}
        </div>
        <div
          aria-live="polite"
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}
        >
          {value.skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </fieldset>

      <fieldset className="form-field">
        <legend>Availability</legend>
        <div
          className="checkbox-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {AVAILABILITY_OPTIONS.map((option) => (
            <label key={option} className="checkbox-option">
              <input
                type="checkbox"
                value={option}
                checked={value.availability.includes(option)}
                onChange={handleMultiSelect("availability")}
                disabled={disabled}
              />
              <span>{option.replace("_", " ")}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="giver-intro">Short introduction</label>
        <textarea
          id="giver-intro"
          placeholder="Happy to help neighbors nearby..."
          value={value.intro}
          onChange={(event) => update("intro", event.target.value)}
          disabled={disabled}
          rows={3}
        />
      </div>

      <label
        className="form-field"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      >
        <input
          type="checkbox"
          checked={value.is_vetted_helper}
          onChange={(event) => update("is_vetted_helper", event.target.checked)}
          disabled={disabled}
        />
        <span>I have completed CareMatch background screening</span>
      </label>
    </section>
  );
}
