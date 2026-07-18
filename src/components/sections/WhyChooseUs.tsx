import { ShieldCheck, BedDouble, Bus, UserCheck, Headset } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WHY_CHOOSE_US } from "@/content/site";

const ICONS = {
  ShieldCheck,
  BedDouble,
  Bus,
  UserCheck,
  Headset,
} as const;

export function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="لماذا كابتن تورز"
          title="أفضل خدمة، أفضل برامج"
          description="نحرص على تقديم تجربة سفر متكاملة من أول خطوة حتى العودة بأمان."
        />

        <RevealOnScroll className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            return (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 p-6 text-center shadow-sm shadow-black/5"
              >
                <span className="bg-brand-navy-50 text-brand-navy-600 flex size-14 items-center justify-center rounded-full">
                  <Icon className="size-7" />
                </span>
                <h3 className="font-display text-brand-navy-800 text-base font-bold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
