"use client";

import { useState } from "react";
import { Landmark, MoonStar, Plane, Compass, Globe2, Stamp, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TripCard } from "@/components/trips/TripCard";
import { getTrips } from "@/lib/endpoints";
import { CATEGORY_DESCRIPTIONS, CATEGORY_LABELS } from "@/content/site";
import type { Trip, TripCategory } from "@/types";

const SERVICE_ICONS: Record<TripCategory, typeof Plane> = {
  hajj: Landmark,
  umrah: MoonStar,
  flights: Plane,
  domestic: Compass,
  international: Globe2,
  visa: Stamp,
};

const CATEGORIES: TripCategory[] = [
  "hajj",
  "umrah",
  "flights",
  "domestic",
  "international",
  "visa",
];

interface ServicesGridProps {
  whatsappNumber: string;
}

export function ServicesGrid({ whatsappNumber }: ServicesGridProps) {
  const [activeCategory, setActiveCategory] = useState<TripCategory | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);

  async function openCategory(category: TripCategory) {
    setActiveCategory(category);
    setLoading(true);
    try {
      const data = await getTrips({ category });
      setTrips(data);
    } catch {
      setTrips([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="services" className="bg-brand-navy-50/40 scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="خدماتنا"
          title="كل ما تحتاجه لرحلتك القادمة"
          description="من الحج والعمرة إلى حجز الطيران والسياحة الداخلية والخارجية والتأشيرات - نغطي رحلتك بالكامل."
        />

        <RevealOnScroll className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = SERVICE_ICONS[category];
            return (
              <button
                key={category}
                onClick={() => openCategory(category)}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-black/5 bg-white p-6 text-start shadow-sm shadow-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="bg-brand-navy-50 text-brand-navy-600 group-hover:bg-brand-orange-500 flex size-12 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-display text-brand-navy-800 text-lg font-bold">
                  {CATEGORY_LABELS[category]}
                </h3>
                <p className="text-muted-foreground text-sm">{CATEGORY_DESCRIPTIONS[category]}</p>
              </button>
            );
          })}
        </RevealOnScroll>
      </div>

      <Dialog
        open={activeCategory !== null}
        onOpenChange={(open) => !open && setActiveCategory(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeCategory ? CATEGORY_LABELS[activeCategory] : ""}</DialogTitle>
            <DialogDescription>
              {activeCategory ? CATEGORY_DESCRIPTIONS[activeCategory] : ""}
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="text-muted-foreground flex items-center justify-center gap-2 py-10">
              <Loader2 className="size-5 animate-spin" /> جاري تحميل البرامج المتاحة...
            </div>
          ) : trips.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} whatsappNumber={whatsappNumber} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground py-10 text-center text-sm">
              لا توجد برامج متاحة حاليًا في هذا القسم، تواصل معنا مباشرة وسنوفر لك أفضل عرض.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
