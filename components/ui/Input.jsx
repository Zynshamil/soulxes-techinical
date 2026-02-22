import Image from "next/image";

function Input({ className = "", type = "text", icon: Icon, ref, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Image src={Icon} alt="icon" width={18} height={18} />
        </div>
      )}
      <input
        type={type}
        className={`flex h-10 rounded-md border border-[#A1B0CC] bg-white px-3 py-2 text-sm text-gray-700 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${Icon ? "pl-10" : ""} ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export { Input };
