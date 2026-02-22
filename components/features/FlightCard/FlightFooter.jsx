import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { REFUND_VARIANT } from "./constants";

export function FlightFooter({ seatsRemaining, refundPolicy, onToggle }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center pb-4 gap-4">
      <div className="text-sm">{seatsRemaining} seats remaining</div>
      <Badge variant={REFUND_VARIANT[refundPolicy] ?? "default"}>
        {refundPolicy}
      </Badge>
      <button
        className="text-sm text-primary font-semibold hover:underline flex items-center gap-1"
        onClick={onToggle}
      >
        View flight details
      </button>
    </div>
  );
}
