"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GALLERY_ITEMS } from "@/content/site";

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function showPrev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  }

  function showNext() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));
  }

  const active = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <section id="gallery" className="bg-brand-navy-50/40 scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="من رحلاتنا"
          title="لحظات حقيقية من رحلات عملائنا"
          description="صور وفيديوهات موثقة من رحلات الحج والعمرة التي نظمتها كابتن تورز - ذكريات وتجارب حقيقية عشناها معًا."
        />

        <RevealOnScroll className="mt-12 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-2xl bg-brand-navy-50 ring-1 ring-black/5 ${
                item.type === "video" ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {item.type === "video" && (
                <span className="absolute top-3 start-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Play className="size-3.5 fill-white" />
                  فيديو
                </span>
              )}

              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-white sm:text-sm">
                  <ZoomIn className="size-3.5 sm:size-4" />
                  {item.caption}
                </span>
              </div>
            </button>
          ))}
        </RevealOnScroll>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-3xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{active?.caption}</DialogTitle>
          {active && (
            <div className="relative">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-black">
                {active.type === "video" ? (
                  <video
                    src={active.src}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
                )}
              </div>
              <p className="mt-3 text-center font-display text-base font-semibold text-white">
                {active.caption}
              </p>
              <button
                type="button"
                onClick={showPrev}
                aria-label="السابق"
                className="absolute top-1/2 start-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy-800 shadow-md transition-transform hover:scale-105"
              >
                <ChevronRight className="size-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="التالي"
                className="absolute top-1/2 end-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy-800 shadow-md transition-transform hover:scale-105"
              >
                <ChevronLeft className="size-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
