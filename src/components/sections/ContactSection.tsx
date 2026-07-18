import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import { PhoneCta } from "@/components/common/PhoneCta";
import { SITE_ADDRESS } from "@/content/site";
import type { Branch } from "@/types";

interface ContactSectionProps {
  branches: Branch[];
  phones: string[];
  whatsappNumber: string;
}

export function ContactSection({ branches, phones, whatsappNumber }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="تواصل معنا"
          title="جاهزين نساعدك تخطط لرحلتك"
          description={`راسلنا وفريقنا هيتواصل معك على واتساب في أسرع وقت - ${SITE_ADDRESS}`}
        />

        <RevealOnScroll className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppCta number={whatsappNumber} className="px-6 py-3 text-base">
            راسلنا الآن
          </WhatsAppCta>
          {phones.map((phone) => (
            <PhoneCta key={phone} number={phone} className="px-6 py-3 text-base" />
          ))}
        </RevealOnScroll>

        <RevealOnScroll className="bg-brand-navy-50/40 mt-10 rounded-3xl border border-black/5 p-6 sm:p-10">
          <LeadForm branches={branches} whatsappNumber={whatsappNumber} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
