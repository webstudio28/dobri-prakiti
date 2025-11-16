## Dobri Praktiki — Implementation Instructions

Read this first
- Primary workflow and deployment: see `local_docs/github_deployment_instructions.md` (data locations, build, and deploy steps).
- Mobile header behavior and interactions: see `local_docs/mobile_header.md`.

Global rules
- Typography: Use Montserrat everywhere, no italics. Confirm only Montserrat is loaded in `src/_layouts/base.njk`. Remove any other font references if found.
- Alignment: All section titles and help/intro texts are left-aligned across the site.
- Colors: Prefer simple, flat colors (no gradients) throughout, except the homepage bottom CTA which may use a subtle two-blue gradient (darker shades).
- CTA behavior: The primary CTA should open Viber chat with the business number. Provide a phone fallback.
  - Viber deep link: `viber://chat?number=+359886118738`
  - Fallback (as a progressive enhancement or alternative link): `tel:+359886118738`

Header (desktop and mobile)
Target files: `src/_layouts/base.njk` + mobile behavior per `local_docs/mobile_header.md`
- Keep header style consistent sitewide (already unified).
- Desktop menu items (in order): Начало, За нас, Услуги, Контакти, and the CTA button.
- Remove the standalone Viber icon from the header.
- CTA button action: link to Viber using the deep link above. Add a graceful fallback to `tel:` if desired.
- Mobile: Follow `local_docs/mobile_header.md` for toggle, animation, and item list parity. Use the same items and CTA behavior as desktop.
- Font: Ensure header items use Montserrat. No italic variants anywhere.

Homepage
Target file: `src/index.njk`
Required section order:
1) Hero
2) Services (preview cards / links)
3) Защо да изберете нашите услуги (moved here from services page)
4) Testimonials
5) Bottom CTA (allowed two-tone blue gradient)

Details:
- Left-align all section titles and help/intro texts (including the “Защо да изберете нашите услуги” block).
- Services preview: clean, simple cards; flat colors; ample whitespace; Montserrat.
- Testimonials: keep as-is unless styling violates flat color principle; left-align titles, intro text.
- Bottom CTA: allow a simple gradient between two darker blue shades; everything else stays flat colors.

Services data and pages
Data source: `src/_data/services.json`
Content source: `local_docs/services.md` (contains the new services list and the JSON structure for each service)
- Update `services.json` to reflect the new services data from `services.md`. Keep keys consistent across items for clean templating (e.g., `id`, `title`, `slug`, `summary`, `body`, optional `faq`, optional `details`).
- Single service pages: one page per service (clean and minimal).
  - Template: use or adapt `src/uslugi/service.njk` to a minimalist design (no unnecessary ornamentation, flat colors, left-aligned headings, Montserrat).
  - Routing: ensure each service gets its own permalink (e.g., `/uslugi/<slug>.html`).
  - Page elements: title, short summary/intro, main body content, optional “FAQ” and “Technical details” if present in data. Avoid gradients and heavy UI; keep it tidy and readable.
- Services index page (`src/uslugi.njk`):
  - Remove or relocate the “Защо да изберете нашите услуги” section (moved to homepage).
  - Present a clean grid of available services with a short summary and a primary link to each detail page.

Move “Защо да изберете нашите услуги”
From: `src/uslugi.njk`
To: `src/index.njk` (after Services and before Testimonials)
- Keep content left-aligned. Use flat colors. Keep Montserrat.
- Remove the original block from the services page to avoid duplication.

Industries section (Homepage)
Target file: `src/index.njk`
Requirements:
- Title and help text left-aligned. Use flat colors.
- Remove emoji icons; list text only.
- Simple, clean layout: a responsive grid of small, rounded “badge-like” boxes with a subtle white/near-white background and light border.
- Industries list (exact labels):
  - Плодове и зеленчуци
  - Консервирани и готови храни (без месо/мляко)
  - Захарни изделия и десерти
  - Подправки и сухи смеси
  - Напитки (без млечни съставки)
  - Семена, ядки и растителни масла
  - Пакетиране и търговия с храни

Design system notes
- Use spacing for clarity; avoid heavy borders/shadows. Prefer light, subtle borders or soft shadows only when necessary.
- Buttons: flat background colors, clear hover state, Montserrat, medium/bold weights only as needed.
- Inputs (if any): keep default clean styles; avoid gradient and heavy decoration.

Links and actions
- Header CTA: `viber://chat?number=+359886118738` (primary), with optional `tel:+359886118738` fallback.
- Services cards: link to the corresponding service detail page.
- Footer contacts: ensure email and tel links are correct and consistent.

Acceptance criteria
- Typography: Only Montserrat is referenced and used across all pages; no italics visible.
- Header: Same (home-like) header on all pages; Viber icon removed; menu contains exactly Начало, За нас, Услуги, Контакти + CTA to Viber.
- Homepage order: Hero → Services → Защо да изберете нашите услуги → Testimonials → Bottom CTA.
- Industries: emoji-free text boxes; simple, clean badge-like cards; left-aligned section title and help text.
- Services: `services.json` updated with new data; services index lists all services clearly; each service has a clean detail page using the shared template; URLs are consistent and friendly.
- Colors: Flat colors throughout, except the bottom CTA (blue gradient) on the homepage.
- Build: `npm run build` succeeds; `_site/` outputs expected pages and permalinks.

Build and verify
```bash
npm run dev        # during development
npm run build      # production build
```
Post-build manual QA:
- Check header and typography on: `/`, `/uslugi.html`, `/za-nas.html`, `/kontakt.html`, each service page.
- Confirm services list matches `local_docs/services.md`, and pages render cleanly.
- Verify homepage section order and industries design.
- Confirm header CTA opens Viber (and tel fallback works on devices without Viber).

Notes and next steps
- When updating services, always change `src/_data/services.json`; the pages should re-generate from data.
- Keep all new one-off debug or scratch files out of the repo. Use the designated ignored directories for any local-only experiments.

