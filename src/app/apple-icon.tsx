import { renderIconResponse } from "@/lib/generateIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return renderIconResponse(180);
}
