"use client";

export function CancellationTab({ flight }) {
  const r = flight.cancellationRules;
  if (!r) return <p className="text-sm text-gray-500 py-2">Cancellation details not available.</p>;

  const colorMap = {
    "Fully Refundable":     "text-green-600",
    "Partially Refundable": "text-orange-500",
    "Non-Refundable":       "text-red-500",
  };

  return (
    <div className="text-sm space-y-3">
      <div className={`font-bold text-base ${colorMap[r.policy] ?? "text-gray-800"}`}>
        {r.policy}
      </div>
      <p className="text-gray-600 leading-relaxed">{r.details}</p>
      {r.changePolicy && (
        <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {r.changePolicy}
        </p>
      )}
    </div>
  );
}
