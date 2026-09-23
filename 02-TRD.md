# Technical Requirement Document (TRD)
## University Campus Portal — Sports, Cultural Events & Hackathons

**Version:** 1.0
**Companion to:** PRD, UI/UX Design Brief, App Flow, brain.md

---

## 1. Architecture Overview

The system is built on the **MERN / Next.js ecosystem**, using a single full-stack JavaScript/TypeScript codebase to minimize context-switching and maximize development velocity.

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Next.js)                     │
│  React 18+ • App Router • Tailwind CSS • SWR/React Query │
└───────────────┬────────────────────────┬─────────────────┘
                │ REST/GraphQL API        │ WebSocket
┌───────────────▼────────────────────────▼─────────────────┐
│                 SERVER (Node.js + Express)                │
│   Auth (JWT/SSO) • REST API • WebSocket Gateway (Socket.io)│
│   Business Logic • Role-Based Access Control                │
└───────────────┬────────────────────────┬─────────────────┘
                │                        │
     ┌──────────▼─────────┐   ┌──────────▼──────────┐
     │   MongoDB (Atlas)   │   │  Cloud Media Storage │
     │  Mongoose ODM       │   │  (S3 / Cloudinary)   │
     └──────────────────────┘   └──────────────────────┘
```

## 2. Tech Stack

### 2.1 Frontend
- **Framework:** Next.js (App Router) with React 18+
- **Language:** TypeScript
- **Styling:** Tailwind CSS + a shared design-token system (see UI/UX Design Brief)
- **State/Data fetching:** React Query (TanStack Query) for server state; Zustand or React Context for lightweight client state
- **Real-time client:** Socket.io-client for live score subscriptions
- **Forms:** React Hook Form + Zod for schema validation
- **Charts/visual data:** Recharts (for stats/leaderboards)

### 2.2 Backend
- **Runtime:** Node.js (LTS)
- **Framework:** Express.js (or Next.js API routes for simpler endpoints, Express for the dedicated API/WebSocket service)
- **Language:** TypeScript
- **Real-time:** Socket.io server (WebSocket gateway) for live score broadcasting and duty check-in updates
- **Auth:** JWT-based sessions, with support for institutional SSO (SAML/OAuth2/OIDC) as a pluggable provider
- **Validation:** Zod / Joi on all API boundaries
- **File handling:** Multer (upload handling) → streamed to cloud storage

### 2.3 Database
- **Primary DB:** MongoDB (MongoDB Atlas for managed hosting)
- **ODM:** Mongoose
- **Key collections:** `users`, `sportsEvents`, `matches`, `playerProfiles`, `medalLedger`, `culturalEvents`, `dutyRosters`, `eventReports`, `hackathons`, `registrations`, `submissions`, `mediaAssets`, `notifications`

### 2.4 Infrastructure & APIs
| Concern | Tool/Service |
|---|---|
| Live score delivery | WebSockets via Socket.io (fallback: polling REST endpoint) |
| Media storage (images/video) | AWS S3 or Cloudinary (video transcoding + CDN delivery) |
| CDN | Cloudflare or provider-native CDN (Vercel Edge / CloudFront) |
| Authentication | JWT + institutional SSO connector (SAML/OIDC) |
| Email/notifications | SendGrid / Resend for transactional email (registration confirmations, duty assignments) |
| Search (historical ledger, player lookup) | MongoDB Atlas Search (or Elasticsearch if scale demands) |
| Containerization | Docker (backend + worker services) |
| Frontend hosting | Vercel (Next.js native hosting, edge functions, image optimization) |
| Backend/WebSocket hosting | Docker container on Render/Railway/AWS ECS (Vercel serverless functions are not ideal for persistent WebSocket connections) |
| CI/CD | GitHub Actions → build, test, deploy to Vercel + container registry |
| Monitoring/Logging | Sentry (errors) + a hosted logging service (e.g., Logtail/Datadog) |
| Environment/config | `.env` per environment, secrets managed via Vercel/host secret manager |

## 3. Data Model (High-Level)

### 3.1 Shared
- **User**: `_id, name, email, role[student|faculty|admin], department, avatarUrl, ssoId`

### 3.2 Sports
- **PlayerProfile**: `userId, department, sport[], type[student|faculty], stats, bio`
- **SportsEvent / Match**: `sport, teams[], schedule, venue, status[upcoming|live|completed], liveScoreState`
- **MedalLedger**: `year, event, sport, winnerType[individual|team], winnerRefs[], medal[gold|silver|bronze], trophyName`

### 3.3 Cultural
- **CulturalEvent**: `title, description, schedule, venue, status`
- **DutyRoster**: `eventId, assignments: [{ userId, role, shiftStart, shiftEnd }]`
- **EventReport**: `eventId, summary, attendanceCount, outcomes, publishedBy, publishedAt`
- **MediaAsset**: `eventId(polymorphic: cultural|hackathon|sports), type[image|video], url, uploadedBy`

### 3.4 Hackathons
- **Hackathon**: `title, description, registrationOpen/Close, eventDates, resultsDate, status`
- **Registration**: `hackathonId, teamName, members[], eligibilityConfirmed, submittedAt, status[pending|confirmed|waitlisted]`
- **Submission**: `hackathonId, teamId, projectTitle, description, repoUrl, mediaAssets[], score, rank`

## 4. API Design Principles
- RESTful resource-based routes namespaced by module: `/api/sports/*`, `/api/cultural/*`, `/api/hackathons/*`, `/api/admin/*`
- WebSocket namespaces mirror REST namespaces: `/ws/sports/live` for score broadcasts, `/ws/cultural/duty` for duty check-in status
- All mutating endpoints protected by RBAC middleware (`student | faculty | admin`)
- Pagination + filtering standard on all list endpoints (department, year, status, etc.)
- Consistent error envelope: `{ success, data, error }`

## 5. Non-Functional Requirements
- **Performance:** Live score updates delivered in <1s from server-side update to client render.
- **Scalability:** WebSocket gateway must handle concurrent connections spiking during marquee matches/results announcements; horizontally scalable via Socket.io Redis adapter.
- **Availability:** 99.5%+ uptime target; graceful degradation to polling if WebSocket connection drops.
- **Security:** Role-based access control on every mutating route; signed/expiring URLs for private media; input validation on all endpoints; rate limiting on registration/auth endpoints.
- **Accessibility:** WCAG 2.1 AA compliance for core flows (schedules, registration forms, live scoreboards).
- **Media limits:** Enforce max upload size and video duration/compression via server-side validation before storage.

## 6. Development Roadmap

The roadmap is structured into three explicit, sequential phases as required.

### **Phase 1: Frontend**
- Set up Next.js + TypeScript + Tailwind project scaffold and design system (tokens, shared components)
- Build static/mock-data-driven UI for all three modules: Sports (scoreboard, schedule, profiles, ledger), Cultural (schedule, gallery, roster views, reports), Hackathons (registration form, timeline, showcase)
- Implement navigation architecture, homepage, and shared layout (see App Flow)
- Build responsive layouts and component library (cards, tables, calendars, forms)
- Mock authentication states (student/faculty/admin views) for UX validation

### **Phase 2: Backend**
- Set up Node.js + Express API, MongoDB schema/models (Mongoose)
- Implement authentication (JWT + SSO integration) and RBAC middleware
- Build REST APIs for all modules (CRUD for events, profiles, rosters, registrations, ledger)
- Implement WebSocket gateway (Socket.io) for live sports scores and duty check-ins
- Integrate cloud media storage (upload, transcode, retrieve) for galleries and showcases
- Connect frontend to live backend, replacing mock data with real API/WebSocket calls
- Write automated tests (unit + integration) for core business logic

### **Phase 3: Deploy**
- Containerize backend/WebSocket service (Docker)
- Set up CI/CD pipeline (GitHub Actions): lint, test, build, deploy
- Deploy frontend to Vercel; deploy backend container to chosen host (Render/Railway/ECS)
- Configure production MongoDB Atlas cluster, CDN, and media storage buckets with proper access policies
- Set up monitoring, logging, and alerting (Sentry, uptime checks)
- Conduct load testing on live-score WebSocket path and hackathon registration surge scenarios
- Final security review (auth flows, RBAC, rate limiting) and go-live

## 7. Open Technical Decisions
- Confirm SSO provider/protocol used by the university (SAML vs OIDC) before Phase 2 auth work begins.
- Decide Cloudinary vs. raw S3 + custom transcoding pipeline for video, based on budget and expected media volume.
- Decide whether Elasticsearch is needed for historical ledger search, or if MongoDB Atlas Search suffices at expected data volume.
