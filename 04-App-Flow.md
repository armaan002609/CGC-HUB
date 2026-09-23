# App Flow Document
## University Campus Portal — Sports, Cultural Events & Hackathons

**Version:** 1.0

---

## 1. Top-Level Navigation Architecture

```
Homepage (/)
├── Sports (/sports)
│   ├── Live Scores (/sports/live)
│   ├── Schedule (/sports/schedule)
│   ├── Player Profiles (/sports/players)
│   │   └── Player Detail (/sports/players/[id])
│   └── Medal & Trophy Ledger (/sports/ledger)
│
├── Cultural Events (/cultural)
│   ├── Upcoming Events (/cultural/schedule)
│   │   └── Event Detail (/cultural/events/[id])
│   ├── Duty Rosters (/cultural/rosters)
│   │   └── Roster Detail (/cultural/rosters/[eventId])
│   ├── Post-Event Reports (/cultural/reports/[eventId])
│   └── Media Gallery (/cultural/gallery)
│       └── Event Gallery (/cultural/gallery/[eventId])
│
├── Hackathons (/hackathons)
│   ├── Active/Upcoming (/hackathons/upcoming)
│   │   └── Hackathon Detail + Register (/hackathons/[id])
│   ├── My Registrations (/hackathons/my)
│   └── Past Showcases (/hackathons/showcase)
│       └── Showcase Detail (/hackathons/showcase/[id])
│
├── Profile (/profile) — shared across modules
├── Notifications (/notifications) — shared
└── Admin (/admin) — role-gated
    ├── User & Role Management
    ├── Module-level content management (events, rosters, ledger, registrations)
    └── Analytics/Reporting
```

The three modules are **peers**, not nested under one another — a student can jump directly from a live cricket score to a hackathon registration via the persistent top navigation bar without returning to the homepage first.

## 2. Homepage Behavior

The homepage is a **unified activity feed**, not a static landing page:
1. **"Live Now" strip** (top): any currently live sports match or in-progress event, pulled in real time via WebSocket. Empty if nothing is live.
2. **"Happening Soon"**: next 3–5 upcoming items across all three modules, chronologically merged, each tagged with its module accent color.
3. **Module entry cards**: three large cards (Sports / Cultural / Hackathons), each showing a quick-glance stat (e.g., "3 live matches", "Registration closes in 2 days", "New gallery: Founders' Day").
4. **Personalized row** (if logged in): "Your duty roster today", "Your hackathon submissions", "Your upcoming matches" — pulled based on role and existing assignments.

## 3. Cross-Module User Journeys

### 3.1 Student clicks a live match
`Homepage → "Live Now" card → Sports Live Score view`
- Opens a dedicated live match view with real-time score updates (WebSocket subscription), match timeline/commentary feed, and team rosters.
- If the match is part of a tournament, a "Tournament Bracket / Schedule" tab is available inline — no navigation away.
- Clicking a player name opens their **Player Profile** in a slide-over panel (not a full page nav) to keep the live score session active.

### 3.2 Student registers for a hackathon
`Hackathons module → Hackathon Detail page → "Register" CTA`
- Triggers the multi-step registration flow (see UI/UX Brief §4.3): Team Info → Members → Eligibility → Review → Submit.
- On submit: confirmation screen + email notification + entry appears under **My Registrations**.
- Registration state is reflected live on the Hackathon Detail page ("142 teams registered") via periodic refetch or WebSocket count updates.
- If registration is closed/full, the CTA is replaced with a **"Join Waitlist"** or **"Registrations Closed"** state — no dead-end error pages.

### 3.3 Student/faculty views a cultural event gallery
`Cultural Events → Event Detail → "View Gallery" tab (or Gallery module → Event Gallery)`
- Gallery opens a masonry grid of images/videos for that event.
- Clicking a media item opens a lightbox viewer with next/prev navigation; videos autoplay muted with tap-to-unmute.
- If the event also has a **Post-Event Report** published, a summary banner links to it directly from the gallery header.

### 3.4 Faculty publishes a post-event report
`Cultural Events → Event Detail (past event) → "Add Report" (faculty/admin only)`
- Opens report editor: summary, attendance count, outcomes/incidents, linked media selection from the event's gallery.
- On publish, the report becomes visible to students on the Event Detail page and is indexed for future reference.

### 3.5 Coordinator manages a duty roster
`Cultural Events (or Sports) → Roster Detail → Assign/Edit`
- Faculty/admin sees an editable table: add role, assign student/faculty, set shift time.
- Assigned users receive a notification; their own **Profile → My Duties** view updates automatically.
- On event day, assigned staff can "check in" from their mobile view, updating a live status column visible to the coordinator (WebSocket-backed, mirrors the live-score pattern technically).

### 3.6 Admin reviews the historical ledger
`Sports → Medal & Trophy Ledger → Filter by year/sport/department`
- Table/gallery toggle view (per UI/UX Brief §4.4).
- Admin-only **"Add Historical Record"** action for backfilling past years not yet digitized.
- Clicking a ledger entry opens the linked player profile(s) and, if available, the associated match/event record.

## 4. Authentication & Role Gating Flow

```
Landing → Login (SSO or credentials)
        → Role resolved (student | faculty | admin)
        → Redirect to Homepage with role-appropriate personalization
```
- Unauthenticated visitors can browse all **public** views (live scores, schedules, galleries, showcases, historical ledger) read-only.
- Attempting a gated action (register, edit roster, publish report) while unauthenticated triggers an inline login prompt, not a full redirect away from context.
- Post-login, the user is returned to the exact screen/action they were attempting.

## 5. Notification Triggers (Shared Layer)

| Event | Notified Roles |
|---|---|
| Match going live | Students/faculty who follow that sport/team |
| Duty assignment created/changed | Assigned student/faculty |
| Hackathon registration confirmed | Registering team members |
| Registration deadline approaching (24h) | Registered/incomplete applicants |
| Post-event report published | Students/faculty tagged in the event |
| New gallery media uploaded | Followers of that event |

## 6. State Transitions Summary (per module)

- **Sports Event:** `Scheduled → Live → Completed → Archived (ledger-eligible)`
- **Cultural Event:** `Announced → Registration/RSVP Open (if applicable) → In Progress → Completed → Report Published`
- **Hackathon:** `Announced → Registration Open → Registration Closed → In Progress → Judging → Results Published → Showcased`

Each state transition is what drives which UI affordances (CTAs, live badges, edit permissions) are shown at any given screen — the frontend should treat these statuses as the single source of truth for conditional rendering.
