import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Button } from "@/components/ui/Button";

export function PromoCard({ promo }) {
  if (promo.type === "image-card") {
    return (
      <Card className="overflow-hidden border-0 shadow-none rounded lg:shadow-sm">
        <div className="h-[196px] w-full relative">
          <Image
            src={promo.image}
            alt={promo.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <CardContent className="p-2 space-y-3">
          <h3 className="font-semibold text-[16px] leading-tight">
            {promo.title}
          </h3>
          <p className="text-sm font-normal leading-relaxed">
            {promo.description}
          </p>
          <Button
            variant="outline"
            className="w-full mt-2 text-primary border-primary hover:bg-primary-light text-sm font-semibold"
          >
            {promo.buttonLabel}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (promo.type === "sale-banner") {
    return (
      <Card className="bg-gray-900 text-white overflow-hidden border-0">
        <div className="relative w-full h-[196px]">
          <Image
            src={promo.image}
            alt="Sale 50%"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <CardContent className="p-2 space-y-3 text-black">
          <h3 className="font-semibold text-base leading-tight">
            {promo.title}
          </h3>
          <p className="text-sm pe-2 leading-relaxed">{promo.description}</p>
          <Button
            variant="outline"
            className="w-full mt-2 text-primary border-primary hover:bg-primary-light text-sm font-semibold"
          >
            {promo.buttonLabel}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (promo.type === "text-card") {
    return (
      <Card className="border-0 shadow-none lg:border lg:shadow-sm">
        <CardContent className="p-5 text-center">
          <h3 className="font-bold text-base text-gray-900 mb-3">
            {promo.title}
          </h3>
          <p className="text-xs text-gray-600 mb-5 leading-relaxed">
            {promo.description}
          </p>
          <Button
            variant="outline"
            className="w-full text-brand-purple border-brand-purple hover:bg-brand-light"
          >
            {promo.buttonLabel}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}
