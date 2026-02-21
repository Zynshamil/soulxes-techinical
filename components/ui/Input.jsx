function Input({ className = "", type = "text", icon: Icon, ref, ...props }) {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm text-brand-text file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple disabled:cursor-not-allowed disabled:opacity-50 ${Icon ? "pl-10" : ""} ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export { Input };
