"use client";

import { FlightSegmentRow } from "./FlightSegmentRow";
import { LayoverBar } from "./LayoverBar";

export function FlightInfoTab({ flight }) {
  const { segments = [], layovers = [] } = flight;

  if (segments.length === 0) {
    return <p className="text-sm text-gray-500 py-2">No segment data available.</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-light flex items-center justify-center text-brand-purple font-bold text-xs select-none">
            {flight.airlineInitial}
          </div>
          <span className="font-semibold text-sm text-gray-800">{flight.airline}</span>
        </div>
        <span className="text-xs text-gray-500 font-medium">
          {flight.departure.city} → {flight.arrival.city}
        </span>
      </div>

      {/* Segments interleaved with layovers */}
      {segments.map((seg, i) => (
        <div key={i}>
          <FlightSegmentRow segment={seg} />
          {layovers[i] && <LayoverBar layover={layovers[i]} />}
        </div>
      ))}
    </div>
  );
}
