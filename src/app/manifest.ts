import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "كابتن تورز - Captain Tours",
    short_name: "كابتن تورز",
    description: "حج، عمرة، حجز تذاكر طيران، سياحة داخلية وخارجية، وتأشيرات.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#163b76",
    lang: "ar",
    dir: "rtl",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
