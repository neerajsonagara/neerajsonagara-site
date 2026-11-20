# Project context for GitHub Copilot

This repo is the personal portfolio website of **Neeraj Sonagara** (Digital Twin & Digital Transformation consultant).
Live site: **https://www.neerajsonagara.com/** (canonical host is `www`).
Repo: `neerajsonagara/neerajsonagara-site` (public). Local copy: `D:\NeerajSonagara-Portfolio`.

## Stack
- Plain static HTML, CSS and JS. **No framework, no build step, no package manager.** Do not add one.
- Pages: `index.html` (home), `experience.html` (career journey), `digital-twin.html` (whitepaper).
- `assets/css/style.css` (all styles, design tokens at the top: navy `#0A1F33`, teal `#14B8A6`), `assets/js/script.js` (all behaviour).
- Fonts: Manrope + Inter from Google Fonts.
- Hero banners: `assets/img/hero/banner-01..06` as `.png` + `.webp`, 1600x670, used in a `<picture>`. The hero container's aspect ratio must stay `1600/670`, otherwise the images get pillarboxed.
- Years of experience is computed live in `script.js` from `CAREER_START = 2008-07-01` (shown as e.g. "18.4+"). Meta tags are static "18+".
- Missing photos use dashed white placeholder boxes with a "Photo needed" message. `assets/img/photo-4.jpg` and `photo-5.jpg` do not exist yet; their 404s are expected and handled by the fallback code.

## Hosting and deployment
- **GitHub Pages**, deployed from branch `main`, folder `/` (root). Pushing to `main` publishes the site within a minute or two.
- Custom domain via the `CNAME` file (`www.neerajsonagara.com`). Do not delete or edit it.
- `.nojekyll` is present so `.well-known/` is served. Do not delete it.
- Domain registrar and DNS: **GoDaddy** (default GoDaddy nameservers).
  - 4 x `A` records for `@` -> `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
  - `CNAME` `www` -> `neerajsonagara.github.io`.
  - Leave the other GoDaddy records alone (NS, `_domainconnect`, `_dmarc`).
- "Enforce HTTPS" in repo Settings -> Pages is turned on once GitHub has issued the certificate.
- Pages is case-sensitive: keep file names and links in matching case.

## Security rules (important)
- GitHub Pages cannot send custom HTTP headers, so security is done with meta tags in the `<head>` of every page:
  - `Content-Security-Policy`: `script-src 'self'` (no inline scripts, no `eval`), styles from self + inline + Google Fonts, fonts from `fonts.gstatic.com`, images from self + `data:`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`.
  - `referrer`: `strict-origin-when-cross-origin`.
- **Because of the CSP, never add inline `<script>` blocks or inline handlers (`onclick=`, `onerror=`, ...).** Put code in `assets/js/script.js` and use `addEventListener`. JSON-LD `<script type="application/ld+json">` is fine.
- If you add a new external service (Google Analytics, a form provider, a CDN, embeds), you must also allow it in the CSP meta tag on all three pages. A commented-out GA4 snippet is in `index.html` (placeholder ID `G-XXXXXXXXXX`).
- `/.well-known/security.txt` exists; its `Expires` date (2027-11-20) must be renewed before then.
- The repo is **public**. Never commit secrets, API keys, private documents or personal files.
- Private/source material stays on the PC only and is git-ignored (see `.gitignore`): `/hero/` (source banners), `/linkedin/`, `/neeraj photo/`, and `*.md` (except this file).

## Conventions
- Commits use the identity `Neeraj Sonagara <noreply@neerajsonagara.com>` so no personal email is exposed in git history.
- SEO: each page has a canonical URL, Open Graph/Twitter tags (absolute `https://www.neerajsonagara.com/...` URLs) and Person/Article JSON-LD. Keep `sitemap.xml` and `robots.txt` in step when adding pages.
- Keep the design graphic-first and concise (the owner wants visuals, not long text). Nav, header and layout must work at phone width.
- After any change, check it in a browser: no console errors other than the two expected photo 404s, fonts load, hero slider rotates, mobile menu opens.
