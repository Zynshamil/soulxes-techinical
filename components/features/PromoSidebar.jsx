"use client";

import { PromoWidgets } from "./PromoWidgets";

export function PromoSidebar({ data }) {
  return (
    <aside className="w-full lg:w-[240px] shrink-0">
      <PromoWidgets data={data} />
    </aside>
  );
}
