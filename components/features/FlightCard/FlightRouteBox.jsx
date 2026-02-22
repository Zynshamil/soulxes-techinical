import Image from "next/image";

function FlightStop({ stop }) {
  return (
    <div className="text-left">
      <div className="text-2xl font-bold leading-none">{stop.time}</div>
      <div className="text-[11px] text-gray-500 mt-2 leading-tight">
        {stop.airport}
        <br />
        {stop.country}
      </div>
    </div>
  );
}

function DurationLine({ duration }) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="text-xs font-semibold text-gray-600 mb-2">{duration}</div>
      <div className="w-full relative flex items-center">
        <div className="h-px bg-gray-300 w-full" />
        <Image
          src="/icons/Plane-2.svg"
          alt="plane"
          width={16}
          height={16}
          className="absolute left-1/2 -translate-x-1/2 bg-[#FEF6EE] px-0.5"
        />
      </div>
    </div>
  );
}

export function FlightRouteBox({ departure, arrival, duration }) {
  return (
    <div className="flex-1 bg-[#FEF6EE] rounded-xl p-4">
      <div className="text-xs text-gray-500 mb-3">{departure.date}</div>
      <div className="flex items-center gap-4">
        <FlightStop stop={departure} />
        <DurationLine duration={duration} />
        <FlightStop stop={arrival} />
      </div>
    </div>
  );
}
