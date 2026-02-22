export function Card({ className = "", ...props }) {
  return (
    <div
      className={`border border-brand-border bg-white text-brand-text shadow-sm ${className}`}
      {...props}
    />
  );
}
