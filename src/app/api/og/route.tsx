import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social card generator. Called with ?eyebrow=&title=&meta= so each page gets a
 * distinct image without a separate file-convention route (see sitemap.xml for
 * why file conventions are avoided in this checkout).
 */
export const runtime = "edge";

const LIMITS = { eyebrow: 60, title: 120, meta: 80 };

function clamp(value: string | null, max: number): string {
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const eyebrow = clamp(params.get("eyebrow"), LIMITS.eyebrow) || site.practice;
  const title =
    clamp(params.get("title"), LIMITS.title) || "Your AI demo, ready for production";
  const meta = clamp(params.get("meta"), LIMITS.meta) || site.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E1116",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#A8C9BC",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: title.length > 60 ? 60 : 74,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#FBFBF9",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #242B35",
            paddingTop: 32,
          }}
        >
          <div style={{ fontSize: 30, color: "#FBFBF9" }}>{site.name}</div>
          <div style={{ fontSize: 24, color: "#A0A6AE" }}>{meta}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
