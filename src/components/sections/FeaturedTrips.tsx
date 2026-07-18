import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TripsRow } from "@/components/trips/TripsRow";
import type { Trip } from "@/types";

interface FeaturedTripsProps {
  trips: Trip[];
  whatsappNumber: string;
}

export function FeaturedTrips({ trips, whatsappNumber }: FeaturedTripsProps) {
  if (trips.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="الأكثر طلبًا"
          title="أفضل برامجنا السياحية"
          description="مجموعة مختارة من أفضل الرحلات والبرامج التي اختارها عملاؤنا."
        />

        <RevealOnScroll className="mt-12">
          <TripsRow trips={trips.slice(0, 8)} whatsappNumber={whatsappNumber} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
