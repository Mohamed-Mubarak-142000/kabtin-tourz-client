import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyWhatsAppButton } from "@/components/layout/StickyWhatsAppButton";
import { ServiceWorkerRegistrar } from "@/components/common/ServiceWorkerRegistrar";
import { getSettings } from "@/lib/endpoints";
import { FALLBACK_WHATSAPP, CONTACT_NUMBERS, SITE_LOCALE } from "@/content/site";
import { buildTravelAgencyJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { cairo, alexandria } from "@/lib/fonts";
import type { SiteSettings } from "@/types";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = "كابتن تورز | Captain Tours - حج وعمرة وسياحة";
const DESCRIPTION =
  "كابتن تورز لتنظيم رحلات الحج والعمرة، حجز تذاكر الطيران، السياحة الداخلية والخارجية، والتأشيرات - جنزور، المنوفية.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["حج", "عمرة", "كابتن تورز", "سياحة", "تذاكر طيران", "تأشيرات", "جنزور", "المنوفية"],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "كابتن تورز",
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

async function getSettingsSafely(): Promise<SiteSettings | null> {
  try {
    return await getSettings();
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettingsSafely();
  const whatsappNumber = settings?.whatsappNumbers?.[0] ?? FALLBACK_WHATSAPP;
  const phoneNumber = settings?.phones?.[0] ?? CONTACT_NUMBERS[0];

  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${cairo.variable} ${alexandria.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <script {...jsonLdScriptProps(buildTravelAgencyJsonLd(settings))} />
        <SiteHeader whatsappNumber={whatsappNumber} />
        <MobileNavDrawer whatsappNumber={whatsappNumber} phoneNumber={phoneNumber} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
        <StickyWhatsAppButton number={whatsappNumber} />
        <ServiceWorkerRegistrar />
        <Toaster position="top-center" richColors dir="rtl" />
      </body>
    </html>
  );
}
