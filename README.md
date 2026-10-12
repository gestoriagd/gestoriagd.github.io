# GD Gestoría® — Website

One-page website for **GD Gestoría®** (Lic. Graciela Duré, Mandataria Registral Automotor Matriculada).
Static site (HTML + CSS + vanilla JS), no build step and no backend. All contact goes through WhatsApp.

## Structure

```
index.html          All sections from the brief
css/styles.css      Brand styles (navy / gold / white)
js/main.js          WhatsApp links, mobile menu, footer year
assets/             Logo and Instagram QR
scripts/check.mjs   Automated checks
```

## Run locally

Open `index.html` in the browser, or serve the folder:

```bash
npx serve .
```

## Checks

```bash
node scripts/check.mjs
```

## Common edits

| What | Where |
|---|---|
| WhatsApp number / default message | `js/main.js` (`WHATSAPP_NUMBER`, `BASE_MESSAGE`) and the `wa.me` hrefs in `index.html` |
| Message for each request type | `data-wa="..."` attribute on each button/card in `index.html` |
| FAQ answers | `<details>` blocks in the `#faq` section of `index.html` |
| Colors | CSS variables at the top of `css/styles.css` |
| Remove the ® symbol | Delete every `<sup class="reg">®</sup>` in `index.html` and the `®` in `BASE_MESSAGE` |

> The ® symbol must only be used if the trademark has actually been granted.

## Deploy to GitHub Pages

1. Create a repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site will be published at `https://<user>.github.io/<repo>/`. A custom domain can be configured in the same screen.
