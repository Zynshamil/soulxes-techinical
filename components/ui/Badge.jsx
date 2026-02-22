import * as React from "react";

function Badge({ className = "", variant = "default", children, ...props }) {
  const variants = {
    default: "text-gray-500",
    success: "text-[#198754]",
    warning: "text-[#FD7E14]",
    danger: "text-red-500",
  };
  return (
    <span
      className={`inline-flex items-center text-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
