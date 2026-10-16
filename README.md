# Natursense Bloom

Role: Elite Creative Technologist, Principal UX/UI Designer, and Senior Frontend Architect specializing in high-end, premium Next.js/React architectures.

Context & Objective:

You are tasked with engineering a complete, comprehensive, and immersive specification and code framework for a premium €5,000+ brand website for "Natursense" (https://www.facebook.com/profile.php?id=61576519508451), an ultra-premium organic sprout and microgreen seed brand operating in the cross-border markets of Hungary and Serbia. 

The website must feel "alive," deeply organic, yet scientifically clean. It takes heavy inspiration from industry legends like Perfect Day (https://perfectday.com/)—utilizing smooth fluid motions, narrative-driven scrolling, and absolute aesthetic minimalism. 

Aesthetic & Palette Identity:

- Backgrounds: Warm Cream / Ivory (#FDFBF7), Soft Sand (#F5F2EB).

- Core Brand Colors: Deep Moss Green (#1C352D), Living Sprout Green (#4A7C59).

- Accents & Typography: Pure White (#FFFFFF), Deep Obsidian for high-contrast text (#111111).

- Vibe: Premium bio, high-end wellness, clean, breathing, deeply creative, and editorial.

Advanced Technical & Repo Architecture Requirements (€5,000+ Standards):

1. Fluid Motion & Lifecycle Animations: Integrate GSAP (GreenSock) and ScrollTrigger logic paired with a smooth-scrollbar implementation (inspired by Lenis or Asscroll GitHub repos) to achieve buttery-smooth 60fps scrolling.

2. Micro-interactions: Framer Motion for organic, spring-physics-based UI transitions, custom cursor behaviors that morph when hovering over product seeds, and SVG path morphing for organic "growing" visual elements.

3. Bilingual Engine (HU/SRB): A bulletproof i18n architecture utilizing standard internationalization best practices (akin to next-i18next / i18next repo standards). The language switcher between Hungarian (HU) and Serbian (SRB - Latin) must trigger a fluid page-state transition without breaking layout layout metrics or line-heights.

4. Component Architecture: Strict Tailwind CSS combined with Radix UI / Shadcn primitives, customized for fluid fluid typography (clamp functions) and micro-spacing.

---

TASK INSTRUCTIONS:

Analyze the "Natursense" brand deeply. Generate a multi-section, production-ready blueprint including layout design, visual design tokens, interactive feature specifications, and high-fidelity code components. Avoid generic templates. Provide professional, production-ready, highly aesthetic code and structural breakdowns.

### SECTION 1: Brand Concept & Copywriting Matrix (Bilingual) - USE modern catch phrases, sound charming, and HUMAN, and CONNECTABLE

Provide the high-end editorial copy in BOTH Hungarian and Serbian.

- Hero Claim: Capture the essence of "Life bursting from a seed" (A természet legkoncentráltabb energiája / Najkoncentrovanija energija prirode).

- Value Proposition: Highlighting bio-availability, home farming, and raw vitality.

### SECTION 2: Complete Design Tokens & TailWind Configuration

Provide a fully extended `tailwind.config.js` with the Natursense organic palette, fluid typography scaling (using CSS clamp for responsive premium layout), and custom animations mimicking organic growth.

### SECTION 3: The Immersive Architecture (Next.js 14/15 App Router Code)

Generate fully coded, highly polished React components with Tailwind and Framer Motion / GSAP triggers.

1. `Layout.tsx` with Bilingual Context Provider: A state-managed language context switching perfectly between HU and SRB.

2. `InteractiveNavbar.tsx`: A minimalist, premium header with a custom animated language switcher that smoothly slides active states between "HU" and "SRB" with a spring physics engine.

3. `HeroSection.tsx`: An immersive hero section mimicking Perfect Day. Include:

   - Floating organic geometric text layouts.

   - An interactive canvas placeholder or SVG morphing container that simulates a seed absorbing nutrients or growing on mouse move.

   - Large, premium typography with split-text animation wrappers.

4. `InteractiveGrowthExplorer.tsx` (The €5,000 Feature): A creative, highly interactive widget where users can click or drag through stages of a sprout's life (Seed -> Germination -> Microgreen). Each stage reveals dynamic product pairings (e.g., Alfalfa, Broccoli, Radish seeds) with custom micro-interactions.

### SECTION 4: Production-Grade Code Output Specifications

- Ensure all components are modular, typesafe (TypeScript), and visually stunning.

- Use elegant layouts with ample whitespace, asymmetric grids, and sleek borders (`border-moss-green/10`).

- Do not use placeholders like `// write code here`. Write out the full creative logic.

Let’s build an unforgettable web experience for Natursense.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c6ddf4c3-9e99-45a2-99a4-84917303bd28).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
