"use client";

export function LayoverBar({ layover }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 bg-gray-50 rounded px-3 py-2 my-1 text-xs text-gray-500">
      <span className="font-semibold text-gray-700">
        {layover.duration} Layover in {layover.city}
      </span>
      {layover.notes?.map((note, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="text-gray-300">·</span>
          {note}
        </span>
      ))}
    </div>
  );
}
