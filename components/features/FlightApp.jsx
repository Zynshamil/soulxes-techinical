"use client";

import { useState, useMemo, useCallback } from "react";
import { FlightSearch } from "./FlightSearch";
import { SidebarFilter } from "./SidebarFilter";
import { SortTabs, FlightCard } from "./FlightResult";
import { PromoWidgets } from "./PromoWidgets";

const DEFAULT_FILTERS = {
  stops: [],
  airlines: [],
  baggage: [],
  departureMax: 1440,
  arrivalMax: 1440,
};

const FLIGHTS_PER_PAGE = 4;

export function FlightApp({ data }) {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    travelers: 1,
    tripType: "",
    flightClass: "",
    tripCategory: "all",
  });

  const [activeFilters, setActiveFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(FLIGHTS_PER_PAGE);

  // Flights after search + sidebar filters (before sort)
  const filteredFlights = useMemo(() => {
    let flights = [...data.flights];

    if (searchParams.from.trim()) {
      const q = searchParams.from.toLowerCase();
      flights = flights.filter(
        (f) =>
          f.departure.city.toLowerCase().includes(q) ||
          f.departure.code.toLowerCase().includes(q) ||
          f.departure.airport.toLowerCase().includes(q)
      );
    }

    if (searchParams.to.trim()) {
      const q = searchParams.to.toLowerCase();
      flights = flights.filter(
        (f) =>
          f.arrival.city.toLowerCase().includes(q) ||
          f.arrival.code.toLowerCase().includes(q) ||
          f.arrival.airport.toLowerCase().includes(q)
      );
    }

    if (activeFilters.stops.length > 0) {
      flights = flights.filter((f) =>
        activeFilters.stops.some((s) => {
          if (s === "nonstop") return f.stops === 0;
          if (s === "1-stop") return f.stops === 1;
          if (s === "2plus-stops") return f.stops >= 2;
          return false;
        })
      );
    }

    if (activeFilters.airlines.length > 0) {
      flights = flights.filter((f) =>
        activeFilters.airlines.includes(f.airlineId)
      );
    }

    if (activeFilters.baggage.length > 0) {
      flights = flights.filter((f) =>
        activeFilters.baggage.every((b) => f.baggageIncluded.includes(b))
      );
    }

    if (activeFilters.departureMax < 1440) {
      flights = flights.filter(
        (f) => f.departureMinutes <= activeFilters.departureMax
      );
    }

    // Flight class filter (economy, business, first, premium-economy)
    if (searchParams.flightClass) {
      const classMap = {
        "economy": "Economy",
        "premium-economy": "Premium Economy",
        "business": "Business",
        "first": "First Class",
      };
      const target = classMap[searchParams.flightClass];
      if (target) {
        flights = flights.filter((f) => f.class === target);
      }
    }

    // Trip type filter (one-way = direct, multi-city = has stops)
    if (searchParams.tripType === "one-way") {
      flights = flights.filter((f) => f.stops === 0);
    } else if (searchParams.tripType === "multi-city") {
      flights = flights.filter((f) => f.stops >= 1);
    }

    // Trip category filter (domestic = same country, international = different)
    if (searchParams.tripCategory && searchParams.tripCategory !== "all") {
      flights = flights.filter((f) => {
        const isDomestic = f.departure.country === f.arrival.country;
        return searchParams.tripCategory === "domestic" ? isDomestic : !isDomestic;
      });
    }

    return flights;
  }, [data.flights, searchParams, activeFilters]);

  // Sorted flights
  const sortedFlights = useMemo(() => {
    const flights = [...filteredFlights];
    if (sortBy === "fastest") {
      flights.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === "cheapest") {
      flights.sort((a, b) => a.price - b.price);
    } else {
      flights.sort((a, b) => b.recommendedScore - a.recommendedScore);
    }
    return flights;
  }, [filteredFlights, sortBy]);

  // Dynamic summaries for sort tabs based on current filtered set
  const sortSummaries = useMemo(() => {
    if (filteredFlights.length === 0) return {};
    const byRec = [...filteredFlights].sort(
      (a, b) => b.recommendedScore - a.recommendedScore
    )[0];
    const byFast = [...filteredFlights].sort(
      (a, b) => a.durationMinutes - b.durationMinutes
    )[0];
    const byCheap = [...filteredFlights].sort((a, b) => a.price - b.price)[0];
    return {
      recommended: `$${byRec.price.toLocaleString()} · ${byRec.duration}`,
      fastest: `$${byFast.price.toLocaleString()} · ${byFast.duration}`,
      cheapest: `$${byCheap.price.toLocaleString()} · ${byCheap.duration}`,
    };
  }, [filteredFlights]);

  const displayedFlights = sortedFlights.slice(0, visibleCount);
  const hasMore = sortedFlights.length > visibleCount;

  const handleSearch = useCallback(() => {
    setVisibleCount(FLIGHTS_PER_PAGE);
  }, []);

  const handleApplyFilters = useCallback((filters) => {
    setActiveFilters(filters);
    setVisibleCount(FLIGHTS_PER_PAGE);
  }, []);

  const handleResetFilters = useCallback(() => {
    setActiveFilters(DEFAULT_FILTERS);
    setVisibleCount(FLIGHTS_PER_PAGE);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
    setVisibleCount(FLIGHTS_PER_PAGE);
  }, []);

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
      <div className="w-full max-w-[1289px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[300px] shrink-0">
            <SidebarFilter
              data={data.filters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Main Results */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            <SortTabs
              options={data.sortOptions}
              active={sortBy}
              summaries={sortSummaries}
              onChange={handleSortChange}
            />

            {displayedFlights.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 text-center py-16 px-4">
                <p className="text-lg font-semibold text-gray-700">
                  No flights found
                </p>
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
                  onClick={() =>
                    setVisibleCount((v) => v + FLIGHTS_PER_PAGE)
                  }
                  className="text-primary font-semibold hover:underline bg-white px-6 py-2 rounded-md shadow-sm border border-gray-100"
                >
                  Load more flights
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <PromoWidgets data={data.promos} />
          </aside>
        </div>
      </div>
    </>
  );
}
