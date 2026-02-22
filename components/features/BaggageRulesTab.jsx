"use client";

import { Luggage } from "lucide-react";

export function BaggageRulesTab({ flight }) {
  const r = flight.baggageRules;
  if (!r) return <p className="text-xs py-2">Baggage details not available.</p>;

  return (
    <div className="text-sm space-y-4">
      <div className="flex gap-3 items-start">
        <Luggage size={16} className="text- mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold text-gray-800">Carry-on Bag</div>
          <div className="text-gray-600">{r.carryOn ?? "Not included"}</div>
        </div>
      </div>
      <div className="flex gap-3 items-start">
        <Luggage
          size={16}
          className={`${r.checked ? "text-brand-purple" : "text-gray-300"} mt-0.5 shrink-0`}
        />
        <div>
          <div className="font-semibold text-gray-800">Checked Bag</div>
          <div className="text-gray-600">{r.checked ?? "Not included"}</div>
        </div>
      </div>
      {r.additionalInfo && (
        <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-3">
          {r.additionalInfo}
        </p>
      )}
    </div>
  );
}
