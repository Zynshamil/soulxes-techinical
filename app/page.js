import { FlightApp } from "@/components/features/FlightApp";
import flightsData from "@/data/flights.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6FC] pb-20">
      <FlightApp data={flightsData} />
    </main>
  );
}
