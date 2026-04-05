# TODO — Compagnie Sensible Indocile
> Derniere mise a jour : 2026-04-05 (v8 — #87, #88)
> Reviewer : senior SW engineer
> Stack : Jekyll + GitHub Pages · CSS modulaire · JS vanilla

---

## 🔴 P0 — Bugs bloquants
<!-- Casse en prod ou risque de regression immediate -->

- [x] **#55** ~~`404.html:33-36` | Hero utilise `presentation-logo-container` + `presentation-logo`~~ → corrigé
- [x] **#56** ~~`contact.html:35` | Logo utilise `presentation-logo`~~ → corrigé
- [x] **#57** ~~`spectacles.html:36` + `courtmetrage.html:36` | Logo utilise `presentation-logo`~~ → corrigé
- [x] **#58** ~~`courtmetrage.html:1` | Front matter `title: "Spectacles"`~~ → corrigé

- [x] **#59** ~~`courtmetrage.html:17` | `body class="spectacles-page"`~~ → découplé : `.courtmetrage-page` + `courtmetrage.css` créé + 7 sélecteurs ajoutés dans `utilities.css`
- [x] **#60** ~~`mecenat.html:56,59` | Styles inline~~ → remplacés par `.mecenat-gallery-img` dans `mecenat.css`
- [x] **#61** ~~4 liens `target="_blank"` sans `rel="noopener"`~~ → corrigé (`agenda.html:51` n'avait pas de `target="_blank"`)

---

## 🟠 P1 — Degradations visibles
<!-- Visible utilisateur, UX mesurably degradee -->

- [x] **#62** ~~Toutes pages | `<div class="menu-toggle">` devrait etre `<button>`~~ → corrigé : 13 HTML `<button>` + reset CSS `components.css` + `aria-expanded`/`aria-label` toggle dans `script.js` + `focus-visible`

- [x] **#63** ~~`presentation.html:206-243` | Modale membre dans `<main>` sans focus trap~~ → corrigé : modale déplacée hors `<main>`, `<span class="close">` → `<button>`, focus trap + Escape + scroll lock + `role="dialog"` + `aria-modal` dans `script.js`

- [x] **#64** ~~7+ fichiers CSS | Couleurs hardcodees hors `theme.css`~~ → corrigé : 6 variables créées dans `theme.css` (`--color-black/white/gray-dark/border/bg-light/success`), 24 remplacements dans responsive.css, spectacles.css, galerie.css, presentation.css, contact.css, index.css, components.css

- [x] **#65** ~~`layout.css:11` | `font-family: 'Playfair Display'` hardcode~~ → corrigé : `--font-heading` créé dans `theme.css`, remplacé dans `layout.css`

- [x] **#66** ~~`agenda.html:44-53` | Contenu perime (dates 2025)~~ → corrigé : `<h2>2025</h2>` supprimé, contenu remplacé par message remerciement + annonce Avignon 2026, lien `mecenat.html` sur « ici »

- [x] **#67** ~~`index.html:60-85` | Popup "Le Bain" avec `data-end-date="2026-01-04"` — date depassee~~ → corrigé : contenu remplacé par annonce Avignon 2026, image + bouton réservation supprimés, `data-end-date` mis à `2026-08-01`, lien `mecenat.html` sur « ici »

- [x] **#68** ~~`spectacle-le-dahut.html:114-126` | 4 images galerie sans `loading="lazy"`~~ → corrigé : `loading="lazy"` ajouté sur les 4 `<img>` de la galerie

---

## 🟡 P2 — Dette technique
<!-- Maintenabilite, accessibilite non bloquante, CSS orphelin -->

- [x] **#69** ~~CSS mort dans `index.css:34-57` | `.hero-image`, `.hero-text`, `.hero-text h1`~~ → supprimé (+ `.hero-text` dans `responsive.css:176-183`)

- [x] **#70** ~~CSS mort dans `presentation_spectacle.css:38-45` | `.spectacle-content`~~ → supprimé

- [x] **#71** ~~CSS mort dans `galerie.css:15-18` | `.galerie-gallery`~~ → supprimé

- [x] **#72** ~~CSS mort dans `index.css:117-121` | `.btn-secondary:hover`~~ → supprimé

- [x] **#73** ~~`presentation_spectacle.css` | `z-index: 2` sur 8 éléments sans `position` explicite~~ → supprimé (`::before` overlay a `z-index: -1` dans `utilities.css`, donc jamais au-dessus du contenu)

- [x] **#74** ~~`.gallery-item` defini en doublon~~ → mutualisé dans `utilities.css`, doublons remplacés par commentaires dans `galerie.css` et `presentation_spectacle.css`
- [x] **#75** ~~`<br>` pour espacement~~ → 29 `<br>` supprimés dans 4 pages (le-bain, le-dahut, stpb, agenda). CSS : `margin-bottom: 1em` sur `.spectacle-description p`, `margin-bottom: 15px` sur `.spectacle-credits ul`
  > 🟡 Restant : `presentation.html` (10 `<br>` = line breaks nom/rôle dans member-cards) et `mentions-légales.html` (6 `<br>` = formatage adresse) — ce sont des `<br>` de contenu, pas d'espacement
- [x] **#76** ~~SEO : descriptions front matter trop courtes~~ → 10 pages reécrites (120-160 caractères), seules `index.html` (déjà OK), `404.html` et `mentions-légales.html` non touchées
- [x] **#77** ~~`agenda.html:46` | `<section class="spectacle-info">`~~ → renommé `.agenda-info` + CSS dédié dans `agenda.css`
- [x] **#78** ~~`index.html` | Pas de focus trap ni Escape sur le popup~~ → `openPopup()`/`closePopup()`/`popupKeyHandler()` ajoutés dans `script.js` (pattern identique à #63 modale membre)
- [x] **#90** ~~`index.css` | Couleurs popup hardcodées (`#111`, `#555`, `#eee`) hors `theme.css`~~ → remplacées par `var(--text-color)`, `var(--color-gray-dark)`, `var(--color-bg-light)`
- [x] **#79** ~~`presentation.html:220` | `<a href="#" target="_blank">` — si JS echoue, ouvre un onglet vide~~ → `target="_blank"` + `rel="noopener"` supprimés du HTML, ajoutés dynamiquement via JS dans `script.js`
- [x] **#80** ~~`footer.html:3` | Copyright "2025" hardcode~~ → année dans `<span class="copyright-year">2026</span>`, mise à jour DOM dans `script.js` (plus de string replace fragile)
- [ ] **#81** `footer.html` | Charge via `fetch()` JS et non via `{% include %}` Jekyll | 🔴 BLOQUE par CLAUDE.md (interdit de changer la structure du footer)
- [ ] **#82** Toutes sauf `index.html` | Pas de breadcrumb ou lien "Accueil" visible — seul le logo sert de retour
- [ ] **#83** `index.html` | Image popup PNG non optimisee — un WebP/JPEG reduit accelererait l'affichage

---

## 🟢 P3 — Ameliorations
<!-- Ni urgent ni bloquant -->

- [x] **#84** ~~`spectacles.html` | Pas de `<h2>` — saut de `<h1>` au contenu cartes~~ → `<h2>À l'affiche</h2>` ajouté dans `<section class="cards">`
- [x] **#85** ~~`presentation.html:125,140,156` | Espace avant `=` dans `style ="object-position:..."`~~ → 3 occurrences corrigées (`style ="` → `style="`)
- [ ] **#86** Images PNG galerie | `lebain/*.png` : 17 fichiers, **72.9 MB** total (moy. 4.4 MB), top 3 > 8 MB | ⏸ Nécessite outil externe (squoosh.dev recommandé) — CLAUDE.md interdit dépendances non approuvées
- [x] **#87** ~~`index.css:101` | `var(--font-base, "Inter", sans-serif)` — `--font-base` non défini~~ → `--font-base: "Inter", sans-serif` ajouté dans `theme.css`
- [x] **#88** ~~`_config.yml:17` | Espace dans le nom de fichier logo `"Logo style LE BAIN.png"`~~ → fichier renommé `logo-le-bain.png` + 28 références mises à jour dans 16 fichiers (⚠️ `_config.yml` modifié)
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
- 2026-03-31 | #59 | `courtmetrage.html` découplé de `spectacles-page` → `.courtmetrage-page` + `css/pages/courtmetrage.css` + 7 sélecteurs `utilities.css` + `@import` dans `styles.css`
- 2026-03-31 | #60 | `mecenat.html` : styles inline `width:75%` → classe `.mecenat-gallery-img` dans `mecenat.css`
- 2026-03-31 | #61 | `rel="noopener"` ajouté sur 4 liens `target="_blank"` (footer, spectacle-le-bain, presentation, index)
- 2026-03-31 | #62 | 13 HTML : `<div class="menu-toggle">` → `<button>` + `aria-expanded` + `aria-label` + reset CSS `components.css` + `focus-visible` + toggle JS `script.js`
- 2026-03-31 | #63 | `presentation.html` : modale déplacée hors `<main>`, `<span class="close">` → `<button>`, focus trap + Escape + scroll lock + `role="dialog"` + `aria-modal` dans `script.js`
- 2026-03-31 | #64 | `theme.css` : 6 variables couleur créées + 24 remplacements dans 7 fichiers CSS (responsive, spectacles, galerie, presentation, contact, index, components)
- 2026-03-31 | #65 | `theme.css` : `--font-heading` créé + `layout.css` : `font-family` remplacé par `var(--font-heading)`
- 2026-04-04 | #66 | `agenda.html` : contenu périmé (dates 2025) remplacé par message remerciement + annonce Avignon 2026, lien vers `mecenat.html`
- 2026-04-04 | #67 | `index.html` : popup Le Bain remplacé par annonce Avignon 2026, image/bouton supprimés, `data-end-date` → `2026-08-01`, lien vers `mecenat.html`
- 2026-04-04 | #68 | `spectacle-le-dahut.html` : `loading="lazy"` ajouté sur 4 images galerie
- 2026-04-04 | #69 | `index.css` : `.hero-image`, `.hero-text`, `.hero-text h1` supprimés + `responsive.css` : `.hero-text` responsive supprimé
- 2026-04-04 | #70 | `presentation_spectacle.css` : `.spectacle-content` supprimé
- 2026-04-04 | #71 | `galerie.css` : `.galerie-gallery` supprimé
- 2026-04-04 | #72 | `index.css` : `.btn-secondary:hover` supprimé
- 2026-04-04 | #73 | `presentation_spectacle.css` : `z-index: 2` supprimé de 8 sélecteurs sans `position` (overlay `::before` à `z-index: -1`, donc inutile)
- 2026-04-05 | #74 | `.gallery-item` + `.gallery-item img` mutualisés dans `utilities.css`, doublons supprimés de `galerie.css` et `presentation_spectacle.css`
- 2026-04-05 | #75 | 29 `<br>` d'espacement supprimés dans `spectacle-le-bain.html` (10), `spectacle-le-dahut.html` (10), `spectacle-stpb.html` (8), `agenda.html` (1). CSS ajouté : `.spectacle-description p { margin-bottom: 1em }` + `.spectacle-credits ul { margin-bottom: 15px }`
- 2026-04-05 | #76 | Descriptions SEO reécrites (120-160 chars) dans 10 pages : presentation, spectacles, spectacle-le-bain, spectacle-le-dahut, spectacle-stpb, courtmetrage, mecenat, contact, galerie, agenda
- 2026-04-05 | #77 | `agenda.html` : `.spectacle-info` → `.agenda-info` + `.agenda-info` CSS créé dans `agenda.css`
- 2026-04-05 | #78 | `script.js` : popup index.html — focus trap, Escape, scroll lock, restauration focus (pattern #63)
- 2026-04-05 | #90 | `index.css` : couleurs popup `#111`, `#555`, `#eee` remplacées par `var(--text-color)`, `var(--color-gray-dark)`, `var(--color-bg-light)`
- 2026-04-05 | #79 | `presentation.html` + `script.js` : `target="_blank"` + `rel="noopener"` supprimés du HTML modale Instagram, ajoutés dynamiquement en JS
- 2026-04-05 | #80 | `footer.html` + `script.js` : année copyright `2025` → `<span class="copyright-year">2026</span>` + mise à jour DOM (plus de string replace)
- 2026-04-05 | #84 | `spectacles.html` : `<h2>À l'affiche</h2>` ajouté dans `<section class="cards">` — heading hierarchy h1→h2 complétée
- 2026-04-05 | #85 | `presentation.html` : 3× `style ="` → `style="` (lignes 125, 140, 156) — cohérence attributs HTML
- 2026-04-05 | #86 | Analyse : 17 PNG dans `lebain/`, 72.9 MB total — nécessite compression manuelle (squoosh.dev), non exécutable par Claude (CLAUDE.md)
- 2026-04-05 | #87 | `theme.css` : `--font-base: "Inter", sans-serif` défini — cohérence avec `var(--font-base)` dans `index.css`
- 2026-04-05 | #88 | `images/Logo style LE BAIN.png` → `images/logo-le-bain.png` + 28 refs dans 16 fichiers (`_config.yml`, `schema-performer.html`, 13 HTML, `leonore-vanier/index.html`)

---

## 📎 Dependances entre taches
<!-- Taches qui doivent etre faites dans un ordre precis -->

- ~~Faire **#59** (`.courtmetrage-page` + `courtmetrage.css`) AVANT `.spectacles-page`~~ ✅ fait
- ~~Faire **#56 + #57** (classes logo) EN MEME TEMPS~~ ✅ fait
- ~~Faire **#55** (`.error-hero` dans `utilities.css`) AVANT `404.html`~~ ✅ fait
- ~~Faire **#62** (`<button>` menu-toggle) dans les 13 fichiers HTML EN MEME TEMPS~~ ✅ fait
- ~~Faire **#64** (variables couleur `theme.css`) AVANT de remplacer les couleurs hardcodees~~ ✅ fait
- ~~Faire **#74** (mutualiser `.gallery-item`) AVANT de supprimer le doublon~~ ✅ fait
- ~~Faire **#59** (decoupler courtmetrage) AVANT **#76** (descriptions SEO)~~ ✅ fait
