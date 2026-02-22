"use client";

import { useFlightApp } from "@/hooks/useFlightApp";
import { FlightSearch } from "./FlightSearch";
import { MainContent } from "./MainContent";

export function FlightApp({ data }) {
  const {
    searchParams,
    setSearchParams,
    sortBy,
    displayedFlights,
    hasMore,
    sortSummaries,
    handleSearch,
    handleApplyFilters,
    handleResetFilters,
    handleSortChange,
    handleLoadMore,
  } = useFlightApp(data.flights);

  return (
    <>
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 pt-11 pb-7.5 w-full flex justify-center">
        <div className="w-full max-w-[1156px]">
          <FlightSearch
            config={data.search}
            params={searchParams}
            onChange={setSearchParams}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Main Content */}
      <MainContent
        filters={data.filters}
        sortOptions={data.sortOptions}
        promos={data.promos}
        sortBy={sortBy}
        sortSummaries={sortSummaries}
        displayedFlights={displayedFlights}
        hasMore={hasMore}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        onSortChange={handleSortChange}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}
