export function CardHeader({ className = "", ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`} {...props} />
  );
}
