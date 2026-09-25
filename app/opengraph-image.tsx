import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

// next/og (Satori) não lê CSS/tokens do projeto — por isso, e só aqui, os
// valores abaixo são os mesmos hex de app/globals.css (--background, --primary,
// --signal, --foreground, --subtle), copiados manualmente.
const BACKGROUND = "#070a12";
const PRIMARY = "#4d7cff";
const SIGNAL = "#6cc0ff";
const FOREGROUND = "#ecf2ff";
const SUBTLE = "#7f8aa3";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.ogTitle;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          backgroundColor: BACKGROUND,
          color: FOREGROUND,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="60" height="60" viewBox="0 0 36 36">
            <path d="M4 4h20v7H11v14h14v-5h-7v-6h14v18H4z" fill={PRIMARY} />
            <path d="M25 4h7v7h-7z" fill={SIGNAL} />
          </svg>
          <span style={{ fontSize: 42, fontWeight: 600, letterSpacing: "-0.03em" }}>
            GaspLab
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 56,
            maxWidth: 980,
            fontSize: 58,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ marginRight: 16 }}>{hero.titleBefore}</span>
          <span style={{ marginRight: 16, color: SIGNAL }}>{hero.titleHighlight}</span>
          <span>{hero.titleAfter}</span>
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: SUBTLE }}>
          {hero.eyebrow}
        </div>
      </div>
    ),
    { ...size },
  );
}
