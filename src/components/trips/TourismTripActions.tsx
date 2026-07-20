"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, CheckCircle2, Eye, Hotel, MapPin, Sparkles, TicketCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CATEGORY_LABELS } from "@/content/site";
import type { Trip } from "@/types";
import { formatCurrency } from "@/lib/currency";

export const SELECT_TRIP_EVENT = "captain-tours:select-trip";

export function TourismTripActions({ trip }: { trip: Trip }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  function bookTrip() {
    setDetailsOpen(false);
    window.dispatchEvent(new CustomEvent(SELECT_TRIP_EVENT, { detail: { tripId: trip._id } }));
    window.requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <Button
          type="button"
          onClick={bookTrip}
          className="h-11 rounded-xl bg-brand-orange-500 font-bold hover:bg-brand-orange-600"
        >
          <TicketCheck className="size-4" /> احجز الآن
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setDetailsOpen(true)}
          className="h-11 rounded-xl border-brand-navy-200 font-bold text-brand-navy-700 hover:bg-brand-navy-50"
        >
          <Eye className="size-4" /> التفاصيل
        </Button>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-h-[94dvh] w-[calc(100%-1rem)] overflow-hidden rounded-3xl p-0 sm:max-w-6xl lg:max-h-none" dir="rtl">
          <div className="grid max-h-[94dvh] overflow-y-auto overscroll-contain lg:max-h-none lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,.75fr)] lg:overflow-visible">
            <div className="flex min-w-0 flex-col p-4 sm:p-6 lg:p-8">
              <DialogHeader className="pe-8 text-start">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-orange-50 px-3 py-1 text-xs font-bold text-brand-orange-700">
                    {CATEGORY_LABELS[trip.category]}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                    <Sparkles className="size-3.5" /> رحلة مختارة
                  </span>
                </div>
                <DialogTitle className="font-display text-2xl font-black leading-normal text-brand-navy-900 sm:text-3xl">
                  {trip.title}
                </DialogTitle>
                <DialogDescription className="max-w-2xl text-sm leading-7 sm:text-base">
                  {trip.description || "كل التفاصيل الأساسية للرحلة في مكان واحد، لتختار وجهتك القادمة بسهولة."}
                </DialogDescription>
              </DialogHeader>

              <div className="my-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:my-5">
                {trip.duration && <Detail icon={CalendarDays} label="المدة" value={trip.duration} />}
                {trip.location?.address && <Detail icon={MapPin} label="الوجهة" value={trip.location.address} />}
                {trip.hotelInfo && <Detail icon={Hotel} label="الإقامة" value={trip.hotelInfo} />}
                <Detail icon={TicketCheck} label="السعر للفرد" value={formatCurrency(trip.price, trip.currency)} featured />
              </div>

              {trip.includes.length > 0 && (
                <div className="border-t border-slate-100 pt-4">
                  <h4 className="mb-3 font-display text-base font-bold text-brand-navy-900">ماذا تشمل الرحلة؟</h4>
                  <ul className="grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {trip.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-5">
                <Button type="button" onClick={bookTrip} className="h-13 w-full rounded-xl bg-brand-orange-500 text-base font-bold shadow-lg shadow-brand-orange-500/20 hover:bg-brand-orange-600 sm:w-auto sm:min-w-52">
                  <TicketCheck className="size-5" /> احجز هذه الرحلة
                </Button>
                <p className="mt-2 text-xs text-slate-400">سيتم نقلك لنموذج الحجز مع تحديد هذه الرحلة تلقائيًا.</p>
              </div>
            </div>

            <div className="relative order-first min-h-56 overflow-hidden bg-brand-navy-900 lg:order-last lg:min-h-full">
              {trip.images?.[0] ? (
                <Image src={trip.images[0]} alt={trip.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 38vw" />
              ) : (
                <div className="flex h-full min-h-56 items-center justify-center bg-linear-to-br from-brand-navy-700 to-cyan-800 text-white/70">
                  <Sparkles className="size-16" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-brand-navy-950/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                <p className="text-xs text-white/70">السعر يبدأ من</p>
                <p className="mt-1 font-display text-3xl font-black">{formatCurrency(trip.price, trip.currency)}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Detail({ icon: Icon, label, value, featured = false }: { icon: typeof CalendarDays; label: string; value: string; featured?: boolean }) {
  return (
    <div className={`min-w-0 rounded-xl border p-3 ${featured ? "border-brand-orange-100 bg-brand-orange-50" : "border-slate-100 bg-slate-50"}`}>
      <Icon className={`mb-2 size-5 ${featured ? "text-brand-orange-600" : "text-brand-navy-500"}`} />
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-brand-navy-800">{value}</p>
    </div>
  );
}
