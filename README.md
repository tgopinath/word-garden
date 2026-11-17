# Word Garden

A card game that grows a child's English, one level at a time.

Live: https://word-garden-sable.vercel.app

- **40 levels in 4 stages of 10, 5 cards each.** Seedling: match the picture to its word. Sprout: find the missing letter. Sunflower: spell the word with letter tiles. Big Tree: finish sentences, opposites and rhymes.
- **No repeats.** About 160 picture words are dealt into fixed sets, so a word is a question in only one level; every Big Tree sentence, opposite and rhyme is used once.
- **Difficulty follows the child.** A level opens only when the one before it is finished. Inside each stage the words get longer, choices go from 2 to 4 (wrong picture choices have the same length), and spelling decoys go from 0 to 3.
- **One card per question.** Right: the choice turns green, the card shows the completed word or sentence in Andika (a font for early readers), says it aloud, and moves on after 4 seconds (Next skips the wait). Wrong: the card shakes and the choice is crossed out.
- **Stars, not scores:** 3 for a perfect round, 2 for up to two slips, 1 otherwise. Progress stays on the device.
- Works with touch, mouse and keyboard (type the letters on spelling cards, Backspace to undo, Esc for the map), and announces right and wrong answers to screen readers.
- Installable PWA that works offline after the first visit; Android app via a Capacitor shell with native text-to-speech.

Built on the [Kolam design system](https://tgopinath.github.io/kolam-design-system/) (vendored in `kolam/`), with the primary colour set to garden green.

## Run locally

Plain HTML, CSS and JS, no build step: `python3 -m http.server` in this folder and open `index.html`.

`node tools/shots.mjs` re-captures the portfolio screenshots into `prototype/shots/`.

Designed and built by Gopinath Thandapani with AI-assisted coding.
