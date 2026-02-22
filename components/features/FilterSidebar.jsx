"use client";

import { SidebarFilter } from "./SidebarFilter";

export function FilterSidebar({ data, onApply, onReset }) {
  return (
    <aside className="w-full lg:w-[235px] shrink-0">
      <SidebarFilter data={data} onApply={onApply} onReset={onReset} />
    </aside>
  );
}
