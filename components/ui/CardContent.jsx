export function CardContent({ className = "", ...props }) {
  return <div className={`py-2 ${className}`} {...props} />;
}
