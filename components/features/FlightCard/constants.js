import { AlertTriangle, Plane, ArrowLeftRight, Luggage } from "lucide-react";

export const TABS = [
  { id: "flight-info",  label: "Flight Information" },
  { id: "fare-detail",  label: "Fare Detail" },
  { id: "baggage",      label: "Baggage Rules" },
  { id: "cancellation", label: "Cancellation Rules" },
];

export const NOTE_ICON_MAP = {
  warning:  <AlertTriangle size={13} className="text-orange-400 shrink-0" />,
  plane:    <Plane size={13} className="text-gray-400 shrink-0" />,
  transfer: <ArrowLeftRight size={13} className="text-gray-400 shrink-0" />,
  bag:      <Luggage size={13} className="text-gray-400 shrink-0" />,
};

export const REFUND_VARIANT = {
  "Fully Refundable":     "success",
  "Partially Refundable": "warning",
  "Non-Refundable":       "danger",
};
