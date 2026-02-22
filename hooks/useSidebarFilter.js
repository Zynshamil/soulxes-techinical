import { useState, useCallback } from "react";

const DEFAULT_PENDING = {
  stops: [],
  airlines: [],
  baggage: [],
  departureMin: 0,
  departureMax: 1440,
  arrivalMin: 0,
  arrivalMax: 1440,
};

export function useSidebarFilter({ onApply, onReset }) {
  const [pending, setPending] = useState({ ...DEFAULT_PENDING });

  const toggleFilter = useCallback((field, id) => {
    setPending((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((x) => x !== id)
        : [...prev[field], id],
    }));
  }, []);

  const setSlider = useCallback((field, value) => {
    setPending((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setPending({ ...DEFAULT_PENDING });
    onReset();
  }, [onReset]);

  const handleApply = useCallback(() => {
    onApply(pending);
  }, [onApply, pending]);

  const activeCount =
    pending.stops.length +
    pending.airlines.length +
    pending.baggage.length +
    (pending.departureMin > 0 || pending.departureMax < 1440 ? 1 : 0) +
    (pending.arrivalMin > 0 || pending.arrivalMax < 1440 ? 1 : 0);

  return {
    pending,
    activeCount,
    toggleFilter,
    setSlider,
    handleReset,
    handleApply,
  };
}
