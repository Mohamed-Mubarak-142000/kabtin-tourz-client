"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { leadFormSchema, type LeadFormInput, type LeadFormValues } from "@/schemas/lead";
import { postLead } from "@/lib/endpoints";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CATEGORY_LABELS } from "@/content/site";
import type { Branch, TripCategory } from "@/types";

const CATEGORIES: TripCategory[] = [
  "hajj",
  "umrah",
  "flights",
  "domestic",
  "international",
  "visa",
];

interface LeadFormProps {
  branches: Branch[];
  whatsappNumber: string;
}

function buildWhatsAppMessage(values: LeadFormValues, branchName?: string) {
  const lines = [
    "أهلاً، معي طلب جديد من موقع كابتن تورز:",
    `الاسم: ${values.name}`,
    `رقم الواتساب: ${values.whatsapp}`,
  ];
  if (values.serviceCategory) {
    lines.push(`الخدمة المطلوبة: ${CATEGORY_LABELS[values.serviceCategory]}`);
  }
  if (branchName) lines.push(`الفرع: ${branchName}`);
  if (values.guests) lines.push(`عدد الأفراد: ${values.guests}`);
  if (values.roomType) lines.push(`نوع الغرفة: ${values.roomType}`);
  if (values.message) lines.push(`ملاحظات: ${values.message}`);
  return lines.join("\n");
}

export function LeadForm({ branches, whatsappNumber }: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormInput, unknown, LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
  });

  async function onSubmit(values: LeadFormValues) {
    setSubmitting(true);
    let leadSaved = true;

    try {
      await postLead(values);
    } catch {
      leadSaved = false;
    }

    const branchName = branches.find((b) => b._id === values.branch)?.name;
    const message = buildWhatsAppMessage(values, branchName);
    window.open(buildWhatsAppUrl(whatsappNumber, message), "_blank", "noopener,noreferrer");

    if (leadSaved) {
      toast.success("تم إرسال طلبك، سنتواصل معك على واتساب قريبًا");
      reset();
    } else {
      toast.info("تم فتح واتساب للتواصل المباشر، فريقنا في انتظارك");
    }

    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">الاسم</Label>
          <Input id="name" placeholder="اسمك بالكامل" {...register("name")} />
          {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="whatsapp">رقم الواتساب</Label>
          <Input id="whatsapp" dir="ltr" placeholder="01xxxxxxxxx" {...register("whatsapp")} />
          {errors.whatsapp && <p className="text-destructive text-xs">{errors.whatsapp.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>الخدمة المطلوبة</Label>
          <Controller
            control={control}
            name="serviceCategory"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {CATEGORY_LABELS[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {branches.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <Label>الفرع</Label>
            <Controller
              control={control}
              name="branch"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الفرع" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="guests">عدد الأفراد (اختياري)</Label>
          <Input id="guests" type="number" min={1} {...register("guests")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="roomType">نوع الغرفة (اختياري)</Label>
          <Input id="roomType" placeholder="مثال: ثلاثية" {...register("roomType")} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">ملاحظات إضافية (اختياري)</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="اكتب استفسارك هنا..."
          {...register("message")}
        />
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="gap-2">
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        إرسال الطلب عبر واتساب
      </Button>
    </form>
  );
}
