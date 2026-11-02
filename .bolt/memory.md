# Project memory

## Product intent & audience

- Ɛdan Members includes a private Community chat for active members, positioned as a warm creative, research, and cultural space rather than a generic messaging product.
- The community serves members interested in architecture, urban life, materials, making, culture, spatial practice, events, and collaborations.
- The broader project is a multi-page static website with homepage, member-area workflows, appointments, and admin operations for signups, affiliates, bookings, memberships, payments, and blocked dates.
- Appointments support annual members through a guided booking flow using real availability and the existing Supabase booking system.
- Admin notifications should provide complete, professionally formatted operational details by email.
- Homepage retains six destination cards and annual-member restrictions.

## Brand personality & voice

- Community experience should feel warm, personal, active, welcoming, editorial, and contemporary.
- Appointment booking should feel clear, calm, practical, and supportive rather than transactional.
- Copy should be concise, natural, and conversational, with realistic member exchanges rather than marketing language.
- Admin-facing emails should remain professional, clear, structured, and easy to scan.
- Destination-card copy should follow the supplied reference’s concise editorial presentation.
- No broader customer-facing voice system is established beyond the Ɛdan community direction.

## Visual design & UX direction

- Member-section introductions use full-bleed hero imagery spanning the viewport on desktop and mobile.
- Community has an image-led hero introduction above the chat workspace, consistent with the other member sections.
- The Appointments page uses a full-width image-led hero with `06 / Appointments` and “Let’s make time.”
- Appointment offerings are presented as four photo-based cards. Duration is explicitly shown as `TBD`; seeded placeholder minutes must not appear as confirmed operating details.
- Booking uses a five-step flow with numbered progress indicators: appointment selection, date/time selection, member details, review, and confirmation.
- Appointment selection uses radio controls; date and time use real available slots. Optional WhatsApp and message fields are supported.
- Desktop booking uses a two-column layout with a supporting image panel; mobile collapses to a single column with touch-friendly controls.
- Review and confirmation states appear only after a successful booking. The page also supports upcoming appointments, an empty state, and a help/contact panel.
- Space Grotesk is used for headings and interface text; Space Mono is used for small labels and metadata.
- Prefer subtle rounded corners, balanced spacing, restrained earthy accents, natural photography, and diverse authentic-looking member avatars.
- Avoid corporate chat styling, generic Slack/WhatsApp patterns, excessive borders or dividers, excessive colors, oversized empty areas, and decorative clutter.
- Community desktop layout is a three-part interface: community navigation sidebar, conversation list, and dominant active-chat panel. A restrained details area may show members and shared files without competing with the conversation.
- Existing destination cards use pure white text for numbers, titles, and descriptions; avoid unintended dark-brown text. Match the reference’s title sizing, spacing, and positioning, and omit decorative arrow symbols including on mobile.
- Email templates should use consistent professional formatting across signup, affiliate, booking, application, and reminder notifications. No specific email color, typography, or layout system has been established.

## Decisions, constraints & rationale

- Member-section heroes are intentionally full-width/full-bleed rather than constrained by standard member-section content padding.
- Community’s hero appears above the chat so the section retains the image-led introduction pattern used by other member areas.
- The Community interface is an upgrade to the existing live chat container rather than a separate promotional or dashboard page.
- Preserve existing sign-in, active-member access, username/profile setup, Supabase loading, realtime updates, and message sending while changing presentation.
- The chat workspace uses nearly the full available screen, with responsive behavior adapted for mobile rather than simply scaling the desktop layout.
- Preserve existing annual-member access rules and Supabase booking behavior in the appointment redesign.
- Appointment durations remain visibly `TBD` until confirmed; placeholder values must not be presented as operational facts.
- Current appointment work includes responsive hero, offering cards, multi-step booking, available-slot selection, member details, review/confirmation, upcoming appointments, and support states.
- The project build passes after the appointment redesign and prior hero/chat changes; browser rendering and runtime responsive behavior should still be checked when possible.
- Notification handling should remain one shared system with reusable recipients, templates, and event/reminder logic.
- Admin recipient list includes `huangnehemiah10@gmail.com`; the second Hiba recipient address is still unavailable.
- Required notifications cover full signup and affiliate details, complete booking details, application approval/payment link, pending reminders, expired application or membership states, and blocked-date due-date reminders.
- Preserve existing payment notifications and update complete SQL setup and related functions together for fresh deployment.
- Preserve six destinations and annual-member restrictions while refining presentation.

## Open questions & assumptions

- Confirm the final Community and Appointments routes and whether conversation/channel navigation is data-backed or currently visual-only.
- Confirm which community details, shared attachments, reactions, and unread counts should be persisted versus mocked.
- Validate full-bleed hero behavior across browsers, especially image cropping, safe text placement, and narrow mobile widths.
- Confirm final responsive breakpoints and test the near-fullscreen chat and fixed mobile composer against long messages and the on-screen keyboard.
- Confirm how appointment durations will be defined and when `TBD` labels can be replaced with confirmed values.
- Verify appointment availability, timezone handling, booking conflict prevention, and confirmation behavior against production Supabase data.
- Exact Hiba email address is unknown.
- Decide whether pending, expired, and blocked-date reminders use scheduled daily checks or event/status changes.
- Clarify whether “expired applications” means applications, memberships, or both; define blocked-date reminder lead time and timezone.
- Confirm final admin booking fields and whether every field visible in the admin view is available to notification data.
- The supplied destination-card and appointment references remain the source of truth for finer typography and spacing details not captured here.