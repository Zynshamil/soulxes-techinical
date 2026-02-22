import { PromoCard } from "./PromoCard";

export function PromoWidgets({ data }) {
  return (
    <div className="space-y-6 w-full lg:w-[240px]">
      {data.map((promo) => (
        <PromoCard key={promo.id} promo={promo} />
      ))}
    </div>
  );
}
