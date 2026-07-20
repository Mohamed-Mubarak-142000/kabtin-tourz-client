import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import Image from "next/image";
import { CalendarDays, MapPin, Palmtree } from "lucide-react";
import type { Trip } from "@/types";
import { CATEGORY_LABELS } from "@/content/site";
import { TourismTripActions } from "@/components/trips/TourismTripActions";
import { formatCurrency } from "@/lib/currency";

interface FeaturedTripsProps {
  trips: Trip[];
}

export function FeaturedTrips({ trips }: FeaturedTripsProps) {
  if (trips.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-sky-50 py-24">
      <div className="pointer-events-none absolute -start-24 top-10 size-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -end-20 bottom-0 size-80 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="اكتشف وجهتك القادمة"
          title="رحلات سياحية تصنع ذكريات"
          description="برامج داخلية وخارجية مختارة بعناية، من شواطئ مصر إلى أجمل الوجهات حول العالم."
        />

        <RevealOnScroll fourWay stagger={0.12} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip, index) => {
              const image = trip.images?.[0];
              return (
                <article
                  key={trip._id}
                  className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lg shadow-sky-950/8 transition-shadow duration-300 hover:shadow-xl ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    {image ? (
                      <Image src={image} alt={trip.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-linear-to-br from-sky-200 to-cyan-50 text-brand-navy-500">
                        <Palmtree className="size-12" />
                      </div>
                    )}
                    <span className="absolute start-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-navy-700 shadow-sm backdrop-blur">
                      {CATEGORY_LABELS[trip.category]}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/55 to-transparent" />
                    <p className="absolute bottom-4 start-4 text-sm font-bold text-white">
                      تبدأ من {formatCurrency(trip.price, trip.currency)}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-bold text-brand-navy-800">{trip.title}</h3>
                    <div className="mt-4 mb-5 flex min-h-6 flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                      {trip.duration && <span className="flex items-center gap-1.5"><CalendarDays className="size-4 text-cyan-600" />{trip.duration}</span>}
                      {trip.location?.address && <span className="flex items-center gap-1.5"><MapPin className="size-4 text-brand-orange-500" />{trip.location.address}</span>}
                    </div>
                    <TourismTripActions trip={trip} />
                  </div>
                </article>
              );
            })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
