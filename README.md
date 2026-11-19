# Word Garden

A card game that grows a child's English, one level at a time.

Live: https://word-garden-sable.vercel.app

- **40 levels in 4 stages of 10, 5 cards each.** Seedling: match the picture to its word. Sprout: find the missing letter. Sunflower: spell the word with letter tiles. Big Tree: finish sentences, opposites and rhymes.
- **No repeats.** About 160 picture words are dealt into fixed sets, so a word is a question in only one level; every Big Tree sentence, opposite and rhyme is used once.
- **Difficulty follows the child.** A level opens only when the one before it is finished. Inside each stage the words get longer, choices go from 2 to 4 (wrong picture choices have the same length), and spelling decoys go from 0 to 3.
- **One card per question.** Right: the choice turns green, the card shows the completed word or sentence in Andika (a font for early readers), says it aloud, and moves on after 2 seconds (Next skips the wait). Wrong: the card shakes and the choice is crossed out.
- **Sound effects:** a bright rising chime for a right answer and a soft low "uh-oh" for a wrong one, made with Web Audio (no sound files). The word is read aloud just after the chime.
- **Real photos by default:** each picture word shows a real photo (cartoons for people, symbols and abstract ideas); switch to cartoons in Settings.
- **The map grows with the child:** only finished stages and the current one are shown, with a locked teaser for the next stage. The "Your difficulty now" banner is filled with the chosen colour.
- **Settings, made personal:** the child's name (used in "Hi Asha!" and in the cheers: "Great job, Asha!"), a buddy from ten 3D animals, a favourite colour (Leaf, Ocean, Berry, Sunset, Grape; each is darkened where needed so white text passes WCAG AA, with lighter versions in dark mode), the buddy's cheer style (Cheerful, Calm or Silly), reading voice speed (Slow, Normal, Fast) and sound effects on or off. Everything is saved on the device, and Start over clears only the stars.
- **Stars, not scores:** 3 for a perfect round, 2 for up to two slips, 1 otherwise. Progress stays on the device.
- Works with touch, mouse and keyboard (type the letters on spelling cards, Backspace to undo, Esc or the Home button on every screen to get back to the map), and announces right and wrong answers to screen readers.
- Installable PWA that works offline after the first visit; Android app via a Capacitor shell with native text-to-speech.

Photos: 142 real photos from [Openverse](https://openverse.org) under CC BY, CC BY-SA, CC0 or the Public Domain Mark, resized to 480 px squares in `photos/` (most cropped, a few long objects fitted), with every title, creator, licence and source in `photos/credits.json` and on the in-app **Photo credits** screen (Settings → Pictures). People, symbols and abstract pictures, and words without a clear photo, stay cartoons. Settings → Pictures switches between Photos (default) and Cartoons.

Cartoons: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) in the 3D style, © Microsoft Corporation, MIT licence, resized to 160 px PNGs in `img/` (named by code point; `tools/img-index.mjs` lists them for offline caching).

Built on the [Kolam design system](https://tgopinath.github.io/kolam-design-system/) (vendored in `kolam/`), with the primary colour set to garden green.

## Run locally

Plain HTML, CSS and JS, no build step: `python3 -m http.server` in this folder and open `index.html`.

`node tools/shots.mjs` re-captures the portfolio screenshots into `prototype/shots/`.

Designed and built by Gopinath Thandapani with AI-assisted coding.
