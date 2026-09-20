# Animated logo placement and implementation

## Short answer

A looping MP4 in the fixed header is usually a bad idea: it runs on every page, on every scroll, and can drain battery and cause jank on phones. I would keep the current static wordmark in the header and place the animated logo in the **Hero section** as the main visual moment.

## Recommended placement

Use the animated logo in the **Hero**, not the header.

- The header keeps the existing static `SproutMark + natursense.` wordmark for navigation recognition.
- The Hero already has a decorative seed visual on the right side. That SVG can be replaced or complemented by the MP4 logo animation.
- Hero animations are seen immediately on load, then the user scrolls past them. This is much cheaper than a header video that never leaves the viewport.
- We can make it play once on load, or loop gently while visible, and pause it when it scrolls out of view.

## Alternative placements if the Hero is not right

1. **Loading/reveal only** — the animation plays once as a page-load intro, then dissolves into the static wordmark.
2. **Footer signature** — a small, once-playing loop at the bottom as a brand signature; low visibility but also low cost.
3. **Header with heavy safeguards** — possible, but only if the file is very small (under ~300 KB), muted, `playsInline`, paused on `prefers-reduced-motion`, and paused when the header is not visible. I do not recommend this as the default.

## Technical approach

- Store the MP4 in the project as `src/assets/logo-animation.mp4` (or in `public/` if it must be referenced by direct URL).
- Render it with a standard `<video>` element:
  - `autoPlay muted playsInline loop={onceOrLoop}`
  - `preload="metadata"` or `auto` depending on file size
  - `poster` fallback image for slower connections
  - `disableRemotePlayback` to avoid unwanted casting UI
- Gate mobile behavior:
  - On small screens, either show the video only above a width threshold or use a lightweight static fallback.
  - Respect `prefers-reduced-motion` by showing a static frame and pausing the video.
- If the animation has transparency, WebM with alpha may be needed instead of MP4 (browser support is limited; MP4 does not support alpha). If it is not transparent, MP4 is fine.
- Use an `IntersectionObserver` or the existing scroll setup to pause the video when it is off-screen.

## What I need before implementing

1. The MP4 file (or a preview link) so I can check size, duration, dimensions, and whether it has an alpha channel.
2. Your preference:
   - Play once on load, then hold on the final frame?
   - Loop gently while in view?
   - Loop always, but pause when scrolled away?
3. Should it replace the current Hero seed visual entirely, or sit next to it?
4. Is the animation on a transparent background, or does it have its own background color?

Once you upload the file and confirm the behavior, I will implement it in the Hero, wire up reduced-motion and mobile fallbacks, and verify it on desktop and phone via preview.