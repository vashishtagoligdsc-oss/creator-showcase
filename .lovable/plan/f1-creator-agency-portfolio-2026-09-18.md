# F1 Creator Agency Portfolio

## Build
- Turn the supplied Ferrari/checkered-flag artwork into a full-screen opening scene with an oversized **F1 CREATORS** title, experimental display typography, layered depth, and scroll-driven race motion.
- Keep the homepage focused: the cinematic opening followed immediately by a scalable creator index using the six handles from the reference.
- Make every creator entry open a dedicated editorial profile with portrait, niche, biography, platform metrics, selected work, social links, and campaign inquiry.

## Motion direction
- Use smooth velocity-aware scrolling, title splitting, pinned scenes, image-mask reveals, parallax layers, staggered creator rows, magnetic cursor treatments, and cinematic page transitions.
- Preserve readability and provide a reduced-motion version automatically.

## CMS readiness
- Store creators in Lovable Cloud with ordering, publishing status, profile copy, metrics, links, and image fields.
- Seed the initial six creators so the first screen is complete, while keeping the data model ready for unlimited additions.

## Technical details
- TanStack Start routes for the homepage and `/creators/:slug` profiles.
- Motion-driven client interactions isolated safely from server rendering.
- Semantic design tokens, responsive layouts, route-specific social metadata, and Vercel-compatible output.
- The supplied image will be used as the main hero artwork; other creator imagery will be generated to match its F1 editorial style.
