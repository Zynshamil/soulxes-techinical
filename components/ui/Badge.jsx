import * as React from "react";

function Badge({ className = "", variant = "default", children, ...props }) {
  const variants = {
    default: "text-gray-500",
    success: "text-green-500",
    warning: "text-orange-500",
    danger: "text-red-500",
  };
  return (
    <span
      className={`inline-flex items-center text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
