import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import { CATEGORY_LABELS } from "@/content/site";
import type { Trip } from "@/types";

interface TripCardProps {
  trip: Trip;
  whatsappNumber: string;
}

export function TripCard({ trip, whatsappNumber }: TripCardProps) {
  const image = trip.images?.[0];

  return (
    <div className="flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm shadow-black/5 transition-transform hover:-translate-y-1 hover:shadow-lg sm:w-80">
      <div className="relative h-44 w-full overflow-hidden">
        {image ? (
          <Image src={image} alt={trip.title} fill className="object-cover" sizes="320px" />
        ) : (
          <div className="bg-brand-navy-50 text-brand-navy-300 flex h-full w-full items-center justify-center">
            كابتن تورز
          </div>
        )}
        <Badge className="bg-brand-orange-500 absolute start-3 top-3 text-white">
          {CATEGORY_LABELS[trip.category]}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-brand-navy-800 text-lg font-bold">{trip.title}</h3>

        <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
          {trip.duration && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> {trip.duration}
            </span>
          )}
          {trip.location?.address && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {trip.location.address}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="font-display text-brand-navy-700 text-lg font-bold">
            {trip.price.toLocaleString("ar-EG")} {trip.currency}
          </span>
          <WhatsAppCta
            number={whatsappNumber}
            text={`أهلاً، أرغب في الاستفسار عن رحلة: ${trip.title}`}
            className="px-4 py-2 text-xs"
          >
            استفسار
          </WhatsAppCta>
        </div>
      </div>
    </div>
  );
}
