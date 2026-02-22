"use client";

import { useSidebarFilter } from "@/hooks/useSidebarFilter";
import { Checkbox } from "@/components/ui/Checkbox";
import { DualRangeSlider } from "@/components/ui/RangeSlider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { CardTitle } from "@/components/ui/CardTitle";
import { CardContent } from "@/components/ui/CardContent";

function minutesToTimeWithDay(minutes) {
  const day = minutes >= 1440 ? "Tue" : "Mon";
  const normalized = minutes % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  const ampm = h < 12 ? "AM" : "PM";
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${day} ${displayH}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function FilterSection({ children, className = "" }) {
  return (
    <div className={`px-4 pt-4 pb-4 first:pt-0 ${className}`}>{children}</div>
  );
}

export function SidebarFilter({ data, onApply, onReset }) {
  const {
    pending,
    activeCount,
    toggleFilter,
    setSlider,
    handleReset,
    handleApply,
  } = useSidebarFilter({ onApply, onReset });

  return (
    <Card className="w-full max-w-xs border-0 shadow-none lg:border border-white rounded-sm">
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-[18px] font-semibold">Filter By</CardTitle>
        {activeCount > 0 && (
          <span className="text-xs bg-brand-purple text-white rounded-full px-2 py-0.5 font-medium">
            {activeCount}
          </span>
        )}
      </CardHeader>

      <CardContent className="py-0! divide-y divide-gray-100">
        {/* Stops */}
        <FilterSection>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Stop</span>
              <span>From</span>
            </div>
            {data.stops.map((stop) => (
              <div
                key={stop.id}
                className="flex justify-between items-center text-sm py-1 px-[3px]"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={pending.stops.includes(stop.id)}
                    onChange={() => toggleFilter("stops", stop.id)}
                  />
                  <span>{stop.label}</span>
                </label>
                <span>{stop.price}</span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Airlines */}
        <FilterSection>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Airlines</span>
              <span className="text-gray-900 font-bold text-xs">From</span>
            </div>
            {data.airlines.map((airline) => (
              <div
                key={airline.id}
                className="flex justify-between items-center text-sm py-1 px-[3px]"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={pending.airlines.includes(airline.id)}
                    onChange={() => toggleFilter("airlines", airline.id)}
                  />
                  <span className="text-gray-600 truncate max-w-35">
                    {airline.label}
                  </span>
                </label>
                <span>{airline.price}</span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Travel and Baggage */}
        <FilterSection>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Travel and Baggage</span>
              <span className="text-gray-900 font-bold text-xs">From</span>
            </div>
            {data.baggage.map((bag) => (
              <div
                key={bag.id}
                className="flex justify-between items-center text-sm py-1 px-[3px]"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={pending.baggage.includes(bag.id)}
                    onChange={() => toggleFilter("baggage", bag.id)}
                  />
                  <span className="text-gray-600">{bag.label}</span>
                </label>
                <span>{bag.price}</span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Departure Time Slider */}
        <FilterSection>
          <div className="space-y-3">
            <div className="text-sm font-semibold">Departure Time</div>
            <div className="text-[11px] text-gray-500">
              {minutesToTimeWithDay(pending.departureMin)} -{" "}
              {minutesToTimeWithDay(pending.departureMax)}
            </div>
            <DualRangeSlider
              min={0}
              max={1440}
              step={30}
              minValue={pending.departureMin}
              maxValue={pending.departureMax}
              onMinChange={(val) => setSlider("departureMin", val)}
              onMaxChange={(val) => setSlider("departureMax", val)}
            />
          </div>
        </FilterSection>

        {/* Arrival Time Slider */}
        <FilterSection>
          <div className="space-y-3">
            <div className="text-sm font-semibold">Arrival Time</div>
            <div className="text-[11px] text-gray-500">
              {minutesToTimeWithDay(pending.arrivalMin)} -{" "}
              {minutesToTimeWithDay(pending.arrivalMax)}
            </div>
            <DualRangeSlider
              min={0}
              max={1440}
              step={30}
              minValue={pending.arrivalMin}
              maxValue={pending.arrivalMax}
              onMinChange={(val) => setSlider("arrivalMin", val)}
              onMaxChange={(val) => setSlider("arrivalMax", val)}
            />
          </div>
        </FilterSection>

        {/* Actions */}
        <FilterSection className="!pb-2 !px-1">
          <div className="flex w-full gap-2 font-semibold ">
            <Button
              variant="ghost"
              className="flex-1 h-[45px] w-full lg:w-[80px] text-primary hover:text-primary "
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="flex-1 h-[45px] w-full lg:w-[131px]"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </FilterSection>
      </CardContent>
    </Card>
  );
}
