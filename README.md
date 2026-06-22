# portbybss

Personal portfolio website of **Benny Septiawan Salim** — a Full-Stack Software Engineer based in Indonesia.

Built with Angular 20, standalone architecture, and zero CSS frameworks. Minimalist black & white aesthetic with an interactive canvas background, collapsible sidebar, and fully data-driven content.

---

## 🔗 Live

> https://portbybss.netlify.app

---

## 👤 About the Owner

| | |
|---|---|
| **Name** | Benny Septiawan Salim |
| **Alias** | bennysptwn |
| **Born** | Jambi, 24 September 2001 |
| **Based** | Indonesia |
| **Education** | Bachelor of Informatics — Universitas Multimedia Nusantara |
| **Focus** | Software Development, AI Enthusiasat |
| **Email** | bennysptwn@gmail.com |
| **Contact** | bennysptwn@gmail.com |

**Socials**
- GitHub: [@bennysptwn](https://github.com/bennysptwn)
- LinkedIn: [@benny-salim](https://linkedin.com/in/benny-salim)
- Instagram: [@bennysptwn_](https://instagram.com/bennysptwn_)

---

## 🗂️ Sections

The portfolio is a single-page application with five route-based sections:

| Route | Section | Description |
|---|---|---|
| `/home` | Home | Personal intro, metadata grid, social links, avatar |
| `/about` | About | Bio, working fields (interactive cards), quotes |
| `/experiences` | Experiences | Accordion-style work history, newest first |
| `/work-samples` | Work Samples | Project list with category tabs (Personal / Open Client / Official) |
| `/services` | Services | Manifesto, availability dashboard, working hours, booking, project interests, contact |

---

## 💼 Work History

| # | Position | Company | Period |
|---|---|---|---|
| 01 | Senior Software Engineer | Nexus Technologies | Mar 2022 – Present |
| 02 | Software Engineer | Brightwave Solutions | Jun 2020 – Feb 2022 |
| 03 | Junior Front-End Developer | CodeCraft Agency | Jan 2019 – May 2020 |
| 04 | Software Engineering Intern | DevStart | Jun 2018 – Dec 2018 |

---

## 🛠️ Working Fields

| Field | Status |
|---|---|
| Software Engineer — Generalist (Full Stack) | ● Experienced |
| AI Engineering (LLM Integration & AI / ML Apps) | ○ Learning |

---

## 📦 Selected Projects

| Title | Role | Category | Stack |
|---|---|---|---|
| portbybss | Designer & Developer | Personal | Angular, TypeScript, CSS |

---

## ⚙️ Tech Stack

### Framework & Language
- **Angular 20** — standalone architecture, no NgModules
- **TypeScript 5.8** — strict mode, no implicit `any`

### State & Reactivity
- **Angular Signals** — `signal()`, `computed()`, `effect()` for all local state
- No RxJS for component state (only where Angular internals require it)

### Styling
- **Plain CSS only** — no Tailwind, Bootstrap, or any CSS framework
- CSS custom properties for theming, spacing, typography, and animation tokens
- Dark / light theme via `body.theme-dark` / `body.theme-light` class switching

### Animation
- **GSAP 3** — entrance animations, staggered reveals, interactive transitions
- CSS `@keyframes` — typewriter effect, fade-in, background grid

### Background
- Custom `<canvas>` component — animated particle network with mouse repulsion + scrolling code snippets

### Testing
- **Karma + Jasmine** — unit tests
- **fast-check** — property-based testing

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       └── theme.service.ts        ← Signal-based dark/light theme
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navigation/             ← Sidebar (desktop) + bottom bar (mobile)
│   │   │   └── bg-canvas/              ← Animated canvas background
│   │   ├── models/
│   │   │   └── index.ts                ← All TypeScript interfaces & types
│   │   └── constants/
│   │       └── portfolio-data.ts       ← All content — edit here to update the site
│   ├── layouts/
│   │   └── shell/                      ← Layout wrapper (nav + router-outlet)
│   ├── features/
│   │   ├── home/
│   │   ├── about/
│   │   ├── experiences/
│   │   ├── work-samples/
│   │   └── services/
│   ├── app.routes.ts                   ← Lazy-loaded feature routes
│   └── app.config.ts                   ← Application providers
└── styles.css                          ← Global tokens, reset, animations
```


---

## ✏️ Customizing Content

All portfolio content lives in a single file:

```
src/app/shared/constants/portfolio-data.ts
```

Update `PERSONAL_INFO`, `EXPERIENCES`, `PROJECTS`, `WORKING_FIELDS`, `SERVICE_CONFIG`, etc. — no component templates need to change.

---

## 📐 Design Decisions

- **Data-driven** — every section reads from typed constants. Updating the portfolio means editing one file.
- **No CSS framework** — full control over every pixel, no specificity battles, no unused styles.
- **Collapsible sidebar** — desktop sidebar can be minimized to icon-only mode. State is local (not persisted).
- **Theme persistence** — selected theme is saved to `localStorage` under key `portbybss-theme`.
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation, visible focus indicators, 4.5:1 contrast ratio.
- **SSR-safe** — `ThemeService` guards all `localStorage` and `document` access with `isPlatformBrowser()`.

---

## 📄 License

This project is personal and not licensed for reuse. Feel free to use it as inspiration, but please don't deploy it as-is with someone else's content.
