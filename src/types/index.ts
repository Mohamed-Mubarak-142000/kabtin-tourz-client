export type TripCategory = "hajj" | "umrah" | "flights" | "domestic" | "international" | "visa";
export type TripType = "religious" | "tourism";

export interface Trip {
  _id: string;
  title: string;
  slug: string;
  category: TripCategory;
  tripType: TripType;
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
  phone?: string;
  email?: string;
  nationality: string;
  identityNumber: string;
  tripId: string;
  branch?: string;
  guests: number;
  roomType: string;
  paymentMethod: "cash" | "bank_transfer" | "instapay" | "vodafone_cash";
  paymentProof?: string;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  meta: Record<string, unknown>;
}
