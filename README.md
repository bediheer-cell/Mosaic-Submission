# Mira

A working habits-first companion for people recently told they have prediabetes or elevated blood sugar. The core question is “What can I realistically change?”

## Run locally

Use Node.js 22.13 or newer:

```sh
npm ci
npm run dev
```

Open the address printed by the server. `npm run build` creates the production Worker and assets; `npm start` serves that build locally.

## A reading-free demo

1. Select **Try Mira with sample data**.
2. Home shows a lifestyle experiment, today’s small action, and a behavioral pattern.
3. Log Indian meals, movement, sleep, hunger, energy, or cravings from Track.
4. Explore the pattern, then read the evidence and its limitations.
5. Record a day of the post-meal movement experiment: dinner/time, walking, energy, and context. No glucose measurement is required.
6. Discover → Your history includes a completed breakfast experiment with no glucose readings.
7. Complete seven recorded days and see routine consistency, movement minutes, subjective check-ins, and notes about what helped.
8. Save learning or export a lifestyle conversation summary for your doctor.

The current sample experiment starts six days ago with three recorded days, so its remaining dates can be entered without waiting a week. A personal experiment starts today. Missing observations remain missing.

## Product architecture

React 19, TypeScript, and the Next-compatible Vinext starter. `app/model.ts` separates profiles and clinical test context, everyday entries, lifestyle experiments, curated evidence, and behavioral insight calculations. `app/page.tsx` implements the complete journey. `app/globals.css` provides responsive desktop and mobile layouts.

HbA1c and fasting test values are clinical baseline information in Profile. Food/activity/sleep and appetite/energy are the primary daily data. Weight, glucose, and prescribed medication logs are available under optional extras. Glucose fields remain in the data model for broader future journeys, but they are not needed for any prediabetes experiment, insight, or result.

The seeded demonstration contains no glucose records. Existing personal entries and clinical context are retained. A one-time migration refreshes fictional sample history while preserving non-sample records.

Behavioral insights use matched recorded days, with minimum sample sizes. Missing activity is never treated as zero movement. Records may be incomplete, and associations do not establish causation. Research supporting a multi-year lifestyle program is clearly distinguished from the app’s short personal routine experiments.

## Checks

```sh
npm run test:habits
node node_modules/typescript/bin/tsc --noEmit
npm run build
```

Model checks cover the zero-reading demo, behavioral patterns, missing observations, migration, and preservation of baseline/personal data. Interactive QA covered the no-glucose experiment completion flow, optional logging, baseline placement, evidence, and responsive views. See `VERIFICATION.md`.

## Persistence and boundaries

All health data stays in localStorage on this browser/device. No health API or API key is needed. Clearing browser storage removes data. Export is available as JSON; the doctor summary is plain text. Seeded nutrition is approximate and omitted for custom meals or changed portions.

No diagnosis, prescribing, dosage recommendations, device integrations, cloud health storage, or promises of clinical improvement. A short habit experiment cannot measure changes in HbA1c or long-term risk. This is a usable product MVP, not a clinically validated intervention.

### Daily companion Home
Home emphasizes an adaptive daily snapshot, observations supported by recorded data, and a compact experiment below the insight. Sleep and movement comparisons use the user's previous logged week (minimum three days), rather than universal targets. Missing logs stay unlogged; weight uses actual dated observations. Run `npm run test:snapshot` for snapshot and migration verification. All detailed experiment, tracking, evidence and onboarding flows remain available.
