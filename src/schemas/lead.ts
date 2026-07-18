import { z } from "zod";

const CATEGORIES = ["hajj", "umrah", "flights", "domestic", "international", "visa"] as const;

export const leadFormSchema = z.object({
  name: z.string().trim().min(2, "الاسم مطلوب"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^(?:\+?20)?01[0125]\d{8}$/, "رقم واتساب غير صالح"),
  serviceCategory: z.enum(CATEGORIES).optional(),
  branch: z.string().optional(),
  guests: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.coerce.number().int().positive().optional()
  ),
  roomType: z.string().optional(),
  message: z.string().max(500).optional(),
});

export type LeadFormInput = z.input<typeof leadFormSchema>;
export type LeadFormValues = z.output<typeof leadFormSchema>;
