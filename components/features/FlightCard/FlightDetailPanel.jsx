import { FlightInfoTab } from "../FlightInfoTab";
import { FareDetailTab } from "../FareDetailTab";
import { BaggageRulesTab } from "../BaggageRulesTab";
import { CancellationTab } from "../CancellationTab";
import { TABS } from "./constants";

export function FlightDetailPanel({ flight, activeTab, setActiveTab }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? "border-brand-purple text-brand-purple"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="text-sm min-h-[80px]">
        {activeTab === "flight-info"  && <FlightInfoTab    flight={flight} />}
        {activeTab === "fare-detail"  && <FareDetailTab    flight={flight} />}
        {activeTab === "baggage"      && <BaggageRulesTab  flight={flight} />}
        {activeTab === "cancellation" && <CancellationTab  flight={flight} />}
      </div>

      <div className="text-gray-400 text-xs mt-4 pt-3 border-t border-gray-50">
        Flight {flight.id} · {flight.departure.code} → {flight.arrival.code}
      </div>
    </div>
  );
}
