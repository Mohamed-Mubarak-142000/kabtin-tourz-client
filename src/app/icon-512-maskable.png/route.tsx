import { renderIconResponse } from "@/lib/generateIcon";

export const dynamic = "force-static";

export async function GET() {
  return renderIconResponse(512, { padded: true });
}
