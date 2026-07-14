# AI-Assisted Workflow Comparison

## Feature and approach

I built the same small feature twice: an AI assistant settings form with an assistant name, response style, preferred language, email updates, and save feedback. The vague round used the prompt: "Build an AI assistant settings form." I accepted the first usable result and saved it on `fe03-vague-prompt`. The precise round started again from `main` on `fe03-precise-prompt`. Its prompt named the existing Vite and React files, required strict TypeScript, accessible labels and feedback, name validation, reset behavior, responsive styling, Testing Library tests, and a final lint, test, and build verification loop.

## Specific differences

The vague branch keeps the whole feature in `src/App.tsx` and only checks whether the trimmed name is empty. Its message uses the same visual style for errors and success, has no announced live regions, and has no reset path or automated tests. It runs and looks complete, but a reviewer must manually discover its behavior and accessibility gaps.

The precise branch gives every control a stable `id` and `name`, links labels with `htmlFor`, and connects hint or error text through `aria-describedby`. Invalid input sets `aria-invalid` and announces the error with `role="alert"`; successful saves and resets use `role="status"`. Name validation covers blank, under-two-character, and over-thirty-character values. A typed generic update function keeps all fields inside one `AssistantSettings` model, while the reset action restores every documented default. The mobile CSS also stacks actions instead of squeezing two buttons into a narrow row.

Four tests in `src/App.test.tsx` verify default values, blank-name feedback, whitespace trimming on save, and complete reset behavior. This reduced review effort because the intended behavior is executable rather than implied.

## AI mistake caught and verification

The first generated test setup forgot to register Testing Library cleanup for Vitest. Earlier renders remained in the document, so later tests found duplicate buttons and labels. The failure exposed the missing lifecycle rule; adding explicit `afterEach(cleanup)` fixed the isolation problem. This was not visible from the UI alone.

Both branches pass `npm run lint` and `npm run build`. The precise branch also passes all tests with `npm test`. The exercise showed that a detailed prompt improved correctness, accessibility, edge-case coverage, and reviewer confidence, but verification was still necessary to catch an AI-generated test-environment mistake.
