# TODO — Compagnie Sensible Indocile
> Derniere mise a jour : 2026-03-30
> Reviewer : senior SW engineer
> Stack : Jekyll + GitHub Pages · CSS modulaire · JS vanilla

---

## 🔴 P0 — Bugs bloquants
<!-- Casse en prod ou risque de regression immediate -->

- [x] **#55** ~~`404.html:33-36` | Hero utilise `presentation-logo-container` + `presentation-logo`~~ → corrigé
- [x] **#56** ~~`contact.html:35` | Logo utilise `presentation-logo`~~ → corrigé
- [x] **#57** ~~`spectacles.html:36` + `courtmetrage.html:36` | Logo utilise `presentation-logo`~~ → corrigé
- [x] **#58** ~~`courtmetrage.html:1` | Front matter `title: "Spectacles"`~~ → corrigé

- [ ] **#59** `courtmetrage.html:17` | `body class="spectacles-page"` partage le background/overlay de spectacles.html | Tout changement CSS sur `.spectacles-page` impacte courtmetrage — creer `.courtmetrage-page` + `css/pages/courtmetrage.css`
  > 👨‍💻 Changement en cascade : creer le CSS, l'importer dans `styles.css`, ajouter les selecteurs dans `utilities.css` (overlay, hero, background, main). Voir section dependances.

- [ ] **#60** `mecenat.html:56,59` | Styles inline `style="width:75%; height:auto;"` | Violation CLAUDE.md (seul `object-position` autorise en inline) — deplacer dans `mecenat.css`
  > 👨‍💻 Creer `.mecenat-gallery-img { width: 75%; height: auto; }` dans `mecenat.css`.

- [ ] **#61** 5 liens `target="_blank"` sans `rel="noopener"` | `spectacle-le-bain.html:56`, `footer.html:10`, `presentation.html:220`, `index.html:81`, `agenda.html:51` | Risque securite `window.opener` + fuite perf

---

## 🟠 P1 — Degradations visibles
<!-- Visible utilisateur, UX mesurably degradee -->

- [ ] **#62** Toutes pages | `<div class="menu-toggle">` devrait etre `<button>` | Non focusable clavier, pas de `role="button"`, pas d'`aria-label`, pas d'`aria-expanded` — inaccessible
  > 👨‍💻 Remplacer dans les 15 fichiers HTML en meme temps. Ajouter reset CSS pour `<button>` dans `components.css`. Mettre a jour `script.js` pour toggler `aria-expanded`.

- [ ] **#63** `presentation.html:206-243` | Modale membre dans `<main>` sans focus trap | Pas de gestion Escape, scroll body non bloque, focus non piege
  > 👨‍💻 Deplacer le markup avant `</body>`. Ajouter `keydown Escape` + focus trap dans `script.js`.

- [ ] **#64** 7+ fichiers CSS | Couleurs hardcodees hors `theme.css` | `#000` (responsive.css, spectacles.css, galerie.css), `#fff` (presentation.css, index.css), `#414141` (contact.css), `#2e7d32` (contact.css), `#444` (index.css), `#f0f0f0` / `#ccc` (presentation.css)
  > 👨‍💻 Creer les variables manquantes dans `theme.css` (`--color-black`, `--color-white`, `--color-border`, `--color-success`) AVANT de remplacer. Prioriser `responsive.css` (impact global).

- [ ] **#65** `layout.css:11` | `font-family: 'Playfair Display'` hardcode | Creer `--font-heading` dans `theme.css`

- [ ] **#66** `agenda.html:44-53` | Contenu perime (dates 2025) | Mettre a jour avec les dates actuelles ou afficher un message "dates a venir"

- [ ] **#67** `index.html:60-85` | Popup "Le Bain" avec `data-end-date="2026-01-04"` — date depassee | Le JS supprime le popup mais le HTML mort reste — nettoyer ou mettre a jour

- [ ] **#68** `spectacle-le-dahut.html:114-126` | 4 images galerie sans `loading="lazy"` | Contrairement aux autres galeries qui l'utilisent

---

## 🟡 P2 — Dette technique
<!-- Maintenabilite, accessibilite non bloquante, CSS orphelin -->

- [ ] **#69** CSS mort dans `index.css:34-57` | `.hero-image`, `.hero-text`, `.hero-text h1` — classes absentes du HTML
- [ ] **#70** CSS mort dans `presentation_spectacle.css:38-45` | `.spectacle-content` — classe absente du HTML
- [ ] **#71** CSS mort dans `galerie.css:15-18` | `.galerie-gallery` — non utilise (le HTML utilise `.gallery`)
- [ ] **#72** CSS mort dans `index.css:117-121` | `.btn-secondary:hover` — classe absente du HTML
- [ ] **#73** `presentation_spectacle.css` | `z-index: 2` sur 6 elements sans `position` explicite (`.spectacle-title`, `.spectacle-info`, etc.) — sans effet
  > 👨‍💻 Verifier si l'overlay `::before` recouvre ces elements. Si oui, ajouter `position: relative`. Sinon, supprimer le `z-index`.

- [ ] **#74** `.gallery-item` defini en doublon | `galerie.css:29-34` ET `presentation_spectacle.css:154-159` — memes proprietes | Mutualiser dans `utilities.css`
- [ ] **#75** `<br>` pour espacement | ~30 occurrences dans 6 pages | Utiliser `margin-bottom` CSS. Commencer par `spectacle-le-bain.html` (le plus visible)
- [ ] **#76** SEO : descriptions front matter trop courtes | 7 pages avec < 30 caracteres | Viser 120-160 caracteres
  > 👨‍💻 Exemple spectacles : "Decouvrez les spectacles de la Compagnie Sensible Indocile : Le Bain, actuellement au Theatre de la Croisee des Chemins a Paris."

- [ ] **#77** `agenda.html:46` | `<section class="spectacle-info">` — classe d'un autre contexte | Creer `.agenda-info` avec CSS dedie
- [ ] **#78** `index.html` + `presentation.html` | Pas de focus trap ni Escape sur le popup / modale
- [ ] **#79** `presentation.html:220` | `<a href="#" target="_blank">` — si JS echoue, ouvre un onglet vide
- [ ] **#80** `footer.html:3` | Copyright "2025" hardcode, remplace par JS | Si JS echoue, affiche 2025
- [ ] **#81** `footer.html` | Charge via `fetch()` JS et non via `{% include %}` Jekyll | 🔴 BLOQUE par CLAUDE.md (interdit de changer la structure du footer)
- [ ] **#82** Toutes sauf `index.html` | Pas de breadcrumb ou lien "Accueil" visible — seul le logo sert de retour
- [ ] **#83** `index.html` | Image popup PNG non optimisee — un WebP/JPEG reduit accelererait l'affichage

---

## 🟢 P3 — Ameliorations
<!-- Ni urgent ni bloquant -->

- [ ] **#84** `spectacles.html` | Pas de `<h2>` — saut de `<h1>` au contenu cartes | Structure heading incomplete
- [ ] **#85** `presentation.html:125` | Espace avant `=` dans `style ="object-position:..."` | Cosmétique, incohérent avec les autres occurrences
- [ ] **#86** Images PNG galerie | `lebain/*.png` probablement lourdes vs WebP | Compresser avec squoosh/imagemin avant commit
- [ ] **#87** `index.css:132` | `var(--font-base, "Inter", sans-serif)` — `--font-base` non defini dans `theme.css` | Le fallback fonctionne mais c'est incoherent
- [ ] **#88** `_config.yml:17` | Espace dans le nom de fichier logo `"Logo style LE BAIN.png"` | Fonctionne mais fragile avec certains outils
- [ ] **#89** `leonore-vanier/` | Utilise `html2pdf.js` CDN — dependance externe non approuvee par CLAUDE.md | A valider (page hors pattern)

---

## 🔒 Dette assumee
<!-- Problemes connus, volontairement non traites, avec justification -->

- `leonore-vanier/` | Page autonome avec son propre CSS/JS, hors pattern Jekyll | ⏸ Portfolio independant, volontairement decouple. Couleurs hardcodees et CDN specifiques a cette page.
- `index.html` | Pas de hero-logo ni body class (structure differente) | ⏸ Page d'accueil a structure unique (carrousel hero + nav integree). Ne pas forcer le pattern pages internes.
- `mecenat.html:50-51` | Iframes HelloAsso avec `onload` inline contenant du JS | ⏸ Impose par le widget HelloAsso — pas de controle sur le code d'integration.
- `contact.html:79` | Cle publique EmailJS en clair dans le HTML | ⏸ Cle *publique* (pas secrete) — fonctionnement normal d'EmailJS cote client.
- `footer.html` | Charge via `fetch()` au lieu de `{% include %}` | ⏸ CLAUDE.md interdit de modifier la structure du footer.

---

## ✅ Fait
<!-- Taches terminees, archivees ici avec date et auteur -->

- 2026-03-28 | `spectacles.html` + `courtmetrage.html` | Double `>` dans `<body>` corrige
- 2026-03-28 | `mecenat.html` | IDs `haWidget` dupliques → renommes `haWidget1` / `haWidget2`
- 2026-03-28 | `mecenat.html` | Typo `s` parasite dans h1 supprime
- 2026-03-28 | `mentions-legales.html` | Typos "Compagie Senseible" et "Indocible" corrigees
- 2026-03-28 | `spectacle-le-bain.html` | Typo "Colaboration" corrigee
- 2026-03-28 | `theme.css` | Faux commentaires `#` convertis en `/* */`
- 2026-03-28 | `galerie.html` | `</div>` orphelin supprime
- 2026-03-28 | `js/script.js` | Guard `if (!modal)` + consolidation 9 listeners → 1 + guard carrousel + suppression doublon parallax
- 2026-03-28 | `mecenat.html` + `agenda.html` | `</main>` manquantes ajoutees
- 2026-03-28 | `spectacle-stpb.html` | Typos "semblre", "cauchemars" corrigees
- 2026-03-28 | `presentation.html` | Point-virgule parasite + `style =` espace corrigee + `role="button"` sur 10 member-cards
- 2026-03-28 | `layout.css` | `@import` Playfair Display duplique supprime
- 2026-03-28 | CSS | `body::before` scope a `.xxx-page::before`
- 2026-03-28 | SEO/A11y | iframes YouTube `title` ajoute, 47 alts reecrits, skip-to-content 13 pages, favicons, theme-color, `aria-label` navs
- 2026-03-28 | `contact.html` | Honeypot `aria-hidden` + `tabindex="-1"`
- 2026-03-28 | `index.html` | Front matter title/description/lang ajoute
- 2026-03-28 | `_includes/schema-performer.html` | URL Facebook inactive supprimee
- 2026-03-28 | `spectacle-le-dahut/stpb` | `frameborder="0"` deprecie supprime
- 2026-03-28 | `components.css` | `.btn-reserver` factorise (supprime de index.css + presentation_spectacle.css)
- 2026-03-28 | `mecenat.html` + `agenda.html` | Classes `.presentation-*` remplacees par `.mecenat-*` / `.agenda-*`
- 2026-03-29 | 11 pages | Hamburger responsive ajoute + media queries gallery-grid/gallery + iframe HelloAsso responsive + breakpoint tablette 1024px
- 2026-03-29 | `index.css` | `.company-name-index` font-size `clamp()`
- 2026-03-29 | `contact.css` | `.form-submit-btn` responsive + feedback visuel envoi
- 2026-03-29 | `presentation.css` | Grayscale hover membres
- 2026-03-29 | `404.html` + `css/pages/404.css` | Page 404 creee
- 2026-03-29 | `index.html` | Popup `data-end-date` + condition JS
- 2026-03-29 | `spectacle-le-bain.html` + `galerie.html` | `loading="lazy"` sur 63 images
- 2026-03-29 | `utilities.css` | Patterns hero/logo/overlay/main/intro mutualises (~230 lignes dedupl.)
- 2026-03-30 | CSS | `.xxx-hero-image` mort supprime + `.xxx-page` background shorthand decoupe en longhand + mutualise dans `utilities.css`
- 2026-03-30 | #55 | `404.html` : classes `presentation-logo-container` / `presentation-logo` → `error-logo-container` / `error-logo` + `.error-hero` / `.error-logo-container` / `.error-logo` ajoutes dans `utilities.css`
- 2026-03-30 | #56 | `contact.html` : `presentation-logo` → `contact-logo`
- 2026-03-30 | #57 | `spectacles.html` + `courtmetrage.html` : `presentation-logo` → `spectacles-logo`
- 2026-03-30 | #58 | `courtmetrage.html` : front matter title "Spectacles" → "Films"

---

## 📎 Dependances entre taches
<!-- Taches qui doivent etre faites dans un ordre precis -->

- Faire **#59** (`.courtmetrage-page` + `courtmetrage.css`) AVANT de modifier `.spectacles-page` dans `spectacles.css` — les deux pages partagent la meme body class
- Faire **#56 + #57** (classes logo) dans spectacles, courtmetrage, contact, 404 EN MEME TEMPS pour eviter un etat intermediaire incoherent
- Faire **#55** (`.error-hero` dans `utilities.css`) AVANT de changer les classes dans `404.html` — sinon le hero perd toute hauteur
- Faire **#62** (`<button>` menu-toggle) dans les 15 fichiers HTML EN MEME TEMPS — un oubli creerait une incoherence
- Faire **#64** (variables couleur `theme.css`) AVANT de remplacer les couleurs hardcodees dans les autres CSS
- Faire **#74** (mutualiser `.gallery-item`) AVANT de supprimer le doublon de `galerie.css` ou `presentation_spectacle.css`
- Faire **#59** (decoupler courtmetrage) AVANT **#76** (descriptions SEO) — sinon confusion sur quelle page a quel title
