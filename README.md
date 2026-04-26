# InMarket Dashboard

## Project Structure

```
inmarket/
├── index.html              ← HTML shell: login, sidebar, topbar, containers
├── vercel.json             ← Vercel routing config
├── css/
│   └── style.css           ← All styles (219 lines)
├── js/
│   ├── config.js           ← EmailJS keys, API endpoints
│   ├── icons.js            ← SVG icons, MINI_FROG, REFERENCES data array
│   ├── loader.js           ← Animated frog loading screen
│   ├── signatures.js       ← Signature request/verify/render + EmailJS calls
│   ├── resources.js        ← Wizard engine, Patterns, Boiling Frog content
│   ├── roadmap.js          ← NAV_CONFIG, data helpers, roadmap table/kanban/ROI
│   ├── references.js       ← Reference page rendering
│   ├── wip.js              ← Work in Progress page
│   ├── capacity.js         ← Team Capacity page (placeholder, will grow)
│   ├── onboarding.js       ← PAGES map, onboarding tour steps + rendering
│   └── app.js              ← Nav, routing, data loading, events, login/logout
└── api/
    ├── data.js             ← Vercel serverless → Google Sheet
    └── signatures.js       ← Vercel serverless → Vercel KV storage
```

## Load Order (matters!)

The `<script>` tags in `index.html` are ordered by dependency:

1. **Chart.js** (external library)
2. **config.js** — API keys, no dependencies
3. **icons.js** — SVG strings + REFERENCES array, no dependencies
4. **loader.js** — loading screen, no dependencies
5. **signatures.js** — depends on config.js (EmailJS)
6. **resources.js** — wizard engine + content, depends on icons.js (PAGES ref)
7. **roadmap.js** — depends on icons.js (NAV_CONFIG, REFERENCES)
8. **references.js** — depends on icons.js (REFERENCES), signatures.js
9. **wip.js** — depends on signatures.js
10. **capacity.js** — standalone
11. **onboarding.js** — depends on all renderers (PAGES map), icons.js (MINI_FROG)
12. **app.js** — depends on everything above, wires it all together

## Services

| Service     | Purpose                        |
|-------------|--------------------------------|
| Vercel      | Hosting + serverless API       |
| GitHub      | Source control                 |
| Google Apps Script | Data source for roadmap + capacity |
| EmailJS     | Signature verification emails  |
| Vercel KV   | Signature persistence          |
| Cloudinary  | Reference photos               |

## Iterating with Claude

To make changes, upload only the file(s) you want to modify:

- **Change styles?** → upload `css/style.css`
- **Change onboarding steps?** → upload `js/onboarding.js`
- **Add new page?** → upload `js/app.js` + the new page file
- **Change loader phrases?** → upload `js/loader.js`
- **Change credentials?** → upload `js/app.js` + `index.html`
- **Change references?** → upload `js/icons.js` (data) + `js/references.js` (render)

## Deploy

```bash
git add .
git commit -m "description"
git push origin main
# Vercel auto-deploys from GitHub
```

## Credentials

- **Email:** condoadmin@inmarket.ai
- **Password:** Helix

