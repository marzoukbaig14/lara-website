# Sarah's Portfolio — Plan

Dark-academia, law / justice / human-rights single-page portfolio with a scroll-driven
justice-scale animation. Vite + React + TypeScript, Framer Motion, Formspree, deployed on Vercel.

## Where it runs

**Locally on your Mac, in `~/code/sarah-portfolio`.** No Codespaces or remote session is needed:
Node 22 and npm are already installed, and `gh` is logged in. Claude does the building here;
you only do the steps that need your accounts or Sarah's information (list at the bottom).

## Decisions (already made)

| Area | Choice | Why |
|---|---|---|
| Framework | Vite + React + TS (scaffolded) | Static `dist/`, matches the handoff |
| Routing | None — one page, anchor links (`#about`, `#skills`, …) | Single scroll page; no `vercel.json` rewrite needed |
| Animation | Framer Motion (`useScroll`, `useTransform`, `useReducedMotion`) | Same as Marzouk's My-Portfolio; no GSAP unless pinning gets hard |
| Smooth scroll | CSS `scroll-behavior: smooth` first; Lenis only if it feels stiff | Keep deps lean |
| Contact form | Formspree via `@formspree/react` (`useForm`, `ValidationError`) | Exactly what My-Portfolio's `Contact.tsx` uses |
| Content | Everything Sarah-specific lives in `src/content.ts` | Edit one file to update the site |
| Hosting | Vercel Hobby (free) | Matches Marzouk's setup; Cloudflare Pages is the fallback |

## Design direction

- **Palette:** near-black ink `#14110f`, aged parchment `#e9dfc8`, oxblood `#6b1e22`, brass `#b08d57`, candle glow `#f3c77a` (subtle radial vignette).
- **Type:** Cormorant Garamond (display), EB Garamond (body), small-caps for labels, roman numerals for section numbers (I. About, II. Skills…). Google Fonts.
- **Texture:** faint paper-grain noise overlay (inline SVG filter, no image download), thin brass rule lines, columned section frames.
- **Motifs beyond the brief:** marble column dividers between sections, a Latin maxim per section (*Fiat justitia ruat caelum*, *Audi alteram partem*…), a wax-seal "Send" button, footnote-style project links (¹ ² ³), a candle flicker on the hero glow.
- **Philosopher statues:** public-domain bust photos (Cicero, Solon, Justinian, Montesquieu, Aristotle) from the Met Open Access / Wikimedia Commons (CC0 / PD), as low-opacity parallax figures at section edges.

## Build phases

1. **Scaffold** ✅ — Vite app, deps installed, demo removed, folders + stub sections in place.
2. **Design system + skeleton** — `index.css` tokens, fonts, grain, sticky `Nav` with active-section highlight (IntersectionObserver), all sections laid out with placeholder copy.
3. **ScaleScene (centerpiece)** — inline SVG scale: base/column, beam group, two chain+plate groups. A tall sticky wrapper (~250vh); `scrollYProgress` drives (a) zoom 1 → ~2.4 into the scale, (b) beam rotation that follows scroll direction (velocity-based tilt via `useVelocity` + `useSpring`, so scrolling down lowers the right plate, up lowers the left), plates counter-rotate to hang level. Name/title/CTA fade out as you zoom in.
4. **Reveals** — `Section` wrapper with fade/rise on enter. About: gavel SVG shakes, drops, hits the sound block ("boom" — a screen shake + dust ring), then photo + bio stagger in.
5. **Content** — fill `src/content.ts` with Sarah's real bio, skills, projects, photo; add statue images with credits.
6. **Contact** — Formspree form: name / email / message, client validation, sending / success / error states.
7. **Polish** — `prefers-reduced-motion` (static scale at rest, no zoom, gavel already down), mobile layout, meta/OG tags, favicon (scale glyph), Lighthouse ≥ 95.
8. **Deploy** — GitHub repo → Vercel import → (optional) custom domain.

## What Claude does vs. what you do

**Claude (in this session):** phases 2–7 end to end, sourcing and crediting public-domain statue images,
creating the GitHub repo and pushing (once you say which account), and verifying the build in the browser.

**You (needs your accounts / Sarah's info):**

1. **Sarah's content** — send any of these whenever ready (paste into chat is fine):
   - Full name as it should appear, and her title/tagline (e.g. "Law Student · Human Rights Advocate")
   - Short bio (3–6 sentences) and a portrait photo (JPG/PNG, ideally ≥ 1200px)
   - Skills (grouped if possible: legal research, languages, tools…)
   - Projects / experience: title, 1–2 line description, link(s)
   - Optional: CV/résumé PDF, LinkedIn, email to show
2. **Formspree form for Sarah** — sign in at formspree.io with the inbox Sarah wants messages in → New Form → copy the ID (the part after `/f/`, like `mkgwgova`) → put it in `.env.local` as `VITE_FORMSPREE_ID=...` (or paste it in chat; it is a public ID, not a secret).
3. **GitHub** — tell Claude which account owns the repo (yours, `marzoukbaig14`, or Sarah's). Claude creates and pushes it with `gh`.
4. **Vercel** — vercel.com → Add New → Project → import the repo → add `VITE_FORMSPREE_ID` under Environment Variables → Deploy. (Vite is auto-detected: `npm run build`, output `dist`.)
5. **Domain (optional, ~$10–15/yr)** — buy at Cloudflare/Porkbun/Namecheap → Vercel Settings → Domains → follow the DNS instructions.

## Run it

```bash
cd ~/code/sarah-portfolio
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
npm run preview  # serve the build
```
