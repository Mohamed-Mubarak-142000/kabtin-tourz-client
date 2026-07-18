import { getBranches, getFaqs, getSettings, getTestimonials, getTrips } from "@/lib/endpoints";
import { FALLBACK_WHATSAPP, CONTACT_NUMBERS } from "@/content/site";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HajjUmrahSpotlight } from "@/components/sections/HajjUmrahSpotlight";
import { GallerySection } from "@/components/sections/GallerySection";
import { FeaturedTrips } from "@/components/sections/FeaturedTrips";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BranchesSection } from "@/components/sections/BranchesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Branch, Faq, SiteSettings, Testimonial, Trip } from "@/types";

export const revalidate = 300;

async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const [trips, branches, testimonials, faqs, settings] = await Promise.all([
    safe<Trip[]>(getTrips(), []),
    safe<Branch[]>(getBranches(), []),
    safe<Testimonial[]>(getTestimonials(), []),
    safe<Faq[]>(getFaqs(), []),
    safe<SiteSettings | null>(getSettings(), null),
  ]);

  const whatsappNumber = settings?.whatsappNumbers?.[0] ?? FALLBACK_WHATSAPP;
  const phones = settings?.phones ?? CONTACT_NUMBERS;

  const hajjUmrahTrips = trips.filter(
    (trip) => (trip.category === "hajj" || trip.category === "umrah") && trip.featured
  );
  const featuredTrips = trips.filter((trip) => trip.featured);

  return (
    <>
      <HeroSection
        title={settings?.hero?.title ?? "كابتن تورز لرحلات الحج والعمرة والسياحة"}
        subtitle={
          settings?.hero?.subtitle ??
          "شريككم الموثوق لتنظيم رحلات الحج والعمرة، حجز تذاكر الطيران، والسياحة الداخلية والخارجية والتأشيرات."
        }
        images={settings?.hero?.images ?? []}
        whatsappNumber={whatsappNumber}
      />
      <StatsStrip
        stats={
          settings?.stats ?? {
            years: 5,
            clients: 3000,
            branchesCount: 1,
            googleRating: 4.9,
          }
        }
      />
      <ServicesGrid whatsappNumber={whatsappNumber} />
      <HajjUmrahSpotlight trips={hajjUmrahTrips} whatsappNumber={whatsappNumber} />
      <GallerySection />
      <FeaturedTrips trips={featuredTrips} whatsappNumber={whatsappNumber} />
      <WhyChooseUs />
      <BranchesSection branches={branches} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <ContactSection branches={branches} phones={phones} whatsappNumber={whatsappNumber} />
    </>
  );
}
