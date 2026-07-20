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
  fourWay?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  y = 40,
  delay = 0,
  stagger = 0.08,
  as = "div",
  fourWay = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) return;

    registerGsapPlugins();
    const el = ref.current;
    const targets = el.children.length > 0 ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      const directions = [
        { x: 90, y: 0 },
        { x: -90, y: 0 },
        { x: 0, y: 70 },
        { x: 0, y: -70 },
      ];

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          x: (index) => fourWay ? directions[index % directions.length].x : 0,
          y: (index) => fourWay ? directions[index % directions.length].y : y,
        },
        {
          opacity: 1,
          x: 0,
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
  }, [y, delay, stagger, fourWay]);

  const Comp = as;

  return (
    <Comp ref={ref as never} className={cn(className)}>
      {children}
    </Comp>
  );
}
