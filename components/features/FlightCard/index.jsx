"use client";

import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { useFlightCard } from "@/hooks/useFlightCard";
import { AirlineHeader } from "./AirlineHeader";
import { FlightRouteBox } from "./FlightRouteBox";
import { PriceBlock } from "./PriceBlock";
import { FlightFooter } from "./FlightFooter";
import { FlightDetailPanel } from "./FlightDetailPanel";
import { FlightNotes } from "./FlightNotes";

export function FlightCard({ flight }) {
  const { expanded, activeTab, setActiveTab, bookState, toggleExpanded, handleBook } = useFlightCard();

  return (
    <Card className="w-full border-0 shadow-none lg:shadow-sm">
      <CardContent className="p-4">

        <AirlineHeader airline={flight.airline} travelClass={flight.class} />

        <div className="flex items-stretch gap-4 mb-6">
          <FlightRouteBox
            departure={flight.departure}
            arrival={flight.arrival}
            duration={flight.duration}
          />
          <PriceBlock price={flight.price} bookState={bookState} onBook={handleBook} />
        </div>

        <FlightFooter
          seatsRemaining={flight.seatsRemaining}
          refundPolicy={flight.refundPolicy}
          expanded={expanded}
          onToggle={toggleExpanded}
        />

        {expanded && (
          <FlightDetailPanel
            flight={flight}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        <FlightNotes notes={flight.flightNotes} />

      </CardContent>
    </Card>
  );
}
