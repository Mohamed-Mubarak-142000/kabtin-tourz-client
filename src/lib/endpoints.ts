import { apiFetch } from "@/lib/api";
import type {
  Branch,
  Faq,
  LeadPayload,
  SiteSettings,
  Testimonial,
  Trip,
  TripCategory,
} from "@/types";

const REVALIDATE_SECONDS = 300;

export function getTrips(category?: TripCategory) {
  const query = category ? `?category=${category}` : "";
  return apiFetch<Trip[]>(`/trips${query}`, { revalidate: REVALIDATE_SECONDS });
}

export function getTripBySlug(slug: string) {
  return apiFetch<Trip>(`/trips/${slug}`, { revalidate: REVALIDATE_SECONDS });
}

export function getBranches() {
  return apiFetch<Branch[]>("/branches", { revalidate: REVALIDATE_SECONDS });
}

export function getTestimonials() {
  return apiFetch<Testimonial[]>("/testimonials", {
    revalidate: REVALIDATE_SECONDS,
  });
}

export function getFaqs() {
  return apiFetch<Faq[]>("/faqs", { revalidate: REVALIDATE_SECONDS });
}

export function getSettings() {
  return apiFetch<SiteSettings>("/settings", { revalidate: REVALIDATE_SECONDS });
}

export function postLead(payload: LeadPayload) {
  return apiFetch<{ _id: string }>("/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
