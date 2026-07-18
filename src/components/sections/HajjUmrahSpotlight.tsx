"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/gsap";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TripsRow } from "@/components/trips/TripsRow";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import type { Trip } from "@/types";

interface HajjUmrahSpotlightProps {
  trips: Trip[];
  whatsappNumber: string;
}

export function HajjUmrahSpotlight({ trips, whatsappNumber }: HajjUmrahSpotlightProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current || !bgRef.current) return;

    registerGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="offers"
      className="bg-spotlight-bg relative scroll-mt-20 overflow-hidden py-24 text-white"
    >
      <div ref={bgRef} className="absolute inset-0 -top-16 -bottom-16">
        <Image
          src="/hajj-umrah/umrah-kaaba-evening-hero.png"
          alt="الحج والعمرة"
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="from-spotlight-bg via-spotlight-bg/85 to-spotlight-bg absolute inset-0 bg-linear-to-b" />
      <div className="from-spotlight-gold/20 pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="باقات الحج والعمرة"
          title="بداية رحلة روحانية تلامس القلوب"
          description="برامج حج وعمرة متكاملة، بإشراف مرشدين متخصصين، وسكن فاخر قريب من الحرمين الشريفين."
        />

        <RevealOnScroll className="mt-12">
          {trips.length > 0 ? (
            <TripsRow trips={trips} whatsappNumber={whatsappNumber} />
          ) : (
            <p className="text-center text-white/60">
              برامج الحج والعمرة الجديدة قريبًا - تواصل معنا لحجز مكانك مبكرًا.
            </p>
          )}
        </RevealOnScroll>

        <div className="mt-10 flex justify-center">
          <WhatsAppCta
            number={whatsappNumber}
            text="أهلاً، أرغب في الاستفسار عن باقات الحج والعمرة"
            className="bg-spotlight-gold text-spotlight-bg hover:bg-spotlight-gold-light px-8 py-3 text-base"
          >
            احجز رحلتك الروحانية
          </WhatsAppCta>
        </div>
      </div>
    </section>
  );
}
