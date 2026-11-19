# Fonts

## Su Brush (current headline font)
`assets/fonts/SuBrush.woff`

## Font set 2 – Sujin's handwriting ("use my handwriting font")
Files: `assets/fonts/SujinHandwriting.woff2` and `.ttf`
CSS family: `"Sujin Handwriting"` (variable `--hand`), utility class `.hand`.

Not applied anywhere by default. To use it, add `class="hand"` to an element or
set `font-family: var(--hand)`.

Characters: A–Z, a–z and space only. Digits and punctuation (. , ! ? € …) fall
back to the body font (DM Sans). Missing characters can be added by redrawing them.

## Font set 3 – Sujin handwriting bold
Files: `assets/fonts/SujinHandwritingBold.woff2` and `.ttf`
CSS family: `"Sujin Handwriting Bold"` (variable `--hand-bold`), utility class `.hand-bold`.
Marker-style, thick strokes. Not applied anywhere by default. Characters: A–Z, a–z and space only;
digits and punctuation fall back to the body font.
