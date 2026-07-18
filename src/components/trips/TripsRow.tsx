"use client";

import { motion } from "framer-motion";
import { TripCard } from "@/components/trips/TripCard";
import { useAutoplayCarousel } from "@/hooks/useAutoplayCarousel";
import type { Trip } from "@/types";

interface TripsRowProps {
  trips: Trip[];
  whatsappNumber: string;
}

export function TripsRow({ trips, whatsappNumber }: TripsRowProps) {
  const { containerRef, trackRef, x, copies, dragConstraints, pauseHandlers } =
    useAutoplayCarousel({ itemCount: trips.length });

  if (trips.length === 0) return null;

  return (
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
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} whatsappNumber={whatsappNumber} />
        ))}
        {Array.from({ length: Math.max(0, copies - 1) }).map((_, copyIndex) => (
          <div key={`dup-${copyIndex}`} inert className="contents">
            {trips.map((trip) => (
              <TripCard
                key={`${trip._id}-dup-${copyIndex}`}
                trip={trip}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
