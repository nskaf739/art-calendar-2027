# Fonts

## Font set 1 – Su Brush (headlines)
`assets/fonts/SuBrush.woff`

## Font set 2 – Sujin's handwriting ("use my handwriting font")
Files: `assets/fonts/SujinHandwriting.woff2` and `.ttf`
CSS family: `"Sujin Handwriting"` (variable `--hand`), utility class `.hand`.

Not applied anywhere by default. To use it, add `class="hand"` to an element or
set `font-family: var(--hand)`.

Characters: A–Z, a–z and space only. Digits and punctuation (. , ! ? € …) fall
back to the body font (DM Sans). Missing characters can be added by redrawing them.
