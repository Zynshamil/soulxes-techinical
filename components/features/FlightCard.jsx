"use client";

import { Plane, ChevronDown, ChevronUp, AlertTriangle, ArrowLeftRight, Luggage } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FlightInfoTab } from "./FlightInfoTab";
import { FareDetailTab } from "./FareDetailTab";
import { BaggageRulesTab } from "./BaggageRulesTab";
import { CancellationTab } from "./CancellationTab";
import { useFlightCard } from "@/hooks/useFlightCard";

const TABS = [
  { id: "flight-info",  label: "Flight Information" },
  { id: "fare-detail",  label: "Fare Detail" },
  { id: "baggage",      label: "Baggage Rules" },
  { id: "cancellation", label: "Cancellation Rules" },
];

const NOTE_ICON_MAP = {
  warning:  <AlertTriangle size={13} className="text-orange-400 shrink-0" />,
  plane:    <Plane size={13} className="text-gray-400 shrink-0" />,
  transfer: <ArrowLeftRight size={13} className="text-gray-400 shrink-0" />,
  bag:      <Luggage size={13} className="text-gray-400 shrink-0" />,
};

const REFUND_VARIANT = {
  "Fully Refundable":     "success",
  "Partially Refundable": "warning",
  "Non-Refundable":       "danger",
};

export function FlightCard({ flight }) {
  const {
    expanded,
    activeTab,
    setActiveTab,
    bookState,
    toggleExpanded,
    handleBook,
  } = useFlightCard();

  const hasNotes = flight.flightNotes?.length > 0;

  return (
    <Card className="w-full border-0 shadow-none lg:border lg:shadow-sm">
      <CardContent className="p-6">

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-purple font-bold text-sm select-none">
              {flight.airlineInitial}
            </div>
            <span className="font-semibold text-gray-900">{flight.airline}</span>
          </div>
          <div className="text-sm text-gray-500">
            Travel Class:{" "}
            <span className="font-semibold text-gray-900">{flight.class}</span>
          </div>
        </div>

        {/* ── Route ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8 w-full md:w-auto">
            {/* Departure */}
            <div className="text-left w-24">
              <div className="text-xl font-bold">{flight.departure.time}</div>
              <div className="text-[11px] text-gray-500 mb-1">{flight.departure.date}</div>
              <div className="text-[11px] text-gray-500 leading-tight">
                {flight.departure.airport}
                <br />
                {flight.departure.country}
              </div>
            </div>

            {/* Duration line */}
            <div className="flex-1 flex flex-col items-center min-w-[100px] max-w-[180px]">
              <div className="text-xs font-semibold text-gray-600 mb-2">{flight.duration}</div>
              <div className="w-full relative flex items-center">
                <div className="h-px bg-gray-300 w-full" />
                <Plane
                  size={14}
                  className="absolute left-1/2 -translate-x-1/2 text-gray-400 rotate-45 bg-white px-1 w-6 h-6"
                />
              </div>
              {flight.stops === 0 ? (
                <div className="text-[10px] text-green-600 mt-1 font-medium">Nonstop</div>
              ) : (
                <div className="text-[10px] text-gray-400 mt-1">
                  {flight.stops} stop{flight.stops > 1 ? "s" : ""} · {flight.stopCity}
                </div>
              )}
            </div>

            {/* Arrival */}
            <div className="text-left w-24">
              <div className="text-xl font-bold">{flight.arrival.time}</div>
              <div className="text-[11px] text-gray-500 mb-1">{flight.arrival.date}</div>
              <div className="text-[11px] text-gray-500 leading-tight">
                {flight.arrival.airport}
                <br />
                {flight.arrival.country}
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex flex-col items-end gap-2 text-right w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6">
            <div className="text-2xl font-bold text-gray-900">
              ${flight.price.toLocaleString()}
            </div>
            {bookState === "booked" ? (
              <div className="w-full md:w-auto px-6 py-2 bg-green-100 text-green-700 font-semibold text-sm rounded-md text-center">
                ✓ Booked!
              </div>
            ) : (
              <Button
                className="w-full md:w-auto px-6"
                onClick={handleBook}
                disabled={bookState === "loading"}
              >
                {bookState === "loading" ? "Booking…" : "Book Now"}
              </Button>
            )}
          </div>
        </div>

        {/* ── Footer row ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100 gap-4">
          <div className="text-sm text-gray-500">{flight.seatsRemaining} seats remaining</div>
          <Badge variant={REFUND_VARIANT[flight.refundPolicy] ?? "default"}>
            {flight.refundPolicy}
          </Badge>
          <button
            className="text-sm text-brand-purple font-semibold hover:underline flex items-center gap-1"
            onClick={toggleExpanded}
          >
            View flight details
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* ── Expanded: tabbed detail ── */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Tab nav */}
            <div className="flex border-b border-gray-200 mb-4 overflow-x-auto scrollbar-none">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                    activeTab === tab.id
                      ? "border-brand-purple text-brand-purple"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="text-sm min-h-[80px]">
              {activeTab === "flight-info"  && <FlightInfoTab    flight={flight} />}
              {activeTab === "fare-detail"  && <FareDetailTab    flight={flight} />}
              {activeTab === "baggage"      && <BaggageRulesTab  flight={flight} />}
              {activeTab === "cancellation" && <CancellationTab  flight={flight} />}
            </div>

            {/* Flight ID */}
            <div className="text-gray-400 text-xs mt-4 pt-3 border-t border-gray-50">
              Flight {flight.id} · {flight.departure.code} → {flight.arrival.code}
            </div>
          </div>
        )}

        {/* ── Flight notes (always shown if present) ── */}
        {hasNotes && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-gray-100">
            {flight.flightNotes.map((note, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
                {NOTE_ICON_MAP[note.icon] ?? <span className="text-gray-400">•</span>}
                <span>{note.text}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
