import { Button } from "@/components/ui/Button";

export function PriceBlock({ price, bookState, onBook }) {
  return (
    <div className="flex flex-col items-start justify-center gap-3 pl-2">
      <div className="text-2xl w-full font-bold text-gray-900">
        ${price.toLocaleString()}
      </div>
      {bookState === "booked" ? (
        <div className="px-6 py-2 bg-green-100 text-green-700 font-semibold text-sm rounded-md text-center">
          ✓ Booked!
        </div>
      ) : (
        <Button className="w-[99px] font-semibold text-sm" onClick={onBook} disabled={bookState === "loading"}>
          {bookState === "loading" ? "Booking…" : "Book Now"}
        </Button>
      )}
    </div>
  );
}
