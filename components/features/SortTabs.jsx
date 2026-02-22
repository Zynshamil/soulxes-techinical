"use client";

import Image from "next/image";

export function SortTabs({ options, active, summaries, onChange }) {
  return (
    <div className="flex bg-white rounded overflow-hidden pt-1 shadow-sm h-[57px]">
      {options.map((option) => {
        const isActive = active === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`flex-1 flex justify-start px-2 gap-2 text-center border-b-2 transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <Image
                src={option.icon}
                alt={option.label}
                width={16}
                height={16}
                unoptimized
              />
            </div>
            <div
              className={`flex flex-col gap-1 items-start ${
                isActive ? "text-primary" : "text-gray-500"
              }`}
            >
              <span className="text-base font-semibold">{option.label}</span>
              <span className="text-xs">{summaries?.[option.id] ?? "—"}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
