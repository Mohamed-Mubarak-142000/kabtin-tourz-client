import { CheckCircle2, CreditCard, Headphones, MapPin, ShieldCheck } from "lucide-react";
import { RevealOnScroll } from "@/components/common/RevealOnScroll";
import { LeadForm } from "@/components/forms/LeadForm";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import { PhoneCta } from "@/components/common/PhoneCta";
import { SITE_ADDRESS } from "@/content/site";
import type { Branch, Trip } from "@/types";

interface ContactSectionProps {
  branches: Branch[];
  phones: string[];
  whatsappNumber: string;
  trips: Trip[];
}

const benefits = [
  { icon: ShieldCheck, title: "حجز آمن", text: "بياناتك وإيصال الدفع محفوظان بأمان" },
  { icon: Headphones, title: "متابعة شخصية", text: "فريقنا يتابع طلبك خطوة بخطوة" },
  { icon: CreditCard, title: "طرق دفع مرنة", text: "اختر وسيلة الدفع المناسبة لك" },
];

export function ContactSection({ branches = [], phones = [], whatsappNumber, trips = [] }: ContactSectionProps) {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-24">
      <div className="bg-brand-navy-100/60 absolute -start-32 top-10 size-80 rounded-full blur-3xl" />
      <div className="bg-brand-orange-100/50 absolute -end-32 bottom-10 size-80 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="bg-brand-orange-100 text-brand-orange-700 inline-flex rounded-full px-4 py-1.5 text-sm font-bold">احجز رحلتك الآن</span>
          <h2 className="font-display text-brand-navy-900 mt-4 text-3xl font-black sm:text-5xl">خطوات بسيطة تفصلك عن رحلتك</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">اختر الرحلة، أدخل بيانات المسافرين وحدد طريقة الدفع، وسيتابع فريقنا طلبك حتى التأكيد.</p>
        </div>

        <RevealOnScroll className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="bg-brand-navy-900 relative overflow-hidden p-7 text-white sm:p-9">
            <div className="bg-brand-orange-500/20 absolute -start-20 -top-20 size-56 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-brand-orange-300 text-sm font-bold">كابتن تورز</p>
              <h3 className="mt-3 text-2xl font-black leading-tight">نرتب لك كل تفاصيل الرحلة</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">املأ نموذج الحجز وسيظهر طلبك مباشرة لفريق العمليات لمراجعته والتواصل معك.</p>
              <div className="mt-8 flex flex-col gap-6">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-3">
                    <div className="bg-white/10 flex size-11 shrink-0 items-center justify-center rounded-xl"><Icon className="text-brand-orange-300 size-5" /></div>
                    <div><p className="font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-white/55">{text}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-9 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-sm font-bold"><MapPin className="size-4" />{SITE_ADDRESS}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <WhatsAppCta number={whatsappNumber} className="px-3 py-2 text-xs">واتساب</WhatsAppCta>
                  {phones.slice(0, 1).map((phone) => <PhoneCta key={phone} number={phone} className="border-white/20 px-3 py-2 text-xs text-white" />)}
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-white/50"><CheckCircle2 className="size-4 text-green-400" />لن يتم خصم أي مبلغ تلقائيًا</div>
            </div>
          </aside>
          <div className="p-5 sm:p-8 lg:p-10"><LeadForm branches={branches} trips={trips} /></div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
