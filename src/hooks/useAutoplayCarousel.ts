"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, animate } from "framer-motion";
import { prefersReducedMotion } from "@/lib/gsap";

interface UseAutoplayCarouselOptions {
  /** Number of distinct items (before duplication) rendered by the caller. */
  itemCount: number;
  intervalMs?: number;
}

function measureStep(track: HTMLDivElement) {
  const firstChild = track.firstElementChild as HTMLElement | null;
  if (!firstChild) return 320;
  const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
  return firstChild.getBoundingClientRect().width + gap;
}

/**
 * Drives an infinite, card-by-card autoplay carousel.
 *
 * This track is rendered inside a page with dir="rtl", so the flex track
 * sits flush against the *right* edge of its container at x=0 (the RTL flex
 * main-axis start), with all overflow hanging off the left, clipped. That
 * means advancing "forward" (revealing later cards, which sit further left
 * in the DOM) requires moving `x` in the POSITIVE direction - that keeps the
 * track's right edge pinned/receding into already-clipped space instead of
 * pulling away from the container's right edge and opening a gap there.
 *
 * The caller must render the item list `copies` times back-to-back (every
 * copy after the first hidden from assistive tech via `inert`) so that once
 * autoplay scrolls past one full set, we can snap `x` back by exactly one
 * set-width with zero visible change - a seamless loop. `copies` is computed
 * so there's always at least one full extra set rendered beyond the visible
 * viewport, however wide it is or however few items there are - otherwise
 * the track runs out of content and a blank gap appears before the loop
 * point.
 */
export function useAutoplayCarousel({ itemCount, intervalMs = 3200 }: UseAutoplayCarouselOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [step, setStep] = useState(320);
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  const setWidth = itemCount * step;

  useEffect(() => {
    function measure() {
      if (!trackRef.current || !containerRef.current) return;
      const measuredStep = measureStep(trackRef.current);
      const containerWidth = containerRef.current.clientWidth;
      const oneSetWidth = Math.max(1, itemCount * measuredStep);
      // Always keep at least one full set rendered beyond the viewport.
      const neededCopies = Math.max(2, Math.ceil(containerWidth / oneSetWidth) + 2);
      setStep(measuredStep);
      setCopies(neededCopies);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [itemCount]);

  useEffect(() => {
    if (itemCount <= 0 || step <= 0 || paused || prefersReducedMotion()) return;

    const id = setInterval(() => {
      const next = x.get() + step;

      void animate(x, next, { duration: 0.6, ease: "easeInOut" }).then(() => {
        // Once we've scrolled a full set-width, the duplicated copy is
        // showing exactly what the first copy showed at x=0, so we can
        // snap back by one set-width instantly with no visible jump.
        if (x.get() >= setWidth - 1) {
          x.set(x.get() - setWidth);
        }
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [itemCount, step, setWidth, paused, intervalMs, x]);

  function settleAfterDrag() {
    setPaused(false);
    const raw = Math.round(x.get() / step) * step;
    const target = Math.max(0, Math.min(setWidth, raw));
    void animate(x, target, { duration: 0.35, ease: "easeOut" });
  }

  return {
    containerRef,
    trackRef,
    x,
    copies,
    dragConstraints: { left: 0, right: setWidth },
    pauseHandlers: {
      onPointerEnter: () => setPaused(true),
      onPointerLeave: () => setPaused(false),
      onDragStart: () => setPaused(true),
      onDragEnd: settleAfterDrag,
    },
  };
}
