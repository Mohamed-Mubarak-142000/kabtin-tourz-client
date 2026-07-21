import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TiktokIcon,
} from "@/components/common/SocialIcons";
import { PhoneCta } from "@/components/common/PhoneCta";
import { WhatsAppCta } from "@/components/common/WhatsAppCta";
import { NAV_LINKS, SITE_ADDRESS, SITE_NAME, FOOTER_LEGAL } from "@/content/site";
import type { SiteSettings } from "@/types";

interface SiteFooterProps {
  settings: SiteSettings | null;
}

export function SiteFooter({ settings }: SiteFooterProps) {
  const socialLinks = settings?.socialLinks ?? {};
  const phones = settings?.phones ?? [];
  const whatsapp = settings?.whatsappNumbers?.[0];

  const socials = [
    { key: "facebook", href: socialLinks.facebook, icon: FacebookIcon },
    { key: "instagram", href: socialLinks.instagram, icon: InstagramIcon },
    { key: "youtube", href: socialLinks.youtube, icon: YoutubeIcon },
    { key: "tiktok", href: socialLinks.tiktok, icon: TiktokIcon },
  ].filter((s) => s.href);

  return (
    <footer className="bg-brand-navy-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt={SITE_NAME}
              width={40}
              height={40}
              className="size-10 rounded bg-white p-0.5"
            />
            <span className="font-display text-lg font-bold">{SITE_NAME}</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            {settings?.about ??
              "شريككم الموثوق لرحلات الحج والعمرة، حجز تذاكر الطيران، والسياحة الداخلية والخارجية."}
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map(({ key, href, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-brand-orange-500 flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors"
                  aria-label={key}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base font-semibold">روابط سريعة</h3>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-base font-semibold">تواصل معنا</h3>
          <div className="flex items-start gap-2 text-sm text-white/70">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>{SITE_ADDRESS}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-white/70">
            <Clock className="mt-0.5 size-4 shrink-0" />
            <span>يوميًا من 9 صباحًا حتى 10 مساءً</span>
          </div>
          <div className="flex flex-col gap-2">
            {phones.map((phone) => (
              <PhoneCta
                key={phone}
                number={phone}
                className="border-white/20 text-white hover:bg-white/10"
              />
            ))}
            {whatsapp && (
              <WhatsAppCta number={whatsapp} className="justify-center">
                واتساب
              </WhatsAppCta>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-right">
          <h3 className="font-display text-base font-semibold">امسح الكود</h3>
          <div className="rounded-xl bg-white p-2">
            <Image
              src="/qr-code.png"
              alt="امسح الكود لزيارة موقع كابتن تورز"
              width={110}
              height={110}
              className="size-28"
            />
          </div>
          <p className="max-w-36 text-xs text-white/60">
            وادخل على موقعنا من موبايلك مباشرة
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        {FOOTER_LEGAL}
      </div>
    </footer>
  );
}
