import Image from "next/image";

function FlightStop({ stop }) {
  return (
    <div className="text-left">
      <div className="text-[18px] font-semibold leading-none">{stop.time}</div>
      <div className="text-xs mt-1">
        {stop.airport}
        <br />
        {stop.country}
      </div>
    </div>
  );
}

function DurationLine({ duration }) {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center">
      <div className="text-sm font-semibold">{duration}</div>
      <div className="w-1/2 relative flex items-center">
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
    <div className="flex-1 flex flex-col gap-2 rounded bg-[#FFF1E4] p-2">
      <div className="text-xs">{departure.date}</div>
      <div className="flex items-center gap-4">
        <FlightStop stop={departure} />
        <DurationLine duration={duration} />
        <FlightStop stop={arrival} />
      </div>
    </div>
  );
}
