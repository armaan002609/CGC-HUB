# Product Requirement Document (PRD)
## University Campus Portal — Sports, Cultural Events & Hackathons

**Version:** 1.0
**Status:** Draft — Foundational
**Owner:** Product/Engineering Team

---

## 1. Executive Summary

The Campus Portal is a unified web platform that centralizes three previously siloed domains of student life — **Sports**, **Cultural Events**, and **Hackathons** — into one system of record. It replaces scattered spreadsheets, WhatsApp groups, notice boards, and one-off Google Forms with a single, authoritative, always-on source of truth for schedules, results, rosters, registrations, and media.

The platform serves three primary audiences with different needs but one shared expectation: **information should be live, accurate, and easy to find.**

---

## 2. Problem Statement

Today, campus activity information is fragmented:

- Sports results are announced informally and lost after the event; there is no permanent record of who won what, when.
- Cultural event execution details (who worked which duty, what went well) live in someone's personal notes and are never reused for the next event.
- Hackathon registration is manual, participant communication is inconsistent, and post-event showcases (winning projects, demo videos) disappear once the event ends.
- Faculty and administrators lack a single dashboard to see everything happening across student activities.
- Prospective students, parents, and recruiters have no public-facing showcase of the university's activity culture.

## 3. Goals & Objectives

### Primary Goals
1. **Centralize** all Sports, Cultural, and Hackathon activity data into one platform.
2. **Provide real-time visibility** into live sports scores and event status.
3. **Preserve institutional memory** — a permanent, searchable historical ledger of achievements, past events, and participants.
4. **Streamline operations** for organizers: duty rostering, registration management, and reporting.
5. **Showcase** the university's talent and events to an external audience (recruiters, prospective students, parents).

### Success Metrics (KPIs)
| Metric | Target |
|---|---|
| Active weekly users (students + faculty) | 60%+ of enrolled students by Year 1 |
| Live score sessions with >100 concurrent viewers | At least 1 per major sporting event |
| Hackathon registrations completed online (vs. manual) | 100% |
| Historical records digitized (past 3 years) | 90%+ backfilled at launch |
| Average admin time to publish an event report | Reduced by 70% vs. manual process |

## 4. Target Audience & Personas

### 4.1 Students
- **Needs:** Check live scores, find event schedules, register for hackathons, see their own duty assignments, browse galleries, check personal profile/stats.
- **Behavior:** Primarily mobile, casual/frequent visits, expects instant updates during live events.

### 4.2 Faculty (Coordinators, Advisors, Judges)
- **Needs:** Manage rosters, update live scores, approve registrations, publish reports, assign duties, moderate media uploads.
- **Behavior:** Desktop-first during event prep, mobile during live events (score entry, duty check-ins).

### 4.3 Administrators
- **Needs:** Platform-wide oversight — user management, cross-department reporting, historical archive curation, access control, analytics on engagement.
- **Behavior:** Desktop, periodic deep-dive sessions (monthly/quarterly reporting).

### 4.4 External Viewers (secondary audience)
- Prospective students, parents, alumni, recruiters browsing public showcases (hackathon winners, cultural galleries, sports achievements). Read-only, no login required for public pages.

## 5. Core Capabilities by Module

### 5.1 Sports
- Live score tracking for multiple concurrent sports/matches
- Upcoming event schedule (calendar + list view)
- Player profiles: categorized by **Student / Faculty**, filterable/sortable by **Department**
- Historical ledger of medals and trophies (searchable archive, by year/sport/team/individual)

### 5.2 Cultural Events
- Upcoming event schedules
- Post-event reports (execution summary, attendance, incidents, outcomes)
- Duty rosters (role assignments per student/faculty, shift timing, contact info)
- Rich media gallery (images + video) per event

### 5.3 Hackathons
- Participant registration portal (team formation, eligibility checks, confirmation)
- Date/timeline announcements (registration deadline, event dates, results date)
- Post-event showcase: winners, project descriptions, media, highlight videos

## 6. User Experience (UX) Vision

The portal should feel like **a living campus dashboard, not a static CMS.** Three UX principles guide every screen:

1. **Live-first:** Anything that can update in real time (scores, registration counts, duty check-ins) should visibly update without a page refresh.
2. **Low-friction discovery:** A student should reach "what's happening today" in one tap from the homepage, regardless of which vertical they came for.
3. **Institutional pride:** Historical ledgers, showcases, and galleries should feel celebratory and permanent — this is the university's trophy case, not a filing cabinet.

Navigation is organized around the three verticals as first-class top-level modules, unified by a shared homepage, shared user profile system, and shared notification layer (see App Flow document).

## 7. Roles & Permissions (Summary)

| Role | Sports | Cultural | Hackathons | Admin |
|---|---|---|---|---|
| Student | View, register (where applicable), view own profile/roster | View, view own duty roster | Register, view own submissions | — |
| Faculty/Coordinator | Update scores, manage schedules, manage player profiles | Publish reports, manage rosters, upload media | Manage registrations, judge, publish results | — |
| Administrator | Full CRUD across all modules | Full CRUD | Full CRUD | User & role management, analytics |
| Public (unauthenticated) | View live scores, schedules, historical ledger | View galleries, event listings | View showcase | — |

## 8. Out of Scope (v1)
- Payment processing (e.g., paid ticketing for cultural events)
- Native mobile apps (web is responsive/PWA-ready instead)
- Automated bracket/tournament generation engines (manual scheduling in v1)
- Third-party social media auto-posting

## 9. Assumptions & Constraints
- University provides institutional SSO or a standard auth mechanism for students/faculty.
- Media storage must scale for video content (cultural galleries, hackathon highlight reels).
- Live score updates require low-latency delivery (WebSockets — see TRD).
- Platform must remain performant during peak concurrent load (e.g., final match of a tournament, hackathon results announcement).

## 10. Risks
| Risk | Mitigation |
|---|---|
| Low faculty adoption for live score entry | Simple mobile-first score entry UI; training session at launch |
| Media storage costs balloon with video | Enforce upload size/duration limits; use compressed video delivery |
| Historical data backfill is incomplete | Phased backfill; allow "unknown"/partial records rather than blocking |
| Registration spikes crash the hackathon portal | Load-test registration flow; queue-based submission handling |
