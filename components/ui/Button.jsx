const baseStyles =
  "inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-primary text-white hover:bg-primary/80 shadow",
  outline:
    "border border-primary bg-white hover:bg-gray-100 text-primary",
  ghost: "hover:bg-primary/10 text-primary hover:text-primary",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 rounded px-3 text-xs",
  lg: "h-12 rounded px-8 text-base",
};

function Button({ className = "", variant = "primary", size = "default", ref, ...props }) {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    />
  );
}

export { Button };
