"use client";

/**
 * HECARO – Brand System
 *
 * LogoMark  – standalone SVG symbol (used in HeroSection pulsing glow)
 * Logo      – image lockup (HECARO PNG + "International Web Design & SEO" subline)
 */

// ─── Hexagon geometry (24 × 24 viewBox, pointy-top) ─────────────────────────
// (kept for HeroSection LogoMark usage)

const CX = 12;
const CY = 12;
const R = 9;

function pt(deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [
    parseFloat((CX + R * Math.cos(rad)).toFixed(4)),
    parseFloat((CY + R * Math.sin(rad)).toFixed(4)),
  ];
}

const VERTS = [0, 60, 120, 180, 240, 300].map(pt);
const POLY_PTS = VERTS.map(([x, y]) => `${x},${y}`).join(" ");

// ─── Components ─────────────────────────────────────────────────────────────

interface LogoMarkProps {
  size?: number;
  theme?: "dark" | "light";
  className?: string;
}

export function LogoMark({ size = 28, theme = "dark", className }: LogoMarkProps) {
  const ink = theme === "dark" ? "#10b981" : "#059669";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ flexShrink: 0 }}
    >
      {VERTS.map(([x, y], i) => (
        <line
          key={i}
          x1={CX}
          y1={CY}
          x2={x}
          y2={y}
          stroke={ink}
          strokeWidth="0.5"
          strokeOpacity="0.28"
        />
      ))}

      <polygon
        points={POLY_PTS}
        stroke={ink}
        strokeWidth="0.9"
        strokeOpacity="0.65"
        strokeLinejoin="miter"
        fill="none"
      />

      <circle cx={CX} cy={CY} r="3.6" fill={ink} fillOpacity="0.11" />
      <circle cx={CX} cy={CY} r="1.8" fill={ink} />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  theme?: "dark" | "light";
  showWordmark?: boolean;
  className?: string;
}

export function Logo({
  size = 32,
  theme = "dark",
  showWordmark = true,
  className,
}: LogoProps) {
  const subColor = theme === "dark" ? "rgba(255,255,255,0.46)" : "rgba(2,6,23,0.42)";
  const subPx = Math.max(8, Math.round(size * 0.27));
  const imgFilter = theme === "dark" ? "brightness(0) invert(1)" : "none";

  return (
    <div
      className={`flex items-center select-none ${className ?? ""}`}
      style={{ gap: Math.round(size * 0.4) }}
    >
      <img
        src="/logo-nobg.png"
        alt="HECARO"
        style={{
          height: size,
          width: "auto",
          display: "block",
          flexShrink: 0,
          filter: imgFilter,
        }}
      />
      {showWordmark && (
        <span
          style={{
            fontSize: subPx,
            fontWeight: 300,
            color: subColor,
            letterSpacing: "0.06em",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          International Web Design &amp; SEO
        </span>
      )}
    </div>
  );
}
