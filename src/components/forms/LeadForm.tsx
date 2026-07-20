"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Copy, CreditCard, Loader2, Send, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { leadFormSchema, type LeadFormInput, type LeadFormValues } from "@/schemas/lead";
import { postLead, uploadPaymentProof } from "@/lib/endpoints";
import type { Branch, Trip } from "@/types";

const paymentLabels = { cash: "الدفع نقدًا في الفرع", bank_transfer: "تحويل بنكي", instapay: "InstaPay", vodafone_cash: "Vodafone Cash" } as const;
const paymentAccounts = {
  instapay: { label: "حساب InstaPay", value: process.env.NEXT_PUBLIC_INSTAPAY_ACCOUNT ?? "أضف حساب InstaPay في إعدادات الموقع" },
  vodafone_cash: { label: "رقم Vodafone Cash", value: process.env.NEXT_PUBLIC_VODAFONE_CASH_NUMBER ?? "أضف رقم Vodafone Cash في إعدادات الموقع" },
  bank_transfer: { label: `IBAN${process.env.NEXT_PUBLIC_BANK_NAME ? ` - ${process.env.NEXT_PUBLIC_BANK_NAME}` : ""}`, value: process.env.NEXT_PUBLIC_BANK_IBAN ?? "أضف IBAN في إعدادات الموقع" },
} as const;
const fields = [
  ["name", "الاسم بالكامل", "اكتب الاسم كما في الهوية"],
  ["whatsapp", "رقم واتساب", "01xxxxxxxxx"],
  ["phone", "رقم هاتف إضافي", "اختياري"],
  ["email", "البريد الإلكتروني", "name@example.com"],
  ["nationality", "الجنسية", "مثال: مصري"],
  ["identityNumber", "رقم الهوية أو جواز السفر", "الرقم الرسمي"],
] as const;

export function LeadForm({ branches = [], trips = [] }: { branches?: Branch[]; trips?: Trip[] }) {
  const [submitting, setSubmitting] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const { register, control, handleSubmit, reset, watch, formState: { errors } } = useForm<LeadFormInput, unknown, LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { guests: 1 },
  });
  const tripId = watch("tripId");
  const guests = Number(watch("guests") || 1);
  const selectedTrip = trips.find((trip) => trip._id === tripId);
  const paymentMethod = watch("paymentMethod");

  async function onSubmit(values: LeadFormValues) {
    setSubmitting(true);
    try {
      let paymentProof: string | undefined;
      if (values.paymentMethod !== "cash") {
        if (!proofFile) {
          toast.error("ارفع صورة إيصال التحويل أولًا");
          setPaymentDialogOpen(true);
          return;
        }
        paymentProof = await uploadPaymentProof(proofFile);
      }
      await postLead({ ...values, paymentProof });
      toast.success("تم إرسال طلب الحجز بنجاح، ويمكن لفريقنا متابعته من لوحة التحكم");
      reset({ guests: 1 });
      setProofFile(null);
    } catch {
      toast.error("تعذر إرسال الطلب، حاول مرة أخرى");
    } finally { setSubmitting(false); }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="relative grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 pt-16 shadow-sm sm:grid-cols-2 sm:p-6 sm:pt-16 before:absolute before:inset-x-5 before:top-5 before:border-b before:border-slate-100 before:pb-4 before:text-base before:font-black before:text-slate-900 before:content-['01_·_بيانات_المسافر'] sm:before:inset-x-6">
        {fields.map(([name, label, placeholder]) => (
          <div key={name} className="flex flex-col gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Input className="h-11 rounded-xl border-slate-200 bg-slate-50/60 focus-visible:bg-white" id={name} dir={name === "whatsapp" || name === "phone" || name === "email" ? "ltr" : undefined} placeholder={placeholder} {...register(name)} />
            {errors[name] && <p className="text-destructive text-xs">{errors[name]?.message}</p>}
          </div>
        ))}
      </div>

      <div className="relative grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 pt-16 shadow-sm sm:grid-cols-2 sm:p-6 sm:pt-16 before:absolute before:inset-x-5 before:top-5 before:border-b before:border-slate-100 before:pb-4 before:text-base before:font-black before:text-slate-900 before:content-['02_·_تفاصيل_الرحلة'] sm:before:inset-x-6">
        <Field label="الرحلة المطلوبة" error={errors.tripId?.message}>
          <Controller control={control} name="tripId" render={({ field }) => <Select onValueChange={field.onChange} value={field.value}><SelectTrigger className="w-full"><SelectValue placeholder="اختر الرحلة" /></SelectTrigger><SelectContent>{trips.map((trip) => <SelectItem key={trip._id} value={trip._id}>{trip.title}</SelectItem>)}</SelectContent></Select>} />
        </Field>
        <Field label="الفرع">
          <Controller control={control} name="branch" render={({ field }) => <Select onValueChange={field.onChange} value={field.value}><SelectTrigger className="w-full"><SelectValue placeholder="اختر الفرع" /></SelectTrigger><SelectContent>{branches.map((branch) => <SelectItem key={branch._id} value={branch._id}>{branch.name}</SelectItem>)}</SelectContent></Select>} />
        </Field>
        <Field label="عدد الأفراد" error={errors.guests?.message}><Input type="number" min={1} {...register("guests")} /></Field>
        <Field label="نوع الغرفة" error={errors.roomType?.message}>
          <Controller control={control} name="roomType" render={({ field }) => <Select onValueChange={field.onChange} value={field.value}><SelectTrigger className="w-full"><SelectValue placeholder="اختر نوع الغرفة" /></SelectTrigger><SelectContent><SelectItem value="single">فردية</SelectItem><SelectItem value="double">ثنائية</SelectItem><SelectItem value="triple">ثلاثية</SelectItem><SelectItem value="quad">رباعية</SelectItem><SelectItem value="none">بدون غرفة</SelectItem></SelectContent></Select>} />
        </Field>
      </div>

      {selectedTrip && (
        <div className="from-brand-navy-900 to-brand-navy-700 grid overflow-hidden rounded-2xl bg-gradient-to-l text-white shadow-xl shadow-brand-navy-900/15 sm:grid-cols-3 [&>div]:p-5 [&>div:not(:last-child)]:border-white/10 sm:[&>div:not(:last-child)]:border-e">
          <div><p className="text-xs text-white/55">سعر الفرد</p><p className="mt-1 text-xl font-bold">{selectedTrip.price.toLocaleString("ar-EG")} {selectedTrip.currency}</p></div>
          <div><p className="text-xs text-white/55">عدد الأفراد</p><p className="mt-1 flex items-center gap-2 text-xl font-bold"><Users className="text-brand-orange-300 size-5" />{guests}</p></div>
          <div className="bg-brand-orange-500"><p className="text-xs text-white/75">الإجمالي المتوقع</p><p className="mt-1 text-2xl font-black">{(selectedTrip.price * guests).toLocaleString("ar-EG")} {selectedTrip.currency}</p></div>
        </div>
      )}

      <div className="relative flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 pt-16 shadow-sm sm:p-6 sm:pt-16 before:absolute before:inset-x-5 before:top-5 before:border-b before:border-slate-100 before:pb-4 before:text-base before:font-black before:text-slate-900 before:content-['03_·_الدفع_والتأكيد'] sm:before:inset-x-6">
      <Field label="طريقة الدفع" error={errors.paymentMethod?.message}>
        <Controller control={control} name="paymentMethod" render={({ field }) => <Select onValueChange={(value) => { field.onChange(value); setProofFile(null); if (value !== "cash") setPaymentDialogOpen(true); }} value={field.value}><SelectTrigger className="w-full"><CreditCard className="me-2 size-4" /><SelectValue placeholder="اختر طريقة الدفع" /></SelectTrigger><SelectContent>{Object.entries(paymentLabels).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent></Select>} />
      </Field>

      <Field label="ملاحظات إضافية"><Textarea rows={4} placeholder="أي طلبات أو ملاحظات خاصة..." {...register("message")} /></Field>
      </div>
      <Button type="submit" size="lg" disabled={submitting || trips.length === 0} className="from-brand-navy-800 to-brand-navy-600 h-14 gap-2 rounded-xl bg-gradient-to-l text-base font-bold shadow-lg shadow-brand-navy-900/15 hover:opacity-95">
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}تأكيد وإرسال طلب الحجز
      </Button>

      <PaymentDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen} method={paymentMethod} file={proofFile} onFileChange={setProofFile} />
    </form>
  );
}

function PaymentDialog({ open, onOpenChange, method, file, onFileChange }: { open: boolean; onOpenChange: (open: boolean) => void; method?: LeadFormValues["paymentMethod"]; file: File | null; onFileChange: (file: File | null) => void }) {
  if (!method || method === "cash") return null;
  const account = paymentAccounts[method];
  const copy = async () => { await navigator.clipboard.writeText(account.value); toast.success("تم نسخ بيانات التحويل"); };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader><DialogTitle>بيانات {paymentLabels[method]}</DialogTitle><DialogDescription>حوّل المبلغ المطلوب ثم ارفع صورة واضحة لإيصال التحويل.</DialogDescription></DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="bg-brand-navy-50 rounded-xl border p-4">
            <p className="text-muted-foreground text-xs">{account.label}</p>
            {process.env.NEXT_PUBLIC_ACCOUNT_NAME && <p className="mt-1 text-sm">اسم المستفيد: {process.env.NEXT_PUBLIC_ACCOUNT_NAME}</p>}
            <div className="mt-2 flex items-center justify-between gap-3" dir="ltr"><code className="break-all font-bold">{account.value}</code><Button type="button" variant="outline" size="sm" onClick={copy}><Copy className="size-4" /> نسخ</Button></div>
          </div>
          <label className="hover:border-brand-navy-400 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center">
            {file ? <><CheckCircle2 className="size-8 text-green-600" /><span className="font-medium">{file.name}</span><span className="text-muted-foreground text-xs">اضغط لتغيير الصورة</span></> : <><Upload className="size-8 text-brand-navy-600" /><span className="font-medium">ارفع صورة إيصال التحويل</span><span className="text-muted-foreground text-xs">PNG أو JPG بحد أقصى 5MB</span></>}
            <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => onFileChange(event.target.files?.[0] ?? null)} />
          </label>
        </div>
        <DialogFooter><Button type="button" onClick={() => onOpenChange(false)} disabled={!file}>تم التحويل وإرفاق الإيصال</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <div className="flex min-w-0 flex-col gap-2"><Label className="font-bold text-slate-700">{label}</Label>{children}{error && <p className="text-destructive text-xs">{error}</p>}</div>;
}
