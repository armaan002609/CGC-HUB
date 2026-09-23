# UI/UX Design Brief
## University Campus Portal — Sports, Cultural Events & Hackathons

**Version:** 1.0

---

## 1. Design Philosophy

The portal should feel **energetic, credible, and current** — like a modern sports/media app crossed with a university's official record book. It must handle two very different content modes gracefully:

- **Celebratory/visual** content (galleries, showcases, live scores) → bold, media-forward, dynamic
- **Data-dense/administrative** content (rosters, registration tables, ledgers) → calm, structured, scannable

The visual language should unify all three verticals (Sports, Cultural, Hackathons) under one consistent system, while allowing each module a subtle accent identity so users always know "where" they are.

## 2. Color Palette

A modern, energetic-but-professional palette anchored by a deep institutional base with vivid accent colors per module.

### Core (Shared)
| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#0F172A` | Primary text, headers |
| `--color-surface` | `#FFFFFF` | Page background (light mode) |
| `--color-surface-alt` | `#F4F6F9` | Section backgrounds, cards |
| `--color-border` | `#E2E8F0` | Dividers, card borders |
| `--color-muted` | `#64748B` | Secondary text |
| `--color-brand` | `#1E3A8A` | Primary brand blue (nav, primary buttons) |
| `--color-brand-dark` | `#0B1F4E` | Dark mode base / footer |

### Module Accents
| Module | Accent | Hex | Rationale |
|---|---|---|---|
| Sports | Energy Orange | `#F97316` | Urgency, live energy, scoreboards |
| Cultural Events | Vivid Magenta | `#C026D3` | Creative, celebratory, arts |
| Hackathons | Electric Teal | `#0D9488` | Tech, innovation, build-energy |

### Status Colors
| Status | Hex |
|---|---|
| Live / Active | `#DC2626` (with pulsing indicator) |
| Success / Confirmed | `#16A34A` |
| Pending / Warning | `#D97706` |
| Info | `#2563EB` |

### Dark Mode
Base flips to `--color-brand-dark` background with `#E2E8F0` text; accent colors are retained but slightly desaturated (~10%) to reduce eye strain against dark surfaces.

## 3. Typography

- **Display/Headings:** A geometric sans-serif with strong presence — e.g., **Sora** or **Space Grotesk**. Used for hero sections, event titles, scoreboard numerals.
- **Body/UI:** A highly legible, neutral sans — e.g., **Inter**. Used for all body copy, tables, forms, navigation.
- **Numerals (scores, stats, countdowns):** Use tabular/monospaced figures (Inter's tabular-nums feature) so scoreboards and stat tables align cleanly and don't jitter on live updates.

### Scale (example)
| Level | Size | Weight | Use |
|---|---|---|---|
| Display | 40–56px | 700 | Hero banners, live match headline |
| H1 | 32px | 700 | Page titles |
| H2 | 24px | 600 | Section headers |
| H3 | 18px | 600 | Card titles |
| Body | 16px | 400 | Paragraphs, descriptions |
| Small/Caption | 13px | 500 | Metadata, timestamps, labels |

## 4. Visual Hierarchy for Data-Heavy Interfaces

### 4.1 Live Scoreboards
- Score numerals are the single largest, boldest element on the card — everything else (team names, period/time, venue) is secondary.
- A **live status pill** (pulsing red dot + "LIVE") anchors top-left of every active match card.
- Use color sparingly to indicate momentum (e.g., leading team's score in brand accent, trailing team muted) — never rely on color alone; pair with bold weight.
- Auto-updating elements get a brief micro-animation (subtle flash/scale) on change so users perceive the "live-ness" without a jarring layout shift.

### 4.2 Duty Rosters
- Table-first layout: Role | Assigned To | Shift Time | Status (checked-in/pending)
- Group by shift block or by role — whichever the coordinator is scanning for — with sticky section headers.
- Status uses small colored chips, not full-row color fills, to keep dense tables readable.
- Faculty/admin roster view supports inline editing; student view is read-only with "your assignment" visually highlighted (accent border/background).

### 4.3 Registration Forms (Hackathons)
- Single-column, progressive disclosure: team info → member details → eligibility confirmation → review/submit.
- Persistent progress indicator (stepper) at top.
- Inline validation (not just on submit) with clear, specific error states.
- Confirmation screen doubles as a shareable summary card (team name, track, submission ID).

### 4.4 Historical Ledgers / Archives
- Default to a filterable, sortable table (year, sport/event, winner, medal type) with a card/gallery toggle for a more celebratory browsing mode.
- Medal type indicated with both icon (🥇🥈🥉ー rendered as styled badges, not emoji in production UI) and color, never color alone.
- Empty/sparse historical years shown honestly (e.g., "Records not yet digitized for 2019") rather than hidden.

## 5. Component Principles
- **Cards** are the primary content unit across all modules (match card, event card, project card) — consistent padding, radius (`--radius-md: 12px`), and shadow scale (`sm/md/lg`) throughout.
- **Media** (gallery images/videos) uses a consistent aspect-ratio grid (masonry for galleries, 16:9 for highlight video thumbnails) with lazy loading.
- **Navigation** uses a persistent top bar (module switcher: Sports / Cultural / Hackathons / Home) plus contextual secondary nav (tabs) within each module.
- **Motion** is purposeful and minimal: score changes, live indicators, and step transitions animate; static content does not.

## 6. Accessibility & Responsiveness
- Minimum contrast ratio 4.5:1 for body text, 3:1 for large text/numerals, verified against both light and dark surfaces.
- All interactive elements have visible focus states; live score updates are also announced via `aria-live="polite"` regions for screen reader users.
- Mobile-first breakpoints: tables collapse to stacked card views below 640px; scoreboards remain single-glance readable on small screens by dropping secondary stats first.

## 7. Tone of Voice (UI Copy)
- Confident and concise: "Registrations close in 2 days" not "Please note that registrations will be closing soon."
- Celebratory where earned: winner/showcase pages use warmer, more expressive microcopy than administrative screens (rosters, forms), which stay neutral and instructional.
