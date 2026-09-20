import { useEffect, useRef, useState } from "react";
import logoVideo from "@/assets/natursense-logo.mp4.asset.json";
import logoPoster from "@/assets/natursense-logo-poster.jpg.asset.json";

/**
 * Animated Natursense wordmark.
 * - Loops, but pauses whenever it is scrolled out of view (or the tab is hidden).
 * - Source video has a white background (no alpha), so it is blended into the
 *   page: multiply on light backgrounds, inverted + screen in dark mode.
 * - Falls back to a static poster frame when reduced motion is requested or
 *   autoplay is blocked.
 */
export function LogoAnimation({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [staticOnly, setStaticOnly] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setStaticOnly(true);
      return;
    }

    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    let visible = false;

    const sync = () => {
      const v = videoRef.current;
      if (!v) return;
      if (visible && !document.hidden) {
        void v.play().catch(() => {
          /* autoplay blocked — the poster frame stays visible */
        });
      } else {
        v.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.1;
        sync();
      },
      { threshold: [0, 0.1, 0.5] }
    );
    io.observe(el);

    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`natursense-logo-anim relative w-full ${className}`}
      aria-label="Natursense"
      role="img"
    >
      {staticOnly ? (
        <img
          src={logoPoster.url}
          alt="Natursense"
          className="natursense-logo-media h-auto w-full"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <video
          ref={videoRef}
          className="natursense-logo-media h-auto w-full"
          src={logoVideo.url}
          poster={logoPoster.url}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          disablePictureInPicture
          aria-hidden
        />
      )}
    </div>
  );
}
