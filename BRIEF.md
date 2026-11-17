# Word Garden: brief

## Problem
Children aged about 4 to 7 who are starting to read English need lots of short, repeatable practice that gets harder only when they are ready. Most free word apps are loud, ad-driven, and jump between skills at random, so a child either stalls on something too hard or taps through something too easy.

## User
- **Child (4–7):** taps cards, hears words, collects stars. Can't read instructions well yet.
- **Parent or teacher:** wants to see at a glance how far the child has got, with no account and nothing to set up.

## Jobs to be done
- "Give me one thing to do next, at the right difficulty."
- "Tell me straight away if I got it right, and show me the word when I do."
- "Let me try again without feeling punished."

## v1 screens
1. **Garden map (home):** the current difficulty and a Play button, then 40 levels in 4 stages of 10 (Seedling, Sprout, Sunflower, Big Tree) with stars and locks.
2. **Card play:** one card per question, 5 per level. Right answer: on the same card the choice turns green, the completed word or sentence appears, it is read aloud, and the next card follows after 4 s. Wrong answer: the card shakes and the choice is crossed out.
   - Seedling L1–10: match a picture to its word (2 → 4 choices, same-length wrong choices).
   - Sprout L11–20: pick the missing letter (2 → 4 choices).
   - Sunflower L21–30: spell the word with letter tiles (0 → 3 decoy letters).
   - Big Tree L31–40: 20 sentences, 15 opposites, 15 rhymes.
   - No word is a question in two levels.
3. **Level result:** 1–3 stars from the number of slips, what unlocked, try again for 3 stars.

## Data
- Hand-written word bank (164 picture words, 20 sentences, 15 opposites, 15 rhymes). Pictures are system emoji, so no image hosting or licensing.
- Speech: the device's own text-to-speech (Web Speech API; native TTS plugin in the Android shell).
- Progress: localStorage only, no account.

## Success criteria
- A child can finish Level 1 without reading any instructions.
- Every card type works with touch, mouse and keyboard, and with a screen reader.
- Works offline after the first visit, at 375 px and on desktop, in light and dark.

## Out of scope (v1)
Multiple child profiles, a parent report, Tamil, recorded human audio, spaced repetition, more words per level.
