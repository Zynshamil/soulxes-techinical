"use client";

import { Select } from "@/components/ui/Select";

export function TripTypeRow({ config, params, onChange }) {
  const handleField = (field) => (e) => {
    const value = e.target.value;
    onChange((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "tripType" && value !== "round-trip") {
        next.returnDate = "";
      }
      return next;
    });
  };

  return (
    <div className="flex flex-wrap gap-2 font-secondary">
      <div className="w-40">
        <Select
          value={params.tripType}
          onChange={handleField("tripType")}
          options={config?.tripTypes}
          placeholder="Select Flight"
        />
      </div>
      <div className="w-44">
        <Select
          value={params.flightClass}
          onChange={handleField("flightClass")}
          options={config?.classes}
          placeholder="Select Class"
        />
      </div>
      <div className="w-40">
        <Select
          value={params.tripCategory}
          onChange={handleField("tripCategory")}
          options={config?.tripCategories}
        />
      </div>
    </div>
  );
}
