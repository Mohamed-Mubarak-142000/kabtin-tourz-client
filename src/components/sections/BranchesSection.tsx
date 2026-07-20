import { MapPin, Navigation } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";

const LOCATION = "جنزور، بركة السبع، المنوفية";
const MAP_QUERY = encodeURIComponent(LOCATION);

export function BranchesSection() {
  return (
    <section id="branches" className="scroll-mt-20 bg-brand-navy-50/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="موقعنا"
          title="زورونا في جنزور"
          description="يسعدنا استقبالكم في جنزور، مركز بركة السبع، محافظة المنوفية."
        />

        <RevealOnScroll className="mt-12 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-brand-navy-900/10">
          <div className="grid lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="flex flex-col justify-center bg-brand-navy-900 p-7 text-white sm:p-9">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-orange-500">
                <MapPin className="size-6" />
              </span>
              <p className="mt-6 text-sm font-bold text-brand-orange-300">كابتن تورز</p>
              <h3 className="mt-2 font-display text-2xl font-black">{LOCATION}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                افتح الخريطة للحصول على أفضل طريق من موقعك الحالي إلى مقرنا.
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white font-bold text-brand-navy-800 transition-colors hover:bg-brand-orange-50"
              >
                <Navigation className="size-4" /> عرض الاتجاهات
              </a>
            </div>

            <div className="relative min-h-80 bg-slate-100 sm:min-h-105">
              <iframe
                title={`خريطة ${LOCATION}`}
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
