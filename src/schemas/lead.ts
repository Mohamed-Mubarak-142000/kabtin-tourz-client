import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().trim().min(3, "الاسم بالكامل مطلوب"),
  whatsapp: z.string().trim().regex(/^(?:\+?20)?01[0125]\d{8}$/, "رقم واتساب غير صالح"),
  phone: z.string().trim().optional(),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").optional().or(z.literal("")),
  nationality: z.string().trim().min(2, "الجنسية مطلوبة"),
  identityNumber: z.string().trim().min(5, "رقم الهوية أو جواز السفر مطلوب"),
  tripId: z.string().min(1, "اختر الرحلة"),
  branch: z.string().optional(),
  guests: z.coerce.number().int().min(1, "عدد الأفراد مطلوب"),
  roomType: z.string().min(1, "اختر نوع الغرفة"),
  paymentMethod: z.enum(["cash", "bank_transfer", "instapay", "vodafone_cash"], { message: "اختر طريقة الدفع" }),
  message: z.string().max(500).optional(),
});

export type LeadFormInput = z.input<typeof leadFormSchema>;
export type LeadFormValues = z.output<typeof leadFormSchema>;
