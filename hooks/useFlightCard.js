import { useState, useCallback } from "react";

export function useFlightCard() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("flight-info");
  const [bookState, setBookState] = useState("idle"); // idle | loading | booked

  const toggleExpanded = useCallback(() => {
    setExpanded((e) => !e);
  }, []);

  const handleBook = useCallback(async () => {
    if (bookState !== "idle") return;
    setBookState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setBookState("booked");
  }, [bookState]);

  return {
    expanded,
    activeTab,
    setActiveTab,
    bookState,
    toggleExpanded,
    handleBook,
  };
}
