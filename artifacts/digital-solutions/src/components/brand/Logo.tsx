"use client";

/**
 * Digital Solutions – Brand System
 *
 * The "Node" mark:
 *   - Hairline hexagon outline  → precision, structure, systems
 *   - Six hairline spokes       → network connectivity, the node
 *   - Bright emerald center dot → the active point of impact
 *
 * Exports:
 *   LogoMark  – standalone SVG symbol, theme-aware, any size
 *   Logo      – horizontal lockup (symbol + two-line wordmark)
 */

// ─── Hexagon geometry (24 × 24 viewBox, pointy-top) ─────────────────────────

const CX = 12;
const CY = 12;
const R = 9;

/** Returns [x, y] for a vertex at `deg` degrees clockwise from 12 o'clock */
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
      {/* Hairline spokes – center to each vertex */}
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

      {/* Hexagon outline */}
      <polygon
        points={POLY_PTS}
        stroke={ink}
        strokeWidth="0.9"
        strokeOpacity="0.65"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* Soft glow halo behind the node dot */}
      <circle cx={CX} cy={CY} r="3.6" fill={ink} fillOpacity="0.11" />

      {/* The node – bright center dot */}
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
  size = 28,
  theme = "dark",
  showWordmark = true,
  className,
}: LogoProps) {
  const isDark = theme === "dark";
  const primaryColor = isDark ? "#ffffff" : "#020617";
  const subColor = isDark ? "rgba(255,255,255,0.46)" : "rgba(2,6,23,0.42)";

  const mainPx = Math.max(13, Math.round(size * 0.57));
  const subPx = Math.max(8, Math.round(size * 0.34));
  const gap = Math.round(size * 0.4);

  return (
    <div
      className={`flex items-center select-none ${className ?? ""}`}
      style={{ gap }}
    >
      <LogoMark size={size} theme={theme} />

      {showWordmark && (
        <div className="flex flex-col" style={{ lineHeight: 1.2 }}>
          <span
            style={{
              fontSize: mainPx,
              fontWeight: 600,
              color: primaryColor,
              letterSpacing: "0.02em",
              fontFamily: "inherit",
            }}
          >
            Digital Solutions
          </span>
          <span
            style={{
              fontSize: subPx,
              fontWeight: 300,
              color: subColor,
              letterSpacing: "0.06em",
              fontFamily: "inherit",
              marginTop: 2,
            }}
          >
            International Webdesign &amp; SEO
          </span>
        </div>
      )}
    </div>
  );
}
