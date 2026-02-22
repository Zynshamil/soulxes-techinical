"use client";

import { SortTabs } from "./SortTabs";
import { FlightCard } from "./FlightCard";

export function FlightResults({
  sortOptions,
  sortBy,
  sortSummaries,
  displayedFlights,
  hasMore,
  onSortChange,
  onLoadMore,
}) {
  return (
    <div className="flex-1 flex flex-col gap-4 w-full max-w-[650px]">
      <SortTabs
        options={sortOptions}
        active={sortBy}
        summaries={sortSummaries}
        onChange={onSortChange}
      />

      {displayedFlights.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 text-center py-16 px-4">
          <p className="text-lg font-semibold text-gray-700">No flights found</p>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        displayedFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      )}

      {hasMore && (
        <div className="text-center pt-2">
          <button
            onClick={onLoadMore}
            className="text-primary font-semibold hover:underline bg-white px-6 py-2 rounded-md shadow-sm border border-gray-100"
          >
            Load more flights
          </button>
        </div>
      )}
    </div>
  );
}
