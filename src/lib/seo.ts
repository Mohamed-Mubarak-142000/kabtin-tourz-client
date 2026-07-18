import { CONTACT_NUMBERS, SITE_ADDRESS, SITE_NAME, SITE_NAME_EN } from "@/content/site";
import type { SiteSettings } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function buildTravelAgencyJsonLd(settings: SiteSettings | null) {
  const phones = settings?.phones ?? CONTACT_NUMBERS;

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: `${SITE_NAME} - ${SITE_NAME_EN}`,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: phones[0],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_ADDRESS,
      addressCountry: "EG",
    },
    sameAs: Object.values(settings?.socialLinks ?? {}).filter(Boolean),
    aggregateRating: settings?.stats?.googleRating
      ? {
          "@type": "AggregateRating",
          ratingValue: settings.stats.googleRating,
          reviewCount: settings.stats.clients ?? 50,
        }
      : undefined,
  };
}

export function jsonLdScriptProps(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}
