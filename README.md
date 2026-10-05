# Petals & Pearl — Handmade Crystal Jewellery, Karachi

A responsive one-page boutique website for Petals & Pearl.

## Technology stack
- **HTML5** — semantic page structure (`index.html`: header, nav, main, section, article, form, footer)
- **CSS3** — custom properties, gradients, keyframe animations (ticker, reveal, fades)
- **JavaScript** — all interactions (`js/script.js`), no frameworks
- **Tailwind CSS** — utility classes for layout, spacing, colours and responsive design

Also used: Google Fonts (Cormorant Garamond + Montserrat), Google Maps Embed, Unsplash-style demo imagery, Git/GitHub, Netlify/Vercel, Chrome DevTools.

## Project structure
```
/
├── index.html              Whole page (all sections)
├── css/styles.css          Compiled Tailwind CSS + custom CSS3 (the file the site uses)
├── css/tailwind-input.css  Tailwind source: colour theme, fonts, custom animations
├── js/script.js            Navbar, mobile menu, slideshow, filters, carousel, FAQ, form, animations
├── images/                 Hero slides, product photos, logo, welcome post
├── assets/favicon.png      Browser tab icon
├── netlify.toml / vercel.json  Deployment settings
└── README.md
```

## How to run
No install needed. Either double-click `index.html`, or (recommended) run a local server:
- VS Code: install "Live Server" → right-click `index.html` → *Open with Live Server*
- or in a terminal: `python3 -m http.server 8000` then open http://localhost:8000

## JavaScript features
Sticky navbar • mobile menu (Esc closes) • smooth scrolling • announcement ticker (CSS animation, pauses on hover) • hero slideshow (crossfade every 4.5 s) • product category filtering • testimonial carousel • FAQ accordion • contact form validation with thank-you message • scroll reveal animations.

## How to edit content
- **Text, prices, product names:** edit directly in `index.html` (prices currently read `From PKR ___`).
- **WhatsApp number:** search `index.html` for the Instagram link on order buttons and replace with `https://wa.me/92XXXXXXXXXX`.
- **Testimonials:** edit the `TESTIMONIALS` list at the top of the carousel code in `js/script.js` (and the first one in `index.html`).
- **Colours/fonts:** CSS variables near the top of `css/styles.css` (`--emerald-deep`, `--gold`, `--ivory`, ...).

## How to replace images
Put your photo in `images/` and keep the same file name (e.g. `images/hero-1.jpg`), or change the `src="images/..."` in `index.html`. Square photos work best for products; wide (16:9) photos for the hero.

## Tailwind CSS
`css/styles.css` is already compiled, so the site works with no build step. To rebuild after adding new Tailwind classes:
```
npm install tailwindcss @tailwindcss/cli tw-animate-css
npx @tailwindcss/cli -i css/tailwind-input.css -o css/styles.css
```

## Deploy
- **Netlify:** drag-and-drop the project folder at https://app.netlify.com/drop, or connect the GitHub repo (no build command, publish directory `.`).
- **Vercel:** import the GitHub repo at https://vercel.com/new, framework preset "Other", no build command.
- **GitHub:** `git init && git add . && git commit -m "Petals & Pearl site" && git push` to a new repository.

## Testing (Chrome DevTools)
1. Open the site → press F12.
2. **Responsive:** click the device toolbar (Ctrl+Shift+M) and check iPhone SE (375px), iPad (768px) and desktop (1280px+). There should be no sideways scrolling.
3. **Console:** confirm no red errors.
4. **Interactions:** test menu, filters, carousel, FAQ and form (submit empty to see validation).
5. **Lighthouse:** run an audit for performance and accessibility.

## Notes
Prices, WhatsApp number, testimonials and some photos are placeholders/demo content. The contact form validates in the browser only and does not send email; visitors are asked to message on Instagram. Map shows Karachi, Pakistan (no street address).
