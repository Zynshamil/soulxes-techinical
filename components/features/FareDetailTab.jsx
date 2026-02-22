"use client";

export function FareDetailTab({ flight }) {
  const f = flight.fareDetails;
  if (!f) return <p className="text-sm text-gray-500 py-2">Fare details not available.</p>;

  const rows = [
    { label: "Base Fare",       value: f.baseFare },
    { label: "Taxes",           value: f.taxes },
    ...(f.fees > 0 ? [{ label: "Fees & Charges", value: f.fees }] : []),
  ];

  return (
    <div className="text-sm space-y-1">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between py-1.5 border-b border-gray-50">
          <span className="text-gray-600">{r.label}</span>
          <span className="font-medium text-gray-800">${r.value.toLocaleString()}</span>
        </div>
      ))}
      <div className="flex justify-between py-2 font-bold text-gray-900">
        <span>Total (per person)</span>
        <span>${f.total.toLocaleString()}</span>
      </div>
    </div>
  );
}
