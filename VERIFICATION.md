# Habits-first revision verification

Local app verification with fictional sample data.

- TypeScript: `tsc --noEmit`.
- Production: `npm run build`.
- Model: `npm run test:habits` checks that sample entries and experiments have zero glucose readings; behavior patterns are derived without glucose; missing activity/cravings do not generate unsupported conclusions; clinical baseline and personal entries survive the one-time migration.
- Prediabetes onboarding: HbA1c, fasting test value, and test date are optional clinical baseline inputs; no daily monitoring setup required.
- Home: lifestyle action and experiment, behavioral pattern, food/activity/sleep quick logs; no clinical measurement cards or glucose chart.
- Track: six primary habit types, with weight/glucose/medication in collapsed optional extras. A cravings entry was saved successfully.
- Experiment: post-meal movement completed at seven recorded days with zero glucose readings. Includes a day with zero walking and contextual notes. Completion showed 5/7 routine days, 75 minutes, and subjective energy check-ins.
- Evidence: the prediabetes lifestyle-program source is shown with population, outcome, approved claim, and caveats distinguishing a supported multi-year program from a short app experiment.
- Results: no glucose comparison without optional readings. No causal or clinical-improvement claims.
- Refresh: profile/history and completed experiment remain available through local persistence.
- Responsive: desktop home and mobile navigation/layout inspected.

These are product QA checks, not clinical validation.

## Daily Home revision · 2026-10-03
- Home hierarchy: personal greeting → adaptive daily snapshot → supported personal observation with immediate causality caveat → compact current experiment → optional next action.
- Snapshot uses food logs/preparation, active minutes, sleep duration and optional actual weight logs. No invented steps, clinical targets or daily glucose metrics. Personal comparisons use at least three prior logged days in the previous week and exclude missing days.
- Fictional current-day seed: three meals (two home-cooked, one restaurant), 32 movement minutes (15 after dinner and 17 errands), 6.7 hours sleep, appetite/energy check-ins and one weight observation. Weight does not claim stability from one point.
- One-time Home migration preserves personal entries, profile, active run, history and saved learning. It adds sample current-day entries only for kinds without personal records that day.
- TypeScript, production build, existing habit checks and new snapshot checks passed.
- Browser QA at 1280×1000 and 390×844: Home, Track, Discover and Profile navigation; pattern detail; complete experiment detail; mobile experiment-day logging link; snapshot sleep logging and persistence after reload. Logging was tested in an isolated localhost sample-data origin; existing 127.0.0.1 data was retained.
- Browser warning/error log was empty.

## Mira branding · 2026-10-03
- Updated product copy, welcome CTA, title/description, wordmark, SVG favicon, mobile header, doctor summary and export filenames to Mira.
- Tagline remains prominent on welcome; Home keeps the existing snapshot → insight → experiment hierarchy.
- Retained the existing local-storage namespace to preserve all browser data; no data migration or reset is required.
- Checked welcome/onboarding, Home, Track, Discover/evidence, Profile, doctor summary and experiment detail on desktop/mobile. Found and corrected the CSS-generated mobile header name during QA.
- TypeScript, habit and snapshot checks pass; console warnings/errors are empty.
