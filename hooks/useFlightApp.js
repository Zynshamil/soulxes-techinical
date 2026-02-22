import { useState } from "react";

const DEFAULT_FILTERS = {
  stops: [],
  airlines: [],
  baggage: [],
  departureMax: 1440,
  arrivalMax: 1440,
};

const FLIGHTS_PER_PAGE = 4;

export function useFlightApp(flights) {
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

  let filteredFlights = [...flights];

  if (searchParams.from.trim()) {
    const q = searchParams.from.toLowerCase();
    filteredFlights = filteredFlights.filter(
      (f) =>
        f.departure.city.toLowerCase().includes(q) ||
        f.departure.code.toLowerCase().includes(q) ||
        f.departure.airport.toLowerCase().includes(q)
    );
  }

  if (searchParams.to.trim()) {
    const q = searchParams.to.toLowerCase();
    filteredFlights = filteredFlights.filter(
      (f) =>
        f.arrival.city.toLowerCase().includes(q) ||
        f.arrival.code.toLowerCase().includes(q) ||
        f.arrival.airport.toLowerCase().includes(q)
    );
  }

  if (activeFilters.stops.length > 0) {
    filteredFlights = filteredFlights.filter((f) =>
      activeFilters.stops.some((s) => {
        if (s === "nonstop") return f.stops === 0;
        if (s === "1-stop") return f.stops === 1;
        if (s === "2plus-stops") return f.stops >= 2;
        return false;
      })
    );
  }

  if (activeFilters.airlines.length > 0) {
    filteredFlights = filteredFlights.filter((f) =>
      activeFilters.airlines.includes(f.airlineId)
    );
  }

  if (activeFilters.baggage.length > 0) {
    filteredFlights = filteredFlights.filter((f) =>
      activeFilters.baggage.every((b) => f.baggageIncluded.includes(b))
    );
  }

  if (activeFilters.departureMax < 1440) {
    filteredFlights = filteredFlights.filter(
      (f) => f.departureMinutes <= activeFilters.departureMax
    );
  }

  if (searchParams.flightClass) {
    const classMap = {
      economy: "Economy",
      "premium-economy": "Premium Economy",
      business: "Business",
      first: "First Class",
    };
    const target = classMap[searchParams.flightClass];
    if (target) {
      filteredFlights = filteredFlights.filter((f) => f.class === target);
    }
  }

  if (searchParams.tripType === "one-way") {
    filteredFlights = filteredFlights.filter((f) => f.stops === 0);
  } else if (searchParams.tripType === "multi-city") {
    filteredFlights = filteredFlights.filter((f) => f.stops >= 1);
  }

  if (searchParams.tripCategory && searchParams.tripCategory !== "all") {
    filteredFlights = filteredFlights.filter((f) => {
      const isDomestic = f.departure.country === f.arrival.country;
      return searchParams.tripCategory === "domestic"
        ? isDomestic
        : !isDomestic;
    });
  }

  const sortedFlights = [...filteredFlights];
  if (sortBy === "fastest") {
    sortedFlights.sort((a, b) => a.durationMinutes - b.durationMinutes);
  } else if (sortBy === "cheapest") {
    sortedFlights.sort((a, b) => a.price - b.price);
  } else {
    sortedFlights.sort((a, b) => b.recommendedScore - a.recommendedScore);
  }

  const sortSummaries =
    filteredFlights.length === 0
      ? {}
      : {
          recommended: (() => {
            const f = [...filteredFlights].sort(
              (a, b) => b.recommendedScore - a.recommendedScore
            )[0];
            return `$${f.price.toLocaleString()} · ${f.duration}`;
          })(),
          fastest: (() => {
            const f = [...filteredFlights].sort(
              (a, b) => a.durationMinutes - b.durationMinutes
            )[0];
            return `$${f.price.toLocaleString()} · ${f.duration}`;
          })(),
          cheapest: (() => {
            const f = [...filteredFlights].sort((a, b) => a.price - b.price)[0];
            return `$${f.price.toLocaleString()} · ${f.duration}`;
          })(),
        };

  const displayedFlights = sortedFlights.slice(0, visibleCount);
  const hasMore = sortedFlights.length > visibleCount;

  function handleSearch() {
    setVisibleCount(FLIGHTS_PER_PAGE);
  }

  function handleApplyFilters(filters) {
    setActiveFilters(filters);
    setVisibleCount(FLIGHTS_PER_PAGE);
  }

  function handleResetFilters() {
    setActiveFilters(DEFAULT_FILTERS);
    setVisibleCount(FLIGHTS_PER_PAGE);
  }

  function handleSortChange(sort) {
    setSortBy(sort);
    setVisibleCount(FLIGHTS_PER_PAGE);
  }

  function handleLoadMore() {
    setVisibleCount((v) => v + FLIGHTS_PER_PAGE);
  }

  return {
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
  };
}
