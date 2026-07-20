import { apiFetch } from "@/lib/api";
import { API_URL } from "@/lib/api";
import type {
  Branch,
  Faq,
  LeadPayload,
  SiteSettings,
  Testimonial,
  Trip,
  TripCategory,
  TripType,
} from "@/types";

const REVALIDATE_SECONDS = 300;

export function getTrips(filters: { category?: TripCategory; tripType?: TripType } = {}) {
  const query = new URLSearchParams();
  if (filters.category) query.set("category", filters.category);
  if (filters.tripType) query.set("tripType", filters.tripType);

  const queryString = query.size > 0 ? `?${query.toString()}` : "";
  return apiFetch<Trip[]>(`/trips${queryString}`, { revalidate: REVALIDATE_SECONDS });
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

export function postBookingFeedback(payload: { leadId: string; text: string; rating: number }) {
  return apiFetch<Testimonial>("/testimonials/feedback", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function uploadPaymentProof(file: File) {
  const formData = new FormData();
  formData.append("images", file);
  const response = await fetch(`${API_URL}/leads/payment-proof`, { method: "POST", body: formData });
  const body = await response.json();
  if (!response.ok || !body?.success || !body.data?.urls?.[0]) throw new Error(body?.error ?? "Upload failed");
  return body.data.urls[0] as string;
}
