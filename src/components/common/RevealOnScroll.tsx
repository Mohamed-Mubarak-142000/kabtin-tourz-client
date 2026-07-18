"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  as?: "div" | "section";
}

export function RevealOnScroll({
  children,
  className,
  y = 40,
  delay = 0,
  stagger = 0.08,
  as = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) return;

    registerGsapPlugins();
    const el = ref.current;
    const targets = el.children.length > 0 ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, delay, stagger]);

  const Comp = as;

  return (
    <Comp ref={ref as never} className={cn(className)}>
      {children}
    </Comp>
  );
}
