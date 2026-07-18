import { renderIconResponse } from "@/lib/generateIcon";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default async function Icon() {
  return renderIconResponse(48);
}
