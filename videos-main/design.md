# Resume AI — Video Design Spec

Mirrors the cv-ai-frontend product (`/Users/mac/Desktop/allprojects/brandbuilder/cv-ai-frontend/DESIGN.md`).
Stripe-inspired: deep navy headings, saturated purple primary, blue-tinted layered shadows, conservative
4–8px radii, weight-300 typography.

## Palette

| Token | Hex | Role |
|---|---|---|
| `--surface` | `#ffffff` | Page background, card surfaces |
| `--surface-soft` | `#f6f9fc` | Raised pill / subtle backgrounds |
| `--heading` | `#061b31` | Headings, nav text, strong labels |
| `--label` | `#273951` | Form labels, secondary headings |
| `--body` | `#64748d` | Body text, descriptions |
| `--primary` | `#533afd` | CTA, links, interactive accent |
| `--primary-hover` | `#4434d4` | Primary hover |
| `--primary-deep` | `#2e2b8c` | Deep purple |
| `--primary-light` | `#b9b9f9` | Subdued purple, active border |
| `--primary-tint-5` | `rgba(83,58,253,0.05)` | Soft primary background tint |
| `--primary-tint-8` | `rgba(83,58,253,0.08)` | Soft primary background tint |
| `--border` | `#e5edf5` | Default borders, dividers |
| `--border-soft` | `#d6d9fc` | Soft purple borders |
| `--border-soft-tint-30` | `#f3f5fe` | Tinted backgrounds |
| `--border-soft-tint-40` | `#eff1fd` | Tinted backgrounds |
| `--border-soft-tint-50` | `#ebedfc` | Tinted backgrounds |
| `--border-dashed` | `#362baa` | Drop zones |
| `--success` | `#15be53` | Status |
| `--success-text` | `#0d7a35` | Success badge text |
| `--success-bg` | `rgba(21,190,83,0.20)` | Success badge bg |
| `--success-border` | `rgba(21,190,83,0.40)` | Success badge border |
| `--ruby` | `#ea2261` | Accent / decorative |
| `--ruby-text` | `#c41a4f` | Error text |
| `--magenta` | `#f96bee` | Decorative |
| `--magenta-light` | `#ffd7ef` | Tinted accent |
| `--lemon` | `#9b6829` | Warning / highlight |
| `--brand-dark` | `#1c1e54` | Deep brand sections |

## Typography

Primary: **Inter** (substituted for `sohne-var` — original is a custom Stripe font we don't have local
.woff2 files for; Inter at weight 300 is the closest geometric match available in HyperFrames built-ins).
Mono: **JetBrains Mono** (substituted for `SourceCodePro`).

Weight is the signature: **300 for headings and body, 400 for buttons/UI**. Tabular numerals (`tnum`)
on data displays.

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Display Hero | 56px | 300 | -1.4px |
| Display Large | 48px | 300 | -0.96px |
| Section Heading | 32px | 300 | -0.64px |
| Sub-heading Large | 26px | 300 | -0.26px |
| Sub-heading | 22px | 300 | -0.22px |
| Body Large | 18px | 300 | normal |
| Body | 16px | 300 | normal |
| Button | 16px | 400 | normal |
| Caption | 13px | 400 | normal |
| Caption Small | 12px | 300-400 | normal |

## Shadows (5-level)

| Level | Value |
|---|---|
| Flat | `none` |
| Ambient | `rgba(23,23,23,0.06) 0px 3px 6px` |
| Standard | `rgba(23,23,23,0.08) 0px 15px 35px 0px` |
| Elevated | `rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.10) 0px 18px 36px -18px` |
| Deep | `rgba(3,3,39,0.25) 0px 14px 21px -14px, rgba(0,0,0,0.10) 0px 8px 17px -8px` |

## Border Radius Scale

`--r-micro: 1px` · `--r-standard: 4px` · `--r-comfort: 5px` · `--r-relaxed: 6px` · `--r-large: 8px`

## Don't

- No pure black `#000` — always `#061b31`
- No pill shapes or radii > 8px on cards/buttons
- No neutral gray shadows — always blue-tinted
- No bold headings — weight 300 is the brand voice
- No warm accent colors for interactive — purple is primary
