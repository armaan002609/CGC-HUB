# brain.md — Campus Portal Master Context File

> **Purpose of this file:** A single, high-density reference so any AI coding assistant (or new human engineer) can understand the full scope, architecture, and conventions of this project without scanning the entire codebase. Read this first, always.

---

## 1. What This Project Is

A university **Campus Portal** web app unifying three verticals:
1. **Sports** — live scores, schedules, player profiles, historical medal/trophy ledger
2. **Cultural Events** — schedules, post-event reports, duty rosters, media galleries
3. **Hackathons** — registration, date announcements, post-event showcase (winners, media)

Audiences: **Students**, **Faculty** (coordinators/judges), **Administrators**, and unauthenticated **public visitors** (read-only showcase access).

Full detail lives in: `01-PRD.md` (product), `02-TRD.md` (technical), `03-UIUX-Design-Brief.md` (design), `04-App-Flow.md` (navigation/flows). This file is the compressed index of all four.

## 2. Tech Stack (canonical — do not deviate without updating this file)

- **Frontend:** Next.js (App Router), React 18+, TypeScript, Tailwind CSS, React Query, Socket.io-client
- **Backend:** Node.js, Express.js, TypeScript, Socket.io (WebSocket gateway), JWT + SSO auth
- **Database:** MongoDB (Atlas) + Mongoose ODM
- **Media storage:** S3 or Cloudinary (images + video, CDN-backed)
- **Hosting:** Frontend → Vercel. Backend/WebSocket service → Docker container on Render/Railway/ECS (NOT Vercel serverless — needs persistent connections).
- **CI/CD:** GitHub Actions

## 3. Repository / Module Mental Model

Think of the app as **three parallel verticals sharing one platform spine**:

**Shared spine:**
- Auth & user system (roles: `student | faculty | admin`)
- Notification system
- Media upload/storage pipeline
- Homepage aggregation feed (pulls from all 3 verticals)
- Admin panel (cross-module management)

**Independent verticals** (each has its own routes, models, and API namespace, but reuses the spine):
- `sports/*` — models: `PlayerProfile`, `SportsEvent`/`Match`, `MedalLedger`
- `cultural/*` — models: `CulturalEvent`, `DutyRoster`, `EventReport`, `MediaAsset`
- `hackathons/*` — models: `Hackathon`, `Registration`, `Submission`

`MediaAsset` is polymorphic and shared across Cultural and Hackathon modules (event galleries + project showcases both use it).

## 4. Real-Time Architecture (important — don't rebuild this ad hoc)

- All "live" behavior (sports scores, duty check-in status, live registration counts) flows through **one Socket.io gateway**, namespaced per module: `/ws/sports/live`, `/ws/cultural/duty`, etc.
- Clients always have a REST fallback (poll) if the WebSocket connection fails — never make a feature WebSocket-only.
- When scaling horizontally, use the **Socket.io Redis adapter** — do not assume a single server instance.

## 5. Data Model Cheat Sheet

```
User { name, email, role[student|faculty|admin], department, ssoId }

// Sports
PlayerProfile { userId, department, sport[], type[student|faculty], stats }
SportsEvent/Match { sport, teams[], schedule, venue, status, liveScoreState }
MedalLedger { year, event, sport, winnerRefs[], medal, trophyName }

// Cultural
CulturalEvent { title, schedule, venue, status }
DutyRoster { eventId, assignments: [{ userId, role, shiftStart, shiftEnd }] }
EventReport { eventId, summary, attendanceCount, outcomes }
MediaAsset { parentId, parentType[cultural|hackathon], type[image|video], url }

// Hackathons
Hackathon { title, registrationOpen/Close, eventDates, resultsDate, status }
Registration { hackathonId, teamName, members[], status }
Submission { hackathonId, teamId, projectTitle, repoUrl, mediaAssets[], rank }
```

## 6. Status/State Machines (drives UI conditionals — see App Flow doc §6)

- Sports: `Scheduled → Live → Completed → Archived`
- Cultural: `Announced → Open → In Progress → Completed → Report Published`
- Hackathon: `Announced → Registration Open → Closed → In Progress → Judging → Results Published → Showcased`

Frontend rendering (CTAs, badges, editability) should always key off these status fields — never infer state from dates alone.

## 7. Design System Reference (see UI/UX Brief for full detail)

- Base brand color: `#1E3A8A` (deep blue). Module accents: Sports `#F97316` (orange), Cultural `#C026D3` (magenta), Hackathons `#0D9488` (teal).
- Fonts: Sora/Space Grotesk (headings), Inter (body + tabular numerals for scores/stats).
- Cards are the universal content unit; live elements get subtle micro-animations on update; tables never rely on color alone (pair with icons/labels).

## 8. Navigation Model (see App Flow for full detail)

Three modules are **peer-level**, reachable via a persistent top nav — never nest one module under another. Homepage is a live-aggregated feed pulling "what's happening now" across all three, not a static landing page.

## 9. Roles & Permissions Quick Reference

| Action | Student | Faculty | Admin |
|---|---|---|---|
| View public content | ✅ | ✅ | ✅ |
| Register for hackathon | ✅ | — | — |
| Update live scores | — | ✅ | ✅ |
| Publish event report | — | ✅ | ✅ |
| Manage duty roster | — | ✅ | ✅ |
| Add historical ledger entry | — | — | ✅ |
| User/role management | — | — | ✅ |

## 10. Development Phase Convention

The project roadmap is fixed into exactly three phases — **do not reorder or blend them** when planning work:
1. **Phase 1 — Frontend:** UI scaffold, design system, mock-data-driven screens for all 3 modules.
2. **Phase 2 — Backend:** API, DB models, auth/RBAC, WebSocket gateway, media pipeline; wire frontend to live data.
3. **Phase 3 — Deploy:** Containerize, CI/CD, production infra, load testing, monitoring, go-live.

## 11. Conventions & Guardrails for AI Assistants Working on This Repo

- Always check whether a new feature belongs to the **shared spine** or a **specific vertical** before deciding where code lives.
- Reuse the `MediaAsset` model for any new image/video feature — do not create a parallel upload system.
- Any new "live" feature must go through the existing Socket.io gateway pattern with a REST fallback, not a new bespoke real-time mechanism.
- Respect the RBAC middleware pattern (`student | faculty | admin`) on every new mutating route.
- New UI components should extend the existing card/table/form patterns from the design system (§7) rather than introducing new visual patterns without cause.
- When in doubt about product intent, defer to `01-PRD.md`; when in doubt about technical approach, defer to `02-TRD.md`.

## 12. Document Index

| File | Contents |
|---|---|
| `01-PRD.md` | Product goals, audience, personas, feature scope, success metrics |
| `02-TRD.md` | Full tech stack, data models, API design, infra, 3-phase roadmap |
| `03-UIUX-Design-Brief.md` | Color palette, typography, visual hierarchy, component principles |
| `04-App-Flow.md` | Navigation architecture, user journeys, state machines |
| `05-brain.md` | This file — compressed master context |
