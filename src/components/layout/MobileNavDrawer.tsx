"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import { PhoneCta } from "@/components/common/PhoneCta";
import { useUiStore } from "@/store/useUiStore";
import { NAV_LINKS, SITE_NAME } from "@/content/site";

interface MobileNavDrawerProps {
  whatsappNumber: string;
  phoneNumber: string;
}

export function MobileNavDrawer({ whatsappNumber, phoneNumber }: MobileNavDrawerProps) {
  const isDrawerOpen = useUiStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useUiStore((state) => state.setDrawerOpen);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent side="right" className="w-4/5 max-w-xs">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Image src="/logo.png" alt={SITE_NAME} width={32} height={32} className="size-8" />
            {SITE_NAME}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="text-brand-navy-700 hover:bg-brand-navy-50 rounded-lg px-3 py-3 text-base font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 p-4">
          <WhatsAppCta number={whatsappNumber} className="justify-center">
            اطلب الآن عبر واتساب
          </WhatsAppCta>
          <PhoneCta number={phoneNumber} className="justify-center" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
