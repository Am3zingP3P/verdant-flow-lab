import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement | null;
      setHovering(!!tgt?.closest("a, button, [data-cursor='grow']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ translateX: sx, translateY: sy, willChange: "transform" }}
      className="pointer-events-none fixed left-0 top-0 z-[200] -ml-3 -mt-3"
    >
      <motion.div
        animate={{
          scale: hovering ? 3.2 : 1,
          backgroundColor: hovering ? "rgba(74,124,89,0.85)" : "rgba(28,53,45,0.9)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="h-3 w-3 rounded-full"
      />
    </motion.div>
  );
}
