import { AnimatedCounter } from "@/components/common/AnimatedCounter";

interface StatsStripProps {
  stats: {
    years: number;
    clients: number;
    branchesCount: number;
    googleRating: number;
  };
}

export function StatsStrip({ stats }: StatsStripProps) {
  const items = [
    { value: stats.years, suffix: "+", label: "سنوات خبرة" },
    { value: stats.clients, suffix: "+", label: "عميل سعيد" },
    { value: stats.branchesCount, suffix: "", label: "فرع" },
    { value: stats.googleRating, suffix: "", label: "تقييم جوجل" },
  ];

  return (
    <section className="border-y border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 text-center">
            <span className="font-display text-brand-navy-700 text-3xl font-extrabold sm:text-4xl">
              <AnimatedCounter value={item.value} suffix={item.suffix} />
            </span>
            <span className="text-muted-foreground text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
