"use client";

import { ChangeEvent } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export type GeoPoint = { type: "Point"; coordinates: [number, number] };

export type EmergencyContact = {
  name: string;
  phone: string;
};

export type SeekerProfileData = {
  address_text: string;
  geo: GeoPoint;
  needs_categories: string[];
  emergency_contacts: EmergencyContact[];
};

type Props = {
  value: SeekerProfileData;
  onChange: (next: SeekerProfileData) => void;
  disabled?: boolean;
};

const NEED_OPTIONS = [
  "shopping",
  "clinic_escort",
  "meal_prep",
  "companionship",
  "light_cleaning",
];

export default function SeekerProfileForm({
  value,
  onChange,
  disabled,
}: Props) {
  const updateField = (field: keyof SeekerProfileData, next: unknown) => {
    onChange({ ...value, [field]: next });
  };

  const updateGeo = (index: 0 | 1, coord: number) => {
    const coordinates: [number, number] = [...value.geo.coordinates] as [
      number,
      number
    ];
    coordinates[index] = coord;
    updateField("geo", { ...value.geo, coordinates });
  };

  const handleContactChange = (
    idx: number,
    key: keyof EmergencyContact,
    val: string
  ) => {
    const updated = value.emergency_contacts.map((contact, contactIdx) =>
      contactIdx === idx ? { ...contact, [key]: val } : contact
    );
    updateField("emergency_contacts", updated);
  };

  const addContact = () => {
    updateField("emergency_contacts", [
      ...value.emergency_contacts,
      { name: "", phone: "" },
    ]);
  };

  const removeContact = (idx: number) => {
    updateField(
      "emergency_contacts",
      value.emergency_contacts.filter((_, contactIdx) => contactIdx !== idx)
    );
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value: category } = event.target;
    if (checked) {
      updateField("needs_categories", [...value.needs_categories, category]);
    } else {
      updateField(
        "needs_categories",
        value.needs_categories.filter((item) => item !== category),
      );
    }
  };

  return (
    <section
      className="seeker-form"
      aria-label="Care seeker profile"
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div className="form-field">
        <label htmlFor="seeker-address">Care address (text)</label>
        <textarea
          id="seeker-address"
          placeholder="Example: Koto-ku Monzennakacho area"
          value={value.address_text}
          onChange={(event) => updateField("address_text", event.target.value)}
          disabled={disabled}
          rows={3}
        />
      </div>

      <div
        className="grid grid-two"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <div className="form-field">
          <label htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            type="number"
            step="0.0001"
            value={value.geo.coordinates[0] ?? ""}
            onChange={(event) => updateGeo(0, Number(event.target.value))}
            disabled={disabled}
          />
        </div>
        <div className="form-field">
          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            type="number"
            step="0.0001"
            value={value.geo.coordinates[1] ?? ""}
            onChange={(event) => updateGeo(1, Number(event.target.value))}
            disabled={disabled}
          />
        </div>
      </div>

      <fieldset className="form-field">
        <legend>Support categories</legend>
        <div
          className="checkbox-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {NEED_OPTIONS.map((option) => (
            <label key={option} className="checkbox-option">
              <input
                type="checkbox"
                value={option}
                checked={value.needs_categories.includes(option)}
                onChange={handleCategoryChange}
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
          {value.needs_categories.map((category) => (
            <span key={category} className="chip">
              {category}
            </span>
          ))}
        </div>
      </fieldset>

      <section aria-label="Emergency contacts" className="form-field">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontWeight: 600, margin: 0 }}>Emergency contacts</p>
          <button
            type="button"
            onClick={addContact}
            disabled={disabled}
            className="ghost-button"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
          >
            <FiPlus aria-hidden="true" />
            Add contact
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
          {value.emergency_contacts.map((contact, idx) => (
            <div
              key={`emergency-${idx}`}
              className="contact-row"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <label className="form-field">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Contact name"
                  value={contact.name}
                  onChange={(event) =>
                    handleContactChange(idx, "name", event.target.value)
                  }
                  disabled={disabled}
                />
              </label>
              <label className="form-field">
                <span>Phone</span>
                <input
                  type="tel"
                  placeholder="+81..."
                  value={contact.phone}
                  onChange={(event) =>
                    handleContactChange(idx, "phone", event.target.value)
                  }
                  disabled={disabled}
                />
              </label>
              <button
                type="button"
                onClick={() => removeContact(idx)}
                disabled={disabled}
                className="danger-link"
                style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <FiTrash2 aria-hidden="true" />
                Remove contact
              </button>
            </div>
          ))}
          {value.emergency_contacts.length === 0 && (
            <p style={{ fontSize: "0.9rem", color: "#6b7280", margin: 0 }}>
              Add at least one backup contact in case of emergencies.
            </p>
          )}
        </div>
      </section>
    </section>
  );
}
