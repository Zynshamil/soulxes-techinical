import Image from "next/image";

export function AirlineHeader({ airline, travelClass }) {
  return (
    <div className="flex justify-between items-center mb-6 text-base ">
      <div className="flex items-center gap-3 p-1">
        <div className="w-8 h-8 flex items-center justify-center overflow-hidden shrink-0">
          <Image
            src="/icons/plane.svg"
            alt="airline logo"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-semibold">{airline}</span>
      </div>
      <div>
        Travel Class: <span className="font-semibold">{travelClass}</span>
      </div>
    </div>
  );
}
