# Project memory

## Product intent & audience

- Multi-page static website with homepage served at `/`; current technical context includes preview reliability.
- Project includes admin workflows for signups, affiliate applications, bookings, membership applications, payments, and blocked dates.
- Admin notifications should provide complete, professionally formatted operational details by email.
- Homepage includes six destination cards with annual-member restrictions retained.

## Brand personality & voice

- Admin-facing emails should be professional, clear, structured, and easy to scan.
- Destination-card copy should follow the supplied reference’s concise editorial presentation.
- No broader customer-facing brand voice has been established.

## Visual design & UX direction

- Destination cards use pure white text for numbers, titles, and descriptions; avoid dark-brown or otherwise unintended text colors.
- Card typography should match the supplied reference more closely, including title sizing, spacing, and text positioning.
- Remove decorative arrow symbols from cards, including mobile layouts; arrows appeared emoji-like and should not be used.
- Email templates should use consistent professional formatting across signup, affiliate, booking, application, and reminder notifications.
- Booking notifications should mirror the information shown in the admin booking “View” screen, rather than providing only a summary.
- Include clear labels, grouped details, status/context, and relevant dates or due dates.
- No specific email color palette, typography, or layout system has been established.

## Decisions, constraints & rationale

- Build notification handling as one shared system with reusable recipients, templates, and event/reminder logic.
- Admin recipient list currently includes `huangnehemiah10@gmail.com`; the Hiba recipient address is not present in the project and must be supplied before routing to both recipients.
- Required notification coverage:
  - New user signups with all submitted user details.
  - Affiliate applications with all submitted details.
  - Full booking details matching the admin view, including reference, guest, room, dates, nights, guest count, rate, total, payment source, contact details, and notes where available.
  - Application approval emails including selected membership, amount, and payment link.
  - Pending application reminders.
  - Expired application or membership notifications.
  - Upcoming due dates for blocked-date periods.
- Payment notifications are already set up and should be preserved rather than duplicated.
- The complete SQL setup and all related functions need to be updated together so the notification workflow is deployable from a fresh setup.
- Build currently succeeds; no known build error explains the preview issue.
- Runtime/dev-server or browser-side preview behavior remains the likely area to investigate if preview problems recur.
- Verify the referenced `neon-vid.mp4` asset if runtime issues return.
- Preserve the six destinations and annual-member restrictions while adjusting card presentation.

## Open questions & assumptions

- Exact Hiba email address is unknown and required.
- Notification timing for pending, expired, and blocked-date reminders is undecided: daily scheduled checks versus event/status-change notifications.
- Confirm the development server command and expected preview port if preview loading remains unreliable.
- Confirm whether “expired applications” means expired membership applications, expired memberships, or both.
- Confirm the desired lead time and timezone for blocked-date due-date reminders.
- Verify the final admin booking fields available in the database and whether all fields shown in the admin view are present in email data.
- The supplied reference photo remains the source of truth for finer card typography and spacing details not yet captured.