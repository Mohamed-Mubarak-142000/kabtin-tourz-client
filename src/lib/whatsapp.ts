export function normalizeEgyptNumber(n: string) {
  return n.replace(/^0/, "").replace(/\D/g, "");
}

export function buildWhatsAppUrl(n: string, text?: string) {
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/20${normalizeEgyptNumber(n)}${query}`;
}

export function buildTelUrl(n: string) {
  return `tel:${n}`;
}
