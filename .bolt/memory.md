# Project memory

## Product intent & audience

- Ɛdan Members includes a private Community chat for active members, positioned as a warm creative, research, and cultural space rather than a generic messaging product.
- The community serves members interested in architecture, urban life, materials, making, culture, spatial practice, events, and collaborations.
- The broader project remains a multi-page static website with homepage at `/`, member-area workflows, and admin operations for signups, affiliates, bookings, memberships, payments, and blocked dates.
- Admin notifications should provide complete, professionally formatted operational details by email.
- Homepage retains six destination cards and annual-member restrictions.

## Brand personality & voice

- Community experience should feel warm, personal, active, welcoming, editorial, and contemporary.
- Copy should be concise, natural, and conversational, with realistic member exchanges rather than marketing language.
- Admin-facing emails should remain professional, clear, structured, and easy to scan.
- Destination-card copy should follow the supplied reference’s concise editorial presentation.
- No broader customer-facing voice system is established beyond the Ɛdan community direction.

## Visual design & UX direction

- Community chat uses an earthy Ɛdan palette: warm cream `#F2EAD9`, soft cream `#FAF5E9`, terracotta `#D9A97D`, clay `#9C4B34`, muted indigo `#57647E`, mustard `#E4C567`, and dark brown `#322D26`.
- Space Grotesk is used for headings and interface text; Space Mono is used for small labels and metadata.
- Prefer subtle rounded corners, balanced spacing, restrained earthy accents, natural photography, and diverse authentic-looking member avatars.
- Avoid corporate chat styling, generic Slack/WhatsApp patterns, excessive borders or dividers, excessive colors, oversized empty areas, and decorative clutter.
- Desktop community layout is a three-part interface: community navigation sidebar, conversation list, and dominant active-chat panel. A restrained details area may show members and shared files without competing with the conversation.
- Desktop navigation includes Ɛdan branding, Members back link, Community heading/subtitle, search, channel/conversation navigation, unread indicators, and signed-in member profile.
- Active chat includes conversation metadata, online/member status, natural incoming/outgoing messages, occasional attachments, replies/reactions, and a composer with attachment, emoji, text input, and terracotta send control.
- Mobile is a genuine single-conversation adaptation, not a scaled desktop view: compact top navigation, back control, conversation navigation access, readable bubbles, comfortable touch targets, and a composer fixed without obscuring the latest message.
- Existing destination cards use pure white text for numbers, titles, and descriptions; avoid unintended dark-brown text. Match the reference’s title sizing, spacing, and positioning, and omit decorative arrow symbols including on mobile.
- Email templates should use consistent professional formatting across signup, affiliate, booking, application, and reminder notifications. Booking emails should mirror the admin booking View screen with grouped details, status/context, dates, and available notes.
- No specific email color, typography, or layout system has been established.

## Decisions, constraints & rationale

- The Community interface is implemented as an upgrade to the existing live chat container rather than a separate promotional or dashboard page.
- Preserve existing sign-in, active-member access, username/profile setup, Supabase loading, realtime updates, and message sending while changing the presentation.
- Current chat work includes desktop sidebar, conversation list, active chat, details area, message bubbles, profile setup, realtime behavior, and a mobile composer.
- Build currently succeeds; browser rendering could not be directly previewed, so runtime layout and responsive behavior should still be checked when possible.
- Notification handling should remain one shared system with reusable recipients, templates, and event/reminder logic.
- Admin recipient list includes `huangnehemiah10@gmail.com`; the second Hiba recipient address is still unavailable.
- Required notifications cover full signup and affiliate details, complete booking details, application approval/payment link, pending reminders, expired application or membership states, and blocked-date due-date reminders.
- Preserve existing payment notifications and update complete SQL setup and related functions together for fresh deployment.
- Runtime/dev-server or browser-side behavior remains the likely area to investigate if preview problems recur; verify `neon-vid.mp4` if relevant.
- Preserve six destinations and annual-member restrictions while refining presentation.

## Open questions & assumptions

- Confirm the Community page’s final route and whether conversation/channel navigation is data-backed or currently visual-only.
- Confirm which community details, shared attachments, reactions, and unread counts should be persisted versus mocked.
- Confirm final responsive breakpoints and test the fixed mobile composer against long messages and the on-screen keyboard.
- Exact Hiba email address is unknown.
- Decide whether pending, expired, and blocked-date reminders use scheduled daily checks or event/status changes.
- Clarify whether “expired applications” means applications, memberships, or both; define blocked-date reminder lead time and timezone.
- Confirm final admin booking fields and whether every field visible in the admin view is available to notification data.
- The supplied destination-card reference remains the source of truth for finer typography and spacing details not captured here.