import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "كابتن تورز - Captain Tours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: "linear-gradient(135deg, #050f1f 0%, #163b76 55%, #234e92 100%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={220} height={220} alt="" style={{ objectFit: "contain" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, color: "#ffffff" }}>CAPTAIN TOURS</div>
        <div style={{ fontSize: 28, color: "#f4791a", fontWeight: 600 }}>
          Hajj • Umrah • Flights • Tours
        </div>
      </div>
    </div>,
    { ...size }
  );
}
