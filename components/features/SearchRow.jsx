"use client";

import { Calendar, User, Search, ArrowRightLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Plane from "@/public/icons/flight-1.png";
import Plane2 from "@/public/icons/flight-2.svg";

const MIN_TRAVELERS = 1;
const MAX_TRAVELERS = 9;

export function SearchRow({ params, onChange, onSearch }) {
  const [travelerOpen, setTravelerOpen] = useState(false);
  const [travelerError, setTravelerError] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const travelerRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (travelerRef.current && !travelerRef.current.contains(e.target)) {
        setTravelerOpen(false);
        setTravelerError("");
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setDateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = () => {
    onChange((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const handleField = (field) => (e) => {
    onChange((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleTravelers = (delta) => {
    const next = (params.travelers ?? 1) + delta;
    if (next < MIN_TRAVELERS) {
      setTravelerError(`Minimum ${MIN_TRAVELERS} traveller required.`);
      return;
    }
    if (next > MAX_TRAVELERS) {
      setTravelerError(`Maximum ${MAX_TRAVELERS} travellers allowed.`);
      return;
    }
    setTravelerError("");
    onChange((prev) => ({ ...prev, travelers: next }));
  };

  return (
    <div
      className="flex gap-4"
    >
      <div className="flex gap-1">
        <Input
          placeholder="From"
          icon={Plane}
          value={params.from}
          onChange={handleField("from")}
          className="w-[190px]!"
        />
        <Button
          variant="ghost"
          size="sm"
          className="h-10 px-2 bg-[#F2EAFF] shrink-0"
          onClick={handleSwap}
          type="button"
          title="Swap origin and destination"
        >
          <ArrowRightLeft size={16} className="text-primary" />
        </Button>
        <Input
          placeholder="To"
          icon={Plane2}
          value={params.to}
          onChange={handleField("to")}
          className="w-[190px]!"
        />
      </div>

      {/* Date range */}
      <div className="relative shrink-0" ref={dateRef}>
        <button
          type="button"
          onClick={() => setDateOpen((o) => !o)}
          className={`flex items-center gap-2 h-10 rounded-md border bg-white px-3 text-sm min-w-[220px] w-full transition-colors ${
            dateOpen ? "border-primary ring-1 ring-primary" : "border-[#A1B0CC]"
          }`}
        >
          <Calendar size={16} className="text-gray-400 shrink-0" />
          <span className="text-gray-400 whitespace-nowrap">
            {params.departDate
              ? params.tripType === "round-trip" && params.returnDate
                ? `${params.departDate} → ${params.returnDate}`
                : params.departDate
              : "Departing - Returning"}
          </span>
        </button>

        {dateOpen && (
          <div className="absolute top-12 left-0 z-50 bg-white border border-[#A1B0CC] rounded-md shadow-lg p-4 min-w-[260px]">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Departing
                </label>
                <input
                  type="date"
                  value={params.departDate}
                  onChange={handleField("departDate")}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full h-9 rounded-md border border-[#A1B0CC] px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              {params.tripType === "round-trip" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Returning
                  </label>
                  <input
                    type="date"
                    value={params.returnDate}
                    onChange={handleField("returnDate")}
                    min={
                      params.departDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    className="w-full h-9 rounded-md border border-[#A1B0CC] px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  {params.returnDate &&
                    params.departDate &&
                    params.returnDate < params.departDate && (
                      <p className="mt-1 text-xs text-red-500">
                        Return date must be after departure.
                      </p>
                    )}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setDateOpen(false)}
              className="mt-4 w-full text-xs font-medium text-white bg-primary hover:bg-primary/80 rounded-md py-1.5 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Travellers */}
      <div className="relative shrink-0" ref={travelerRef}>
        <button
          type="button"
          onClick={() => {
            setTravelerOpen((o) => !o);
            setTravelerError("");
          }}
          className={`flex items-center gap-2 h-10 rounded-md border bg-white px-3 text-sm min-w-[140px] w-full transition-colors ${
            travelerOpen
              ? "border-primary ring-1 ring-primary"
              : "border-[#A1B0CC]"
          }`}
        >
          <User size={16} className="text-gray-400 shrink-0" />
          <span className="text-gray-400 whitespace-nowrap">
            {params.travelers ?? 1} Traveller
            {(params.travelers ?? 1) !== 1 ? "s" : ""}
          </span>
        </button>

        {travelerOpen && (
          <div className="absolute top-12 left-0 z-50 bg-white border border-[#A1B0CC] rounded-md shadow-lg p-4 min-w-[200px]">
            <p className="text-xs font-semibold text-gray-600 mb-3">
              Number of Travellers
            </p>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleTravelers(-1)}
                disabled={(params.travelers ?? 1) <= MIN_TRAVELERS}
                className="w-8 h-8 rounded-full border border-[#A1B0CC] flex items-center justify-center text-lg font-bold text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center text-base font-semibold text-gray-800 select-none">
                {params.travelers ?? 1}
              </span>
              <button
                type="button"
                onClick={() => handleTravelers(1)}
                disabled={(params.travelers ?? 1) >= MAX_TRAVELERS}
                className="w-8 h-8 rounded-full border border-[#A1B0CC] flex items-center justify-center text-lg font-bold text-gray-600 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                +
              </button>
            </div>
            {travelerError && (
              <p className="mt-2 text-xs text-red-500">{travelerError}</p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              Min {MIN_TRAVELERS} · Max {MAX_TRAVELERS}
            </p>
            <button
              type="button"
              onClick={() => {
                setTravelerOpen(false);
                setTravelerError("");
              }}
              className="mt-3 w-full text-xs font-medium text-white bg-primary hover:bg-primary/80 rounded-md py-1.5 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>

      <Button
        className="w-full min-width-[113px] lg:w-auto text-center shrink-0"
        onClick={onSearch}
      >
        <Search size={16} className="mr-2" /> <p className="text-[16px] font-semibold">Search</p>
      </Button>
    </div>
  );
}
