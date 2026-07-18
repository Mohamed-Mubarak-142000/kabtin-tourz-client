import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function renderIconResponse(size: number, { padded = false } = {}) {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;
  const logoSize = padded ? Math.round(size * 0.68) : size;

  return new ImageResponse(
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        width={logoSize}
        height={logoSize}
        alt=""
        style={{ objectFit: "contain" }}
      />
    </div>,
    { width: size, height: size }
  );
}
