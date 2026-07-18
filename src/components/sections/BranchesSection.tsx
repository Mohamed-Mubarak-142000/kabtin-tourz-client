import { MapPin, Star } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PhoneCta } from "@/components/common/PhoneCta";
import type { Branch } from "@/types";

interface BranchesSectionProps {
  branches: Branch[];
}

export function BranchesSection({ branches }: BranchesSectionProps) {
  if (branches.length === 0) return null;

  return (
    <section id="branches" className="bg-brand-navy-50/40 scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="فروعنا"
          title="تجدنا أينما كنت"
          description="زورونا في أقرب فرع أو تواصلوا معنا مباشرة."
        />

        <RevealOnScroll className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <div
              key={branch._id}
              className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-6 shadow-sm shadow-black/5"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-brand-navy-800 text-lg font-bold">
                  {branch.name}
                </h3>
                {branch.googleRating && (
                  <span className="text-brand-orange-600 flex items-center gap-1 text-sm font-semibold">
                    <Star className="fill-brand-orange-500 text-brand-orange-500 size-4" />
                    {branch.googleRating}
                  </span>
                )}
              </div>

              <div className="text-muted-foreground flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{branch.address}</span>
              </div>

              <div className="mt-auto flex items-center gap-3 pt-2">
                <PhoneCta number={branch.phone} className="flex-1 justify-center" />
                {branch.mapLink && (
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-navy-600 hover:text-brand-orange-500 flex items-center gap-1.5 text-sm font-semibold"
                  >
                    عرض الموقع
                  </a>
                )}
              </div>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
