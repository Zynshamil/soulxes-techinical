"use client";

import Image from "next/image";
import { FlightRouteBox } from "./FlightCard/FlightRouteBox";
import { LayoverBar } from "./LayoverBar";

const AMENITY_IMAGES = {
  entertainment: { src: "/icons/Video.svg",   alt: "In-flight entertainment" },
  wifi:          { src: "/icons/Wi-Fi.svg",   alt: "Wi-Fi available" },
  baggage:       { src: "/icons/baggage.svg", alt: "Baggage included" },
  info:          { src: "/icons/Info.svg",    alt: "More info" },
};

export function FlightInfoTab({ flight }) {
  const { segments = [], layovers = [] } = flight;

  if (segments.length === 0) {
    return <p className="text-sm text-gray-500 py-2">No segment data available.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src="/icons/plane.svg"
              alt="airline logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-sm text-gray-800">{flight.airline}</span>
        </div>
        <span className="text-xs text-gray-500 font-medium">
          {flight.departure.city} → {flight.arrival.city}
        </span>
      </div>

      {segments.map((seg, i) => (
        <div key={i} className="mb-2">
          <div className="flex items-center gap-3">
            <FlightRouteBox
              departure={{
                time:    seg.from.time,
                airport: seg.from.airport,
                country: seg.from.city,
                date:    seg.from.date,
                code:    seg.from.code,
              }}
              arrival={{
                time:    seg.to.time,
                airport: seg.to.airport,
                country: seg.to.city,
                code:    seg.to.code,
              }}
              duration={seg.duration}
            />

            {seg.amenities?.length > 0 && (
              <div className="flex  items-center gap-2 shrink-0">
                {seg.amenities.map((a) => {
                  const img = AMENITY_IMAGES[a];
                  return img ? (
                    <span key={a} title={img.alt}>
                      <Image src={img.src} alt={img.alt} width={16} height={16} />
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {layovers[i] && <LayoverBar layover={layovers[i]} />}
        </div>
      ))}
    </div>
  );
}
