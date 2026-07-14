# Project Rules

1. Keep AI assistant preferences in the typed `AssistantSettings` model. Do not introduce untyped form values or use `any`.
2. Validate the assistant name after trimming whitespace: it must contain 2 to 30 characters. Connect errors to the input with `aria-describedby`, set `aria-invalid`, and announce errors with `role="alert"`.
3. Every form control must have a stable `id`, `name`, and visible associated label. Save and reset feedback must use a `role="status"` live region.
4. Reset must restore the documented defaults: Nova, balanced responses, English, and email updates enabled.
5. Any behavior change must update focused Testing Library coverage. Keep explicit `afterEach(cleanup)` in the Vitest setup so tests remain isolated.
6. Before committing, run `npm run lint`, `npm test`, and `npm run build`; do not treat a passing build as proof that tests passed.
