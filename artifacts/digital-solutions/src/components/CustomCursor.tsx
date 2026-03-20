"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setMounted(true);
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("button, a, [role='button'], input, textarea, select, label");
      setHovered(!!el);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  return (
    <>
      {/* Lagging outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-emerald-400/50"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovered ? 42 : 26, height: hovered ? 42 : 26 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      {/* Snappy inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-emerald-400"
        style={{
          x: rawX,
          y: rawY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 8px 2px rgba(16,185,129,0.55)",
        }}
        animate={{ width: hovered ? 8 : 5, height: hovered ? 8 : 5 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </>
  );
}
