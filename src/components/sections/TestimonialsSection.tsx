"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useAutoplayCarousel } from "@/hooks/useAutoplayCarousel";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-brand-navy-50/40 flex w-80 shrink-0 flex-col gap-4 rounded-2xl border border-black/5 p-6">
      <Quote className="text-brand-orange-400 size-6" />
      <p className="text-brand-navy-800 line-clamp-4 text-sm leading-relaxed">
        {testimonial.text}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-display text-brand-navy-700 text-sm font-bold">
          {testimonial.name}
        </span>
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < testimonial.rating
                  ? "fill-brand-orange-500 text-brand-orange-500 size-4"
                  : "text-brand-navy-200 size-4"
              }
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { containerRef, trackRef, x, copies, dragConstraints, pauseHandlers } =
    useAutoplayCarousel({ itemCount: testimonials.length });

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="آراء عملائنا"
          title="ثقة عملائنا هي نجاحنا"
          description="تجارب حقيقية من عملاء سافروا معنا في رحلات الحج والعمرة والسياحة."
        />

        <RevealOnScroll className="mt-12">
          <div
            ref={containerRef}
            className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
            {...pauseHandlers}
          >
            <motion.div
              ref={trackRef}
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.08}
              style={{ x }}
              className="flex w-max cursor-grab gap-5 px-1 py-2 active:cursor-grabbing"
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
              {Array.from({ length: Math.max(0, copies - 1) }).map((_, copyIndex) => (
                <div key={`dup-${copyIndex}`} inert className="contents">
                  {testimonials.map((t) => (
                    <TestimonialCard key={`${t._id}-dup-${copyIndex}`} testimonial={t} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
