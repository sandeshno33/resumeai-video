# ResumeAI — Voiceover Script (15 seconds)
# 30fps · 450 frames total
# Record at natural pace, time each section with a stopwatch

---

## TIMING GUIDE

| Frames   | Time    | Scene        | VO Line                                                   |
|----------|---------|--------------|-----------------------------------------------------------|
| 0–90     | 0–3s    | HOOK         | "Recruiters spend just seven seconds on your resume."     |
| 90–210   | 3–7s    | BUILDER      | "ResumeAI builds it with AI — bullets, keywords, format." |
| 210–300  | 7–10s   | ATS CHECKER  | "Then checks it beats every ATS filter before you apply." |
| 300–390  | 10–13s  | RECRUITER    | "And matches you to real roles — even the hidden ones."   |
| 390–450  | 13–15s  | CTA          | "Free. No card. Start at cvai dot dev."                   |

---

## FULL SCRIPT (read continuously)

"Recruiters spend just seven seconds on your resume.
ResumeAI builds it with AI — bullets, keywords, format.
Then checks it beats every ATS filter before you apply.
And matches you to real roles — even the hidden ones.
Free. No card. Start at cvai dot dev."

---

## TONE NOTES
- Confident, clean, slightly urgent — not hype
- Pace: measured, not rushed. Trust the silence.
- "seven seconds" — slight emphasis on SEVEN
- "cvai dot dev" — spell it out clearly, pause before

## MUSIC NOTES
- Genre: minimal electronic / lo-fi tech
- Tempo: 90–100 BPM
- Dynamics: low in hook (let stat breathe), rises through builder/ATS, peaks on CTA
- Suggested: clean piano chord stabs + sub bass, no vocals
- Recommended royalty-free: Artlist.io search "corporate minimal tech"

## AUDIO EXPORT SPECS
- Format: WAV 48kHz 24-bit stereo
- VO + music combined (ducked: VO at -6dB, music at -18dB under speech, -12dB elsewhere)
- Add the audio file at: src/audio/voiceover.wav
- Reference in Root.tsx: import { Audio } from "remotion"; <Audio src={staticFile("voiceover.wav")} />
