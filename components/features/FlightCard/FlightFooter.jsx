import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { REFUND_VARIANT } from "./constants";

export function FlightFooter({ seatsRemaining, refundPolicy, expanded, onToggle }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100 gap-4">
      <div className="text-sm text-gray-500">{seatsRemaining} seats remaining</div>
      <Badge variant={REFUND_VARIANT[refundPolicy] ?? "default"}>
        {refundPolicy}
      </Badge>
      <button
        className="text-sm text-brand-purple font-semibold hover:underline flex items-center gap-1"
        onClick={onToggle}
      >
        View flight details
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
    </div>
  );
}
