export function CardTitle({ className = "", ...props }) {
  return (
    <h3
      className={` leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}
