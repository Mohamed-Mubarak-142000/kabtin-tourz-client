"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/gsap";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    registerGsapPlugins();
    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val).toLocaleString("ar-EG")}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
