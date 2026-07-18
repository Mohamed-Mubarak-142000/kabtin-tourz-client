export type TripCategory = "hajj" | "umrah" | "flights" | "domestic" | "international" | "visa";

export interface Trip {
  _id: string;
  title: string;
  slug: string;
  category: TripCategory;
  price: number;
  currency: string;
  duration?: string;
  hotelInfo?: string;
  includes: string[];
  images: string[];
  location?: {
    lat?: number;
    lng?: number;
    address?: string;
  };
  description?: string;
  featured: boolean;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Branch {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
  googleRating?: number;
  mapLink?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  text: string;
  rating: number;
  source: "facebook" | "google" | "other";
  avatar?: string;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export interface SiteSettings {
  hero: {
    title: string;
    subtitle: string;
    images: string[];
  };
  phones: string[];
  whatsappNumbers: string[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  stats: {
    years: number;
    clients: number;
    branchesCount: number;
    googleRating: number;
  };
  about?: string;
}

export interface LeadPayload {
  name: string;
  whatsapp: string;
  serviceCategory?: TripCategory;
  branch?: string;
  guests?: number;
  roomType?: string;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  meta: Record<string, unknown>;
}
