# ✈️ TravelMate AI — Intelligent Travel Companion

An AI-powered full-stack travel application with intelligent trip planning, real-time translation, discovery, payment advice, SOS emergency features, and a creator studio.

---

## 📁 Project Structure

```
travelmate-ai/
├── index.html                   ← Main HTML entry point
│
├── css/
│   ├── variables.css            ← Design tokens & CSS custom properties
│   ├── base.css                 ← CSS reset & body styles
│   ├── components.css           ← Reusable component styles (cards, buttons, inputs)
│   ├── animations.css           ← Keyframe animations & utility classes
│   ├── layout.css               ← Page layout, grids, topbar, nav
│   ├── pages.css                ← Page-specific styles
│   └── responsive.css           ← Mobile & tablet breakpoints
│
└── js/
    ├── app.js                   ← App controller & page router
    │
    ├── utils/
    │   ├── api.js               ← Claude AI API (streaming)
    │   ├── icons.js             ← SVG icon library
    │   └── helpers.js           ← DOM helpers, toast, clipboard, storage
    │
    ├── components/
    │   ├── nav.js               ← Bottom navigation bar
    │   └── topbar.js            ← Top header bar
    │
    └── pages/
        ├── landing.js           ← Landing / marketing page
        ├── auth.js              ← Login & signup
        ├── dashboard.js         ← Dashboard with stats & quick actions
        ├── planner.js           ← AI Trip Planner
        ├── translator.js        ← AI Real-time Translator
        ├── discover.js          ← AI Place Discovery
        ├── payment.js           ← Payment & Currency Advisor
        ├── creator.js           ← Creator Studio (captions, hashtags, reels)
        ├── safety.js            ← Safety Center & SOS
        └── profile.js           ← User profile & preferences
```

---

## 🚀 Getting Started

### Option 1 — Open Directly (Simplest)
Just open `index.html` in any modern browser. No build step required.

### Option 2 — Local Server (Recommended)
```bash
# Python 3
cd travelmate-ai
python3 -m http.server 3000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:3000
```
Then open: `http://localhost:3000`

---

## 🔑 Demo Credentials
- **Email:** `demo@travelmate.ai`
- **Password:** `demo123`

(Pre-filled on the login screen — just click Sign In)

---

## 🤖 AI Features (Powered by Claude)

All AI features use **streaming responses** via the Anthropic Claude API:

| Feature | What AI Does |
|---|---|
| Trip Planner | Generates day-by-day itineraries with budget breakdown |
| Translator | Translates text with pronunciation & cultural notes |
| Discover | Curates personalized place recommendations |
| Payment Advisor | Explains local payment norms, scams, price benchmarks |
| Creator Studio | Generates captions, hashtags, reel concepts, golden hour guides |
| Safety Advisor | Provides destination-specific safety briefings |

The AI API is called from `js/utils/api.js` using the `API.callClaude(prompt, onChunk)` function.

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS (ES6 modules pattern), HTML5, CSS3 |
| Fonts | Syne (display) + DM Sans (body) via Google Fonts |
| AI | Anthropic Claude Sonnet (streaming API) |
| Storage | localStorage (user session persistence) |
| Icons | Custom inline SVG library |

**No build tools, no frameworks, no dependencies** — pure HTML/CSS/JS.

---

## 📱 Pages

1. **Landing** — Hero, feature showcase, CTAs
2. **Auth** — Login / Signup with demo credentials
3. **Dashboard** — Stats, quick actions, recent activity
4. **Trip Planner** — AI itinerary with budget, days, interests
5. **Translator** — Live translation + traveler phrases mode
6. **Discover** — AI spot recommendations by category
7. **Payment Advisor** — Currency, UPI, cash vs card, scam warnings
8. **Creator Studio** — Captions, hashtags, reel ideas, golden hour, shoot spots
9. **Safety Center** — SOS button, emergency numbers, AI safety guide, checklist
10. **Profile** — Editable preferences, stats, logout

---

## 🔧 Customization

### Change AI Model
In `js/utils/api.js`, update the model string:
```js
model: 'claude-sonnet-4-20250514',
```

### Add a New Page
1. Create `js/pages/mypage.js` with a `const MyPage = (() => { function render() {...} return {render}; })();`
2. Add `<script src="js/pages/mypage.js"></script>` to `index.html`
3. Add nav item in `js/components/nav.js`
4. Add case in the router in `js/app.js`

### Modify Design Tokens
Edit `css/variables.css` — all colors, spacing, fonts, and effects are defined there.

---

## 🌐 Deployment

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel
cd travelmate-ai
vercel
```

### Netlify
Drag and drop the `travelmate-ai/` folder to [netlify.com/drop](https://netlify.com/drop)

### GitHub Pages
Push to a GitHub repo → Settings → Pages → Deploy from branch

---

## 📊 Production Roadmap

For a production version, add:

- **Backend:** Node.js + Express or FastAPI
- **Database:** PostgreSQL (trips, translations, favorites)
- **Auth:** JWT tokens + bcrypt password hashing
- **Maps:** Leaflet.js or Google Maps API integration
- **Push Notifications:** Web Push API for SOS alerts
- **PWA:** Service Worker for offline support
- **Rate Limiting:** Redis-based API rate limiter

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

Built with ❤️ and ✈️ for travelers everywhere.
