"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest(
        "button, a, [role='button'], input, textarea, select, label, [data-halo]"
      );
      setHovered(!!el);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: 96,
        height: 96,
        background:
          "radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.06) 50%, transparent 70%)",
        filter: "blur(12px)",
      }}
      animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    />
  );
}
