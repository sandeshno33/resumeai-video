#!/usr/bin/env bash
# Generates the voiceover clips for the marketing video (assets/vo/).
# Used locally and by CI (.github/workflows/render.yml) — the wavs are
# not committed; regenerate with this script.
#
# Kokoro is deterministic for a given model + voice + text, so clip
# durations are stable. If you change VOICE or any line, re-measure the
# durations (ffprobe) and update the <audio> data-duration values in
# index.html to match.
#
# "Résumé" is spelled with accents so the phonemizer says REZ-oo-may
# (the noun), not re-ZOOM (the verb). The text is never displayed.
set -euo pipefail
cd "$(dirname "$0")/.."

VOICE="${VO_VOICE:-am_michael}"
SPEED="${VO_SPEED:-1.12}"
OUT="assets/vo"
mkdir -p "$OUT"

gen() {
  npx --yes hyperframes@0.6.91 tts "$2" -v "$VOICE" -s "$SPEED" -o "$OUT/$1.wav"
}

gen 01-hook        "You apply to a hundred jobs. You hear back from three."
gen 02-brand       "Résumé AI changes that."
gen 03-dashboard   "Your candidate workspace. Résumés, applications, AI matching — every part of the search lives in one place."
gen 04-preferences "Tell it what you want. Roles. Locations. Compensation. The fit math runs on every job, automatically."
gen 05-ats         "Drop in any job posting. The ATS optimizer scores your résumé in seconds — then rewrites it to win the keywords you're missing."
gen 06-recommended "It surfaces the roles you'd actually take. Ranked by real fit, not noise."
gen 07-extension   "And the Chrome extension applies for you. On LinkedIn. With the right résumé. Even while you sleep."
gen 08-stats       "Forty-seven applications a week. Six interviews this month. Zero hours lost."
gen 09-cta         "Résumé AI. Start free."
