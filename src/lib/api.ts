import type { ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  revalidate?: number;
}

export async function apiFetch<T>(
  path: string,
  { revalidate, ...init }: RequestOptions = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  const body = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !body?.success) {
    throw new ApiError(body?.error ?? "حدث خطأ غير متوقع", res.status);
  }

  return body.data as T;
}
