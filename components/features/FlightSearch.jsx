"use client";

import { TripTypeRow } from "./TripTypeRow";
import { SearchRow } from "./SearchRow";

export function FlightSearch({ config, params, onChange, onSearch }) {
  return (
    <div className="w-full space-y-4">
      <TripTypeRow config={config} params={params} onChange={onChange} />
      <SearchRow params={params} onChange={onChange} onSearch={onSearch} />
    </div>
  );
}
