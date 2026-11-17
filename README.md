# Word Garden

A card game that grows a child's English, one level at a time.

Live: https://word-garden-sable.vercel.app

- **12 levels in 4 stages.** Seedling: match the picture to its word. Sprout: find the missing letter. Sunflower: spell the word with letter tiles. Big Tree: finish sentences, opposites and rhymes.
- **Difficulty follows the child.** A level opens only when the one before it is finished, and each level adds cards, choices, longer words or decoy letters.
- **Every question is a card.** Right: it flips to the picture, the word in Andika (a font for early readers) and Hear it. Wrong: it shakes and the choice is crossed out.
- **Stars, not scores:** 3 for a perfect round, 2 for up to two slips, 1 otherwise. Progress stays on the device.
- Works with touch, mouse and keyboard (type the letters on spelling cards, Backspace to undo, Esc for the map), and announces right and wrong answers to screen readers.
- Installable PWA that works offline after the first visit; Android app via a Capacitor shell with native text-to-speech.

Built on the [Kolam design system](https://tgopinath.github.io/kolam-design-system/) (vendored in `kolam/`), with the primary colour set to garden green.

## Run locally

Plain HTML, CSS and JS, no build step: `python3 -m http.server` in this folder and open `index.html`.

`node tools/shots.mjs` re-captures the portfolio screenshots into `prototype/shots/`.

Designed and built by Gopinath Thandapani with AI-assisted coding.
