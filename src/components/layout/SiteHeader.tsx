"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import { useUiStore } from "@/store/useUiStore";
import { NAV_LINKS, SITE_NAME } from "@/content/site";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  whatsappNumber: string;
}

export function SiteHeader({ whatsappNumber }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const setDrawerOpen = useUiStore((state) => state.setDrawerOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={44}
            height={44}
            priority
            className="size-11"
          />
          <span className="font-display text-brand-navy-800 hidden text-lg font-bold sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-navy-700 hover:text-brand-orange-500 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppCta number={whatsappNumber} className="hidden sm:inline-flex">
            اطلب الآن
          </WhatsAppCta>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="فتح القائمة"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
