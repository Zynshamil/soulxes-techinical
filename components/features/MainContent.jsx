"use client";

import { FilterSidebar } from "./FilterSidebar";
import { FlightResults } from "./FlightResults";
import { PromoSidebar } from "./PromoSidebar";

export function MainContent({
  filters,
  sortOptions,
  promos,
  sortBy,
  sortSummaries,
  displayedFlights,
  hasMore,
  onApplyFilters,
  onResetFilters,
  onSortChange,
  onLoadMore,
}) {
  console.log('promos', promos)
  return (
    <div className="w-full max-w-[1289px] mx-auto mt-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <FilterSidebar
          data={filters}
          onApply={onApplyFilters}
          onReset={onResetFilters}
        />

        <FlightResults
          sortOptions={sortOptions}
          sortBy={sortBy}
          sortSummaries={sortSummaries}
          displayedFlights={displayedFlights}
          hasMore={hasMore}
          onSortChange={onSortChange}
          onLoadMore={onLoadMore}
        />

        <PromoSidebar data={promos} />
      </div>
    </div>
  );
}
