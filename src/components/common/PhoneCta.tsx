import { Phone } from "lucide-react";
import { buildTelUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface PhoneCtaProps {
  number: string;
  className?: string;
  children?: React.ReactNode;
}

export function PhoneCta({ number, className, children }: PhoneCtaProps) {
  return (
    <a
      href={buildTelUrl(number)}
      className={cn(
        "border-brand-navy/20 text-brand-navy hover:bg-brand-navy-50 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
        className
      )}
      dir="ltr"
    >
      <Phone className="size-4" />
      {children ?? number}
    </a>
  );
}
