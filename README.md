# For a Stranger

A small interactive letter. Next.js (App Router) · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000/stranger
npm run build && npm start   # production check
```

## Change the words or music

Everything personal is in **`data/content.ts`**. You shouldn't need to edit a component.

| What | Where |
| --- | --- |
| Every line of text, in every scene | `data/content.ts` |
| The date it all started | `firstMessageDate` / `firstMessageDay` at the top of `content.ts` |
| The phrases quoted from her letter | `herWords` in `content.ts` |
| The final letter | `letter` in `content.ts` (paragraphs starting with `> ` are emphasised) |
| Timeline entries | `memories` in `content.ts` |
| Music | `public/audio/background.mp3`. If it's missing, the music option doesn't appear |

There are no photos: the story is told in words. The timeline is typographic (numerals and a drawn thread), and the shirt, the first message and the envelopes are drawn.

> The handwritten signature is a hand-drawn SVG of "Praveen" (`components/ui/Signature.tsx`).
> Changing `sender` changes the text everywhere else, but not the signature drawing.

## The flow

```
Loader → "Hey Stranger…" → May 6, 2026 (counsellor) → France paperwork → "My counsellor became my friend" →
Timeline → The first surprise ("I cried.") → The shirt + her letter (envelope) → Her words → "you made me cry again" →
Why this website exists → Counsellor → friend → family → "I consider you my sister" → May 6 ──── Today →
Sibling cards → Life is changing → Last envelope → Letter → Fake ending → P.S. → ⭐
```

The story only continues past the shirt once she opens the envelope with her letter. Scrolling is locked during the
intro, the letter and the endings. Each scene sets its own background tone (`data-tone`), and the
page crossfades between them (`lib/tones.ts`).

## Deploy

Push to GitHub and import the repo into Vercel (no settings needed), or run `npx vercel`.
Point the QR code at **`https://<your-domain>/stranger`**. `/` shows the same thing.

The link preview only says "For a Stranger / Something small.", and search engines are told not to index the site.

## Accessibility & performance

- `prefers-reduced-motion`: no smooth scroll, no typing, no parallax or particles. Just gentle fades.
- Everything works with sound off. Music never autoplays.
- Keyboard: every interaction is a real button. The letter and the star modal are proper dialogs.
- Touch scrolling stays native on phones. Film grain only animates on capable devices.
- No images to load. Only fonts are preloaded.
