import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsAppCtaProps {
  number: string;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppCta({ number, text, className, children }: WhatsAppCtaProps) {
  return (
    <a
      href={buildWhatsAppUrl(number, text)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95",
        className
      )}
    >
      <MessageCircle className="size-4" />
      {children ?? "تواصل عبر واتساب"}
    </a>
  );
}
