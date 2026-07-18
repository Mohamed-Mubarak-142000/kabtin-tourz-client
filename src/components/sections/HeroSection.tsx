"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  images: string[];
  whatsappNumber: string;
}

const FALLBACK_IMAGES = [
  "/hajj-umrah/hajj-kaaba-hero.png",
  "/hajj-umrah/umrah-kaaba-evening-hero.png",
  "/hajj-umrah/hajj-mina-tents-card.png",
  "/hajj-umrah/kaaba-kiswah-detail-card.png",
];

// One entrance direction per slide, cycling right / left / top / bottom / repeat.
const ENTRY_OFFSETS = [
  { x: 90, y: 0 },
  { x: -90, y: 0 },
  { x: 0, y: -70 },
  { x: 0, y: 70 },
];

export function HeroSection({ title, subtitle, images, whatsappNumber }: HeroSectionProps) {
  const heroImages = images.length > 0 ? images : FALLBACK_IMAGES;
  const [activeImage, setActiveImage] = useState(0);
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroImages.length < 2) return;
    const id = setInterval(() => {
      setActiveImage((i) => (i + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(id);
  }, [heroImages.length]);

  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-word]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }
      )
        .fromTo(
          "[data-hero-subtitle]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.2"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="bg-brand-navy-900 relative flex min-h-[92vh] items-center justify-center overflow-hidden"
    >
      {heroImages.map((src, i) => {
        const offset = ENTRY_OFFSETS[i % ENTRY_OFFSETS.length];
        const isActive = i === activeImage;

        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={
              reducedMotion
                ? { opacity: isActive ? 1 : 0 }
                : {
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : offset.x,
                    y: isActive ? 0 : offset.y,
                    scale: isActive ? [1, 1.12, 1] : 1,
                  }
            }
            transition={{
              opacity: { duration: 2.2, ease: "easeInOut" },
              x: { duration: 2.6, ease: "easeOut" },
              y: { duration: 2.6, ease: "easeOut" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Image src={src} alt={title} fill priority={i === 0} className="object-cover" />
          </motion.div>
        );
      })}

      <div className="from-brand-navy-900 via-brand-navy-900/70 to-brand-navy-900/40 absolute inset-0 bg-linear-to-t" />
      <div className="bg-brand-orange-500/30 pointer-events-none absolute start-1/2 -top-24 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h1 className="font-display text-3xl leading-tight font-extrabold text-white sm:text-5xl">
          {title.split(" ").map((word, i) => (
            <span data-hero-word key={`${word}-${i}`} className="me-2 inline-block">
              {word}
            </span>
          ))}
        </h1>

        <p data-hero-subtitle className="max-w-xl text-base text-white/80 sm:text-lg">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <span data-hero-cta>
            <WhatsAppCta
              number={whatsappNumber}
              text="أهلاً، أرغب في معرفة تفاصيل الرحلات المتاحة"
              className="px-7 py-3 text-base shadow-lg shadow-black/30"
            >
              اطلب رحلتك الآن
            </WhatsAppCta>
          </span>
          <a
            data-hero-cta
            href="#services"
            className="rounded-full border border-white/30 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            استكشف خدماتنا
          </a>
        </div>
      </div>

      <ChevronDown className="absolute start-1/2 bottom-6 size-7 -translate-x-1/2 animate-bounce text-white/60" />
    </section>
  );
}
