function Checkbox({ className = "", ref, ...props }) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 shrink-0 rounded-sm border-gray-300 text-brand-purple accent-brand-purple focus:ring-brand-purple ${className}`}
      ref={ref}
      {...props}
    />
  );
}

export { Checkbox };
