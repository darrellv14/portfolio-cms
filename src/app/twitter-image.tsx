import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Darrell Valentino - Full-Stack Web Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation (same as opengraph-image)
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        {/* Main Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              lineHeight: 1.2,
            }}
          >
            Darrell Valentino
          </div>

          <div
            style={{
              fontSize: 40,
              opacity: 0.9,
              fontWeight: "normal",
            }}
          >
            Full-Stack Web Developer
          </div>

          {/* Tech Stack */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
              fontSize: 28,
              opacity: 0.85,
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 20px",
                borderRadius: "8px",
              }}
            >
              React
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 20px",
                borderRadius: "8px",
              }}
            >
              Next.js
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "8px 20px",
                borderRadius: "8px",
              }}
            >
              TypeScript
            </span>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 30,
              marginTop: "40px",
              opacity: 0.8,
            }}
          >
            darrellvalentino.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
