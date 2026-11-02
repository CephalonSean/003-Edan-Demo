# Project memory

## Product intent & audience

- Multi-page static website; homepage is served at `/`.
- Current project context centers on getting the site preview to load reliably.

## Brand personality & voice

- No brand voice or audience details established yet.

## Visual design & UX direction

- No visual system, layout, typography, or interaction decisions established yet.
- Preview behavior should support straightforward homepage loading and refreshing/reopening when the panel is blank.

## Decisions, constraints & rationale

- Project build currently succeeds, so preview failure is not caused by a known build error.
- No preview errors were detected in available diagnostics.
- Runtime/dev-server or browser-side preview behavior remains the most likely area to investigate if the preview still does not appear.
- The build output references a possible `neon-vid.mp4` asset; its availability should be verified if runtime issues recur.

## Open questions & assumptions

- It is unclear whether the preview issue is reproducible or was resolved by refreshing/reopening the preview.
- Confirm whether the development server starts automatically and which command/port the preview expects.
- Verify whether all referenced media assets, especially `neon-vid.mp4`, exist and load at runtime.