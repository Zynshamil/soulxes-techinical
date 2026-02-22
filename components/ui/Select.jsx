import { ChevronDown } from "lucide-react";
import Image from "next/image";

function Select({
  className = "",
  value = null,
  ref,
  options,
  placeholder,
  ...props
}) {
  return (
    <div className="relative w-full">
      <select
        className={`flex h-9 w-full appearance-none rounded-md border border-[#A1B0CC] bg-white px-3 py-2 pr-8 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${value === null || value === "" ? "text-gray-400" : "text-gray-700"} ${className}`}
        ref={ref}
        value={value ?? ""}
        {...props}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options?.map((val) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        <Image src={"/icons/down-icon.svg"} height={18} width={18} alt="down-icon" />
      </div>
    </div>
  );
}

export { Select };
