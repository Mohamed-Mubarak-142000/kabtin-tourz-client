import type { TripCategory } from "@/types";

export const SITE_NAME = "كابتن تورز";
export const SITE_NAME_EN = "Captain Tours";
export const SITE_ADDRESS = "جنزور، المنوفية";
export const SITE_LOCALE = "ar_EG";

export const FALLBACK_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_FALLBACK ?? "01069569024";

export const CONTACT_NUMBERS = ["01069569024", "01003736779", "01287783858"];

export const NAV_LINKS = [
  { href: "#home", label: "الرئيسية" },
  { href: "#services", label: "الخدمات" },
  { href: "#offers", label: "العروض" },
  { href: "#gallery", label: "من رحلاتنا" },
  { href: "#branches", label: "المناطق" },
  { href: "#testimonials", label: "تقييمات" },
  { href: "#contact", label: "اتصل بنا" },
] as const;

export const CATEGORY_LABELS: Record<TripCategory, string> = {
  hajj: "الحج",
  umrah: "العمرة",
  flights: "حجز تذاكر الطيران",
  domestic: "سياحة داخلية",
  international: "سياحة خارجية",
  visa: "التأشيرات",
};

export const CATEGORY_DESCRIPTIONS: Record<TripCategory, string> = {
  hajj: "برامج حج متكاملة بإشراف مرشدين متخصصين وسكن قريب من الحرم.",
  umrah: "رحلات عمرة اقتصادية وفاخرة على مدار العام لجميع الفئات.",
  flights: "حجز تذاكر طيران داخلية وخارجية بأفضل الأسعار وأسرع خدمة.",
  domestic: "برامج سياحية داخل مصر لأجمل الوجهات بأسعار مناسبة للعائلات.",
  international: "رحلات سياحية خارجية منظمة بالكامل لأشهر الوجهات العالمية.",
  visa: "استخراج وإنهاء إجراءات التأشيرات بسهولة وسرعة واحترافية.",
};

export const WHY_CHOOSE_US = [
  {
    icon: "ShieldCheck",
    title: "ثقة وأمان",
    description: "شركة موثقة بسجلات رسمية وخبرة طويلة في تنظيم الرحلات الروحانية والسياحية.",
  },
  {
    icon: "BedDouble",
    title: "سكن فاخر",
    description: "فنادق مختارة بعناية قريبة من الحرمين الشريفين وأفضل الوجهات السياحية.",
  },
  {
    icon: "Bus",
    title: "مواصلات مريحة",
    description: "أسطول نقل حديث ومريح يواكب برنامج الرحلة من الألف إلى الياء.",
  },
  {
    icon: "UserCheck",
    title: "مرشدون متخصصون",
    description: "فريق مرشدين على دراية كاملة بالمناسك والبرامج السياحية لخدمتكم أفضل خدمة.",
  },
  {
    icon: "Headset",
    title: "خدمة عملاء 24/7",
    description: "فريق دعم متواجد على مدار الساعة للرد على استفساراتكم عبر الهاتف والواتساب.",
  },
] as const;

export const GALLERY_ITEMS = [
  {
    type: "video",
    src: "/gallery/video-1.mp4",
    alt: "فيديو من رحلة حج نظمتها كابتن تورز",
    caption: "شاهدوا لحظات من رحلتنا",
  },
  {
    type: "image",
    src: "/gallery/photo-1.jpg",
    alt: "استعداد الحجاج بالإحرام قبل التوجه إلى مكة المكرمة",
    caption: "استعداد الإحرام قبل الرحلة",
  },
  {
    type: "image",
    src: "/gallery/photo-2.jpg",
    alt: "مجموعة من عملاء كابتن تورز في طريقهم لأداء مناسك الحج",
    caption: "انطلاق المجموعة لأداء المناسك",
  },
  {
    type: "image",
    src: "/gallery/photo-3.jpg",
    alt: "حجاج كابتن تورز داخل المسجد الحرام",
    caption: "داخل المسجد الحرام الشريف",
  },
  {
    type: "image",
    src: "/gallery/photo-4.jpg",
    alt: "الوقوف بجبل الرحمة في عرفات ضمن برنامج الحج",
    caption: "الوقوف بعرفات - جبل الرحمة",
  },
  {
    type: "image",
    src: "/gallery/photo-5.jpg",
    alt: "لحظة جماعية لحجاج كابتن تورز عند جبل الرحمة",
    caption: "لحظات لا تُنسى بعرفات",
  },
] as const;

export const FOOTER_LEGAL = `© ${new Date().getFullYear().toString()} كابتن تورز - جميع الحقوق محفوظة`;
