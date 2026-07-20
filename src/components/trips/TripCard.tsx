import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import { TourismTripActions } from "@/components/trips/TourismTripActions";
import { CATEGORY_LABELS } from "@/content/site";
import type { Trip } from "@/types";
import { formatCurrency } from "@/lib/currency";

interface TripCardProps {
  trip: Trip;
  whatsappNumber: string;
  fluid?: boolean;
  bookingActions?: boolean;
}

export function TripCard({ trip, whatsappNumber, fluid = false, bookingActions = false }: TripCardProps) {
  const image = trip.images?.[0];

  return (
    <div className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5 transition-shadow hover:shadow-lg ${fluid ? "w-full" : "w-72 shrink-0 sm:w-80"} ${bookingActions ? "h-full" : "hover:-translate-y-1"}`}>
      <div className="relative h-44 w-full overflow-hidden">
        {image ? (
          <Image src={image} alt={trip.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" sizes="320px" />
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

        <div className="mt-auto pt-2">
          <span className="font-display block text-brand-navy-700 text-lg font-bold">
            {formatCurrency(trip.price, trip.currency)}
          </span>
          {bookingActions ? (
            <div className="mt-4">
              <TourismTripActions trip={trip} />
            </div>
          ) : (
            <div className="mt-3 flex justify-end">
              <WhatsAppCta
                number={whatsappNumber}
                text={`أهلاً، أرغب في الاستفسار عن رحلة: ${trip.title}`}
                className="px-4 py-2 text-xs"
              >
                استفسار
              </WhatsAppCta>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
