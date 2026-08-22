# Saulutė žaidžia! — Lithuanian Word Game

A kid-friendly HTML5 game (ages 6–9) for practicing basic Lithuanian vocabulary,
built as a static site for GitHub Pages. No build step, no backend — vanilla
HTML/CSS/JS.

## Run locally

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

(Opening `index.html` directly via `file://` also works for this project
since there are no fetch calls to local files, but a local server is closer
to production.)

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Repo Settings → Pages → Deploy from branch → select `main` (or `master`)
   and `/ (root)`.
3. Site will be live at `https://<username>.github.io/<repo>/`.

## Project structure

```
index.html          Screens (home, category select, game, results) + sun mascot SVG, all Lithuanian
style.css            Design tokens & styling (Lithuanian folk-sash palette)
js/
  data.js            Nouns (gender + plural), adjectives (4 agreement forms), numbers 1-9 (gender forms)
  phrases.js          Grammar engine: builds agreeing phrases, generates distractors, renders visual tiles
  audio.js            Text-to-speech via the Web Speech API (SpeechSynthesis)
  game.js             Screen router, round orchestration, localStorage progress, sound toggle
  mechanics/
    matching.js       Picture-tile-to-phrase matching mini-game
    quiz.js            Multiple-choice quiz mini-game
    dragdrop.js       Drag phrase chips onto matching picture tiles (Pointer Events)
    index.js           Registers mechanics under the `Mechanics` object
```

## Audio (MVP)

Pronunciation uses the browser's built-in **Web Speech API** (`SpeechSynthesis`) —
no audio files, no backend, works entirely offline-capable in the sense that
it needs no server on our end. **Best supported in Google Chrome** (desktop
and Android), which ships a networked Google `lt-LT` voice. Behavior:

- On page load, `js/audio.js` looks for a voice whose `lang` starts with `lt`.
  If Chrome finds one, `Game.playSound(item)` speaks the phrase text aloud.
- The 🔊 button (top-right, all screens) toggles sound on/off; the preference
  is saved to `localStorage`.
- If the browser has **no speech synthesis support at all**, the toggle button
  is hidden automatically — no dead UI.
- If speech synthesis exists but **no Lithuanian voice** is installed (common
  outside Chrome, or offline on some platforms), `utterance.lang = "lt-LT"` is
  still set and the browser's default voice will attempt it — pronunciation
  quality in that fallback case isn't guaranteed.
- Phrases are spoken as feedback: after a correct match/drop, and after every
  quiz question (revealing the correct phrase, whether the answer was right
  or wrong) — never *before* answering a quiz question, so it doesn't give
  away the answer.

**Known gaps for a future pass:** no manual voice picker if multiple `lt-LT`
voices are available; no rate/pitch control exposed to the user; no written
fallback indicator when a Lithuanian voice isn't found (it just silently
uses the browser default).

## Current scope (MVP)

- **9 vocabulary categories:** Gyvūnai (animals), Vaisiai (fruits), Daržovės (vegetables),
  Daiktai (objects), Kūno dalys (body parts), Drabužiai (clothes), Transportas (transportation),
  Gamtos daiktai (nature), Maistas (food) — 8 nouns each, gender-tagged
- **3 difficulty levels** mapped to the Lithuanian primary-school system (1, 2, 3 klasė):
  - **1 klasė** — 5 items/round, numbers 1–5, only noun+adjective / noun+quantity (no triple combo)
  - **2 klasė** — 6 items/round, numbers 1–7, all three phrase patterns
  - **3 klasė** — 8 items/round, numbers 1–9, all three phrase patterns
  Level is chosen from the home screen ("Keisti klasę") and persists in `localStorage`.
- 6 color adjectives + 2 size adjectives (didelis/mažas), each with masc/fem × singular/plural forms
- Numbers 1–9 with correct Lithuanian gender agreement (e.g. vienas šuo / viena katė, keturi šunys / keturios katės)
- Each round mixes the phrase patterns allowed at the current level: **noun+adjective**,
  **noun+quantity**, **noun+adjective+quantity** — all grammatically agreeing, generated on the fly
- Visual tiles: quantity shown as repeated emoji, color adjectives as a tinted tile, size adjectives as
  scaled emoji — so agreement is visible, not just textual
- 3 game mechanics, randomly rotated per round, for variety
- Star-rated progress per category, saved in `localStorage`
- **Navigation:** home button available from the game screen and results screen at all times;
  category screen has its own back-to-home button
- Fully responsive, touch-friendly (drag & drop uses Pointer Events, not HTML5 native DnD)
- UI text is Lithuanian only, throughout
- Pronunciation via the Web Speech API (see Audio section below)

## Extending it

- **Add a new level**: add an entry to `LEVELS` in `js/data.js` with `id`, `nameLt`, `roundLength`,
  `maxQuantity`, and `phraseTypes` (any subset of `["adj_noun", "num_noun", "num_adj_noun"]`).
  It'll automatically appear in the level-select screen if you also add a matching `.level-card`
  button in `index.html`.
- **Add nouns**: add entries to a category's `nouns` array in `js/data.js`. Each needs `id`, `sg`
  (nominative singular), `pl` (nominative plural), `gender` (`"m"`/`"f"`), `emoji`.
  Note: numbers 1–9 only ever require nominative plural (not genitive), so no case logic beyond
  singular/plural is needed — if you extend numbers past 9, Lithuanian switches to genitive plural
  for 10+ and that inflection isn't implemented yet.
- **Add adjectives**: add to `ADJECTIVES` in `js/data.js` with all 4 forms (`m_sg`, `f_sg`, `m_pl`, `f_pl`)
  and a `type` of `"color"` (needs `hex`) or `"size"` (needs `scale`) so `renderVisualTile` knows how to
  depict it. Other adjective types would need their own visual treatment added to `phrases.js`.
- **Add audio**: `Game.playSound(itemId)` in `game.js` is already called at the right moments in every
  mechanic — it's a no-op stub today. Wire it up to `<audio>` clips or `SpeechSynthesis` when ready.
- **Add a new mechanic**: create `js/mechanics/yourMechanic.js` exposing
  `{ start(container, items, category, onComplete) }`, then register it in `js/mechanics/index.js` and
  add its key to the `mechanics` array in `Game.startRound()`.
