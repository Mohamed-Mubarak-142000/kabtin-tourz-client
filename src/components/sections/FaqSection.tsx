import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { Faq } from "@/types";

interface FaqSectionProps {
  faqs: Faq[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  if (faqs.length === 0) return null;

  const sorted = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-brand-navy-50/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="أسئلة شائعة" title="عندك سؤال؟ إجابتك هنا" />

        <RevealOnScroll className="mt-10">
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-black/5 bg-white px-6"
          >
            {sorted.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger className="font-display text-brand-navy-800 text-base font-bold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
}
