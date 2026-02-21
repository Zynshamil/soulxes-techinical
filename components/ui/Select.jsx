import { ChevronDown } from "lucide-react";

function Select({ className = "", children, ref, ...props }) {
  return (
    <div className="relative w-full">
      <select
        className={`flex h-10 w-full appearance-none rounded-md border border-brand-border bg-white px-3 py-2 pr-8 text-sm text-brand-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}

export { Select };
