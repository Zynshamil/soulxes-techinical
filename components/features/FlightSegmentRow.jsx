"use client";

import { Plane } from "lucide-react";
import Image from "next/image";

const AMENITY_IMAGES = {
  entertainment: { src: "/icons/Video.svg",   alt: "In-flight entertainment" },
  wifi:          { src: "/icons/Wi-Fi.svg",   alt: "Wi-Fi available" },
  baggage:       { src: "/icons/baggage.svg", alt: "Baggage included" },
  info:          { src: "/icons/Info.svg",    alt: "More info" },
};

export function FlightSegmentRow({ segment }) {
  return (
    <div className="py-3">
      <div className="flex items-start gap-3">
        {/* Departure */}
        <div className="text-left w-24 shrink-0">
          <div className="text-base font-bold">{segment.from.time}</div>
          <div className="text-[11px] text-gray-500 leading-tight mt-0.5">
            {segment.from.code} · {segment.from.airport}
          </div>
          <div className="text-[11px] text-gray-400">{segment.from.date}</div>
        </div>

        {/* Duration line */}
        <div className="flex-1 flex flex-col items-center pt-1 min-w-[80px]">
          <div className="text-[11px] text-gray-500 mb-1">{segment.duration}</div>
          <div className="w-full relative flex items-center">
            <div className="h-px bg-gray-300 w-full" />
            <Plane
              size={11}
              className="absolute left-1/2 -translate-x-1/2 text-gray-400 rotate-45 bg-white w-5 h-5 px-1"
            />
          </div>
        </div>

        {/* Arrival */}
        <div className="text-left w-24 shrink-0">
          <div className="text-base font-bold">{segment.to.time}</div>
          <div className="text-[11px] text-gray-500 leading-tight mt-0.5">
            {segment.to.code} · {segment.to.airport}
          </div>
          <div className="text-[11px] text-gray-400">{segment.to.date}</div>
        </div>

        {/* Amenity icons */}
        {segment.amenities?.length > 0 && (
          <div className="flex items-center gap-2 ml-auto pt-0.5">
            {segment.amenities.map((a) => {
              const img = AMENITY_IMAGES[a];
              return img ? (
                <span key={a} title={img.alt}>
                  <Image src={img.src} alt={img.alt} width={14} height={14} />
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
