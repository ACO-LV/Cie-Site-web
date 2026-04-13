# TODO — Compagnie Sensible Indocile
> Derniere mise a jour : 2026-04-13 (v20 — audit exhaustif, 6 nouveaux tickets #127-#132)
> Reviewer : senior SW engineer
> Stack : Jekyll + GitHub Pages · CSS modulaire · JS vanilla

---

## 🔴 P0 — Bugs bloquants
<!-- Casse en prod ou risque de regression immediate -->

- [ ] **#127** `css/theme.css:14` | Police `Nanum Myeongjo` declaree dans `--font-primary` mais jamais chargee — aucun `@import` ni `<link>` Google Fonts n'existe | Le body text de TOUTES les pages tombe en fallback `serif` generique. Correctif : ajouter `@import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap');` dans `theme.css` (a cote du Playfair Display existant), OU si le serif generique est voulu, renommer la variable pour documenter l'intention.
  > 👨‍💻 Verifier visuellement avant/apres — Nanum Myeongjo est une police coreenne a empattement fin, tres differente de Times New Roman. Si le rendu actuel convient a l'equipe, deplacer en dette assumee avec justification. Si le rendu doit changer, tester sur les 3 breakpoints (320/768/1280) car la taille de la police peut varier.

- [x] **#91** ~~`index.html:59-79` | Popup "Le Bain — Avignon 2026" : texte deborde sur la croix de fermeture, lien "ici" trop discret et inaccessible~~ → corrige : `.popup-body` padding-top 2rem, texte restructure avec `.popup-title` + 2× `.popup-text`, lien "ici" remplace par `<a class="btn popup-btn">Nous soutenir</a>`, CSS ajoute dans `index.css`

- [x] **#92** ~~`css/pages/index.css:112` | Popup deborde a 320px (`max-width: 420px` sans contrainte viewport)~~ → `max-width: min(420px, calc(100vw - 2rem))` — a 320px donne 288px avec 1rem de marge de chaque cote

---

## 🟠 P1 — Degradations visibles
<!-- Visible utilisateur, UX mesurably degradee -->

- [ ] **#131** `presentation.html` | `</div>` manquant pour `.presentation-members` — la div ouverte ligne 51 n'est jamais fermee avant `</main>` ligne 205 | Le navigateur auto-ferme mais le DOM resultant est imprevisible. Correctif : ajouter `</div>` apres la derniere `</a>` member-card (ligne 204) et avant `</main>` (ligne 205).
  > 👨‍💻 Ne PAS deplacer la modale `#memberModal` — elle est volontairement hors de `<main>` pour le focus trap (#63). Ajouter le `</div>` UNIQUEMENT entre la derniere card et `</main>`.

- [ ] **#130** `spectacle-le-bain.html:175` + `galerie.html:104` | Typo `alt="Portait Lucia"` (2 occurrences) | Corriger en `alt="Portrait de Lucia"`. Les deux fichiers referencent la meme image (`lebain/lebain47.jpeg`).
  > 👨‍💻 Mettre a jour les DEUX fichiers dans le meme commit — sinon on corrige un et on oublie l'autre.

- [ ] **#95** `images/` | 175 MB d'images total, dont 20+ PNG > 1 MB (pic : lebain/20.png 8.6 MB, lebain/18.png 8.2 MB, lebain/17.png 8.1 MB) | Convertir les PNG photos en JPEG ou WebP. Priorite : 14 fichiers `lebain/*.png` totalisant ~70 MB. Puis les affiches (`affichelebain.png` 3.6 MB, `afficheledahut.png` 5.7 MB). Mettre a jour les chemins dans galerie.html, spectacle-le-bain.html et mecenat.html si les extensions changent.
  > 👨‍💻 C'est la premiere chose que Google PageSpeed signalera. Un visiteur mobile en 3G telecharge 175 MB. Utiliser squoosh.dev ou cwebp (pas d'outil npm par CLAUDE.md). Attention : les memes images sont referencees dans DEUX pages (galerie.html ET spectacle-le-bain.html) — mettre a jour les deux.

- [ ] **#96** `leonore-vanier/index.html:72,87` | Attributs HTML colles : `decoding="async"style="object-position:..."` (espace manquant avant `style=`) | Ajouter un espace : `decoding="async" style="object-position:..."`. 2 occurrences.
  > 👨‍💻 Certains parseurs HTML ignorent le second attribut quand il est colle au precedent. Risque : `object-position` ne s'applique pas et les photos sont mal cadrees.

- [x] **#93** ~~`agenda.html:45-49` | Lien "ici" trop faible + texte a ajuster~~ → corrige : texte restructure avec `.agenda-highlight` + paragraphes separes, lien "ici" remplace par `<a class="btn">Nous soutenir</a>`, CSS ajoute dans `agenda.css` (coherent avec popup #91)

- [Obsolete] **#94** — PERIME apres #114 (images adhesion.png/bienfaiteur.png supprimees par les tier cards texte)

- [x] **#123** ~~`spectacle-le-bain.html:78-94` + `presentation_spectacle.css` | Synopsis blockquote~~ → `<p><strong>` remplace par `<blockquote>`, CSS `.spectacle-description blockquote` ajoute

- [x] **#124** ~~`spectacle-le-bain.html` + `presentation_spectacle.css` | Section livre~~ → `<section class="spectacle-book">` inseree. Image `livre-le-bain.jpg` presente → voir #125

- [x] **#125** ~~`images/lebain/livre-le-bain.jpg` | Image couverture absente~~ → fichier depose (6 KB, 2026-04-13). Le HTML `spectacle-le-bain.html:95` est cable.

- [x] **#119** ~~`index.html` + `index.css` | Sous-titre "Compagnie de theatre"~~ → fait
- [x] **#120** ~~`index.html` + `index.css` | Bloc CTA hero 2 boutons~~ → fait

---

## 🟡 P2 — Dette technique
<!-- Maintenabilite, accessibilite non bloquante, CSS orphelin -->

- [ ] **#129** `spectacle-le-dahut.html:2` | Front matter title "Spectacle - Le Dahut" alors que c'est un court-metrage | La `description` dit correctement "court-metrage" mais le `title` (affiche dans l'onglet navigateur et Google) dit "Spectacle". Corriger en `"Film - Le Dahut – Compagnie Sensible Indocile"`.
  > 👨‍💻 Coherence avec `courtmetrage.html` qui dit "Films". Ne PAS changer la `description` — elle est deja correcte.

- [ ] **#128** `galerie.html:42` | `<section id="main-content" class="gallery">` au lieu de `<main id="main-content">` | Les lecteurs d'ecran ne detectent pas de landmark `<main>`. Le `skip-to-content` fonctionne mais la semantique est degradee. Correctif : remplacer la `<section>` par `<main id="main-content" class="gallery">` et ajouter `</main>` avant le footer.
  > 👨‍💻 Verifier que les styles CSS `.gallery` ne dependent pas du selecteur `section.gallery`. Grep : seul `galerie.css` definit `.gallery` sans prefixe `section`.

- [ ] **#101** `css/` (sauf components.css) | Accessibilite : pas de style `:focus-visible` sur les liens de navigation et liens generaux | Seul `.menu-toggle` a un `:focus-visible`. Ajouter dans `components.css` : `a:focus-visible { outline: 2px solid var(--color-bordeaux); outline-offset: 2px; }`. Tester sur les navs desktop et mobile, les liens footer, et les liens dans le contenu.
  > 👨‍💻 Ne PAS utiliser `:focus` seul — cela montre un outline au clic souris aussi. `:focus-visible` cible uniquement la navigation clavier.

- [ ] **#102** `index.html` | Pas de landmark `<main>` — seule page (avec galerie.html) sans | Ajouter `<main id="main-content">` autour du contenu entre le hero et le footer. Le `skip-to-content` pointe vers `#hero` ce qui est acceptable, mais un `<main>` ameliore la navigation par lecteur d'ecran.

- [ ] **#103** `mentions-legales.html:45,51,62` | `<br>` utilises pour l'espacement vertical entre sections | Remplacer par `margin-bottom` CSS sur `.mentions-info` ou ses enfants.
  > 👨‍💻 Ce sont des `<br>` entre les `<section>` et `<p>` — clairement de l'espacement, pas du contenu.

- [ ] **#104** `courtmetrage.html` | Pas de `<h2>` dans la section `.cards` — incoherent avec `spectacles.html` qui a `<h2>A l'affiche</h2>` | Ajouter `<h2>Nos films</h2>` ou `<h2>A l'affiche</h2>` dans `<section class="cards">`.

- [ ] **#105** `leonore-vanier/index.html:152,154` | Balises `</br>` invalides (HTML void element, pas de fermeture) | Remplacer les occurrences de `</br>` par `<br>`.

- [ ] **#106** `leonore-vanier/index.html:152` | Typo "Intitation" | Corriger en "Initiation".

- [ ] **#107** `leonore-vanier/index.html:154` | Parenthese orpheline : "Khadija El Mahdi)" — `)` en trop | Supprimer la parenthese.

- [ ] **#108** `css/theme.css:1` | Google Fonts charge via `@import url()` en CSS — render-blocking | Deplacer dans le `<head>` HTML avec `<link rel="preconnect">` + `<link rel="stylesheet">`. Alternative : accepter en dette assumee (faible trafic).

- [ ] **#118** `css/pages/mecenat.css` | Verifier hover `.btn-reserver` dans le contexte mecenat | Confirmer visuellement que `scale(1.05)` (layout.css) + `--color-dark-bordeaux` (components.css) est satisfaisant sur fond sombre.

- [ ] **#81** `footer.html` | Charge via `fetch()` JS et non via `{% include %}` Jekyll | 🔴 BLOQUE par CLAUDE.md (interdit de changer la structure du footer)

- [ ] **#82** Toutes sauf `index.html` | Pas de breadcrumb ou lien "Accueil" visible — seul le logo sert de retour

- [x] **#97** ~~`js/script.js` | Code mort bioModal~~ → supprime
- [x] **#98** ~~`css/components.css` | CSS orphelin `.social-links`~~ → supprime
- [x] **#99** ~~`css/responsive.css` | CSS orphelin `.logo`, `.company-name`~~ → supprime
- [x] **#109** ~~`spectacle-stpb.html:96` | Image sans `loading="lazy"`~~ → ajoute
- [x] **#126** ~~`css/responsive.css` | Breakpoints section livre~~ → fait
- [x] **#121** ~~`css/responsive.css` | Breakpoints hero CTA~~ → fait
- [x] **#122** ~~`css/pages/index.css` | Fade-in echelonne hero~~ → fait

---

## 🟢 P3 — Ameliorations
<!-- Ni urgent ni bloquant -->

- [ ] **#132** `spectacle-le-bain.html` | La page detail ne mentionne pas la prochaine date (Avignon 2026) — seuls `agenda.html` et `mecenat.html` en parlent | Ajouter une section ou un encart "Prochaine date : Festival OFF d'Avignon 2026" avec lien vers `mecenat.html`. Decision de contenu a valider.

- [ ] **#110** `galerie.html` + `spectacle-le-bain.html` | Alt textes trop courts sur certaines images : "Guilherme", "Clara", "Mailys", "Affiche spectacle" | Enrichir avec description visuelle ("Portrait de Guilherme en scene", etc.)

- [ ] **#111** `presentation.html` | `<a href="#">` sur les 10 member-cards — scroll-to-top si JS echoue | Deja mitige par `e.preventDefault()` + `role="button"`. Amelioration : remplacer par `<button>` styles comme cartes.
  > 👨‍💻 Faible priorite — JS charge sur toutes les pages. Pattern a11y plus propre neanmoins.

- [ ] **#112** `spectacles.html:46-51` + `courtmetrage.html:45-56` | `<a>` encapsulant `<div class="card">` — le lien tire son nom accessible du alt de l'image seul | Ajouter `aria-label="Voir le spectacle Le Bain"` (etc.) pour plus de clarte aux lecteurs d'ecran.

- [ ] **#113** `leonore-vanier/index.html` | Pas de front matter Jekyll, pas de `{% seo %}` | Si la page doit etre indexee par Google, ajouter front matter + `{% seo %}`. Sinon, documenter que c'est un mini-site standalone volontairement hors Jekyll.

- [ ] **#86** Images PNG galerie | `lebain/*.png` : 15+ fichiers, ~70 MB | Necessite outil externe (squoosh.dev recommande) — CLAUDE.md interdit dependances non approuvees. Voir aussi **#95** (P1).

- [ ] **#89** `leonore-vanier/` | Utilise `html2pdf.js` CDN — dependance externe non approuvee par CLAUDE.md | A valider (page hors pattern)

---

## 🔒 Dette assumee
<!-- Problemes connus, volontairement non traites, avec justification -->

- `leonore-vanier/` | Page autonome avec son propre CSS/JS, hors pattern Jekyll | ⏸ Portfolio independant, volontairement decouple. Couleurs hardcodees et CDN specifiques a cette page.
- `index.html` | Pas de hero-logo ni body class (structure differente) | ⏸ Page d'accueil a structure unique (carrousel hero + nav integree). Ne pas forcer le pattern pages internes.
- `mecenat.html:50-51` | Iframes HelloAsso avec `onload` inline contenant du JS | ⏸ Impose par le widget HelloAsso — pas de controle sur le code d'integration.
- `contact.html:79` | Cle publique EmailJS en clair dans le HTML | ⏸ Cle *publique* (pas secrete) — fonctionnement normal d'EmailJS cote client.
- `footer.html` | Charge via `fetch()` au lieu de `{% include %}` | ⏸ CLAUDE.md interdit de modifier la structure du footer.
- `css/styles.css` | Chaine de 17 `@import` sequentiels | ⏸ Accepte : pas de bundler dans le stack (CLAUDE.md). Le gain de maintenabilite prime.
- Overlays `rgba()` hardcodes par page | Chaque page a un taux d'opacite different (0.2 a 0.8) | ⏸ Pas candidat a une variable CSS unique — la valeur est intentionnellement differente par page.
- `mecenat.html` refonte #114-#115 | `.tier-price` + CTA utilisent `var(--color-bordeaux)` (#8b0000) au lieu de `#ff6b6b` (maquette) | ⏸ Couleur hardcodee interdite (CLAUDE.md).
- `mecenat.html` refonte #114-#115 | Progress bar couleur unie `var(--color-bordeaux)` au lieu du degrade maquette | ⏸ Degrade 2 couleurs hors palette = dette injustifiee.
- `mecenat.html` refonte #114 | Inline `style="width: 33%"` sur `.progress-bar` | ⏸ Donnee dynamique, pas design. Valeur a mettre a jour manuellement.
- `index.html` refonte #119-#120 | Gradient rouge-orange sur CTA primaire (maquette Lovable) | ⏸ Couleurs hors palette.
- `index.html` refonte #120 | Emoji dans bouton "Soutenir" (maquette Lovable) | ⏸ Rendu variable selon OS/navigateur.
- `spectacle-le-bain.html` refonte #124 | Fond violace section livre (maquette Lovable) | ⏸ Couleur hors palette monochrome.
- `spectacle-le-bain.html` refonte #124 | Emoji dans bouton "Acheter le livre" (maquette Lovable) | ⏸ Rendu variable.
- `spectacle-le-bain.html` refonte #123 | Guillemets francais dans le blockquote | ⏸ Decision de contenu.

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
- 2026-03-30 | #55 | `404.html` : classes `presentation-logo-container` / `presentation-logo` → `error-logo-container` / `error-logo`
- 2026-03-30 | #56 | `contact.html` : `presentation-logo` → `contact-logo`
- 2026-03-30 | #57 | `spectacles.html` + `courtmetrage.html` : `presentation-logo` → `spectacles-logo`
- 2026-03-30 | #58 | `courtmetrage.html` : front matter title "Spectacles" → "Films"
- 2026-03-31 | #59 | `courtmetrage.html` decouple de `spectacles-page` → `.courtmetrage-page` + `css/pages/courtmetrage.css`
- 2026-03-31 | #60 | `mecenat.html` : styles inline `width:75%` → classe `.mecenat-gallery-img`
- 2026-03-31 | #61 | `rel="noopener"` ajoute sur 4 liens `target="_blank"`
- 2026-03-31 | #62 | 13 HTML : `<div class="menu-toggle">` → `<button>` + `aria-expanded` + `aria-label`
- 2026-03-31 | #63 | `presentation.html` : modale deplacee hors `<main>`, `<span class="close">` → `<button>`, focus trap + Escape + scroll lock
- 2026-03-31 | #64 | `theme.css` : 6 variables couleur creees + 24 remplacements dans 7 fichiers CSS
- 2026-03-31 | #65 | `theme.css` : `--font-heading` cree + `layout.css` : `font-family` remplace par `var(--font-heading)`
- 2026-04-04 | #66 | `agenda.html` : contenu perime remplace par message + annonce Avignon 2026
- 2026-04-04 | #67 | `index.html` : popup Le Bain remplace par annonce Avignon 2026
- 2026-04-04 | #68 | `spectacle-le-dahut.html` : `loading="lazy"` sur 4 images
- 2026-04-04 | #69 | `index.css` : `.hero-image`, `.hero-text` morts supprimes
- 2026-04-04 | #70 | `presentation_spectacle.css` : `.spectacle-content` supprime
- 2026-04-04 | #71 | `galerie.css` : `.galerie-gallery` supprime
- 2026-04-04 | #72 | `index.css` : `.btn-secondary:hover` supprime
- 2026-04-04 | #73 | `presentation_spectacle.css` : `z-index: 2` supprime de 8 selecteurs sans `position`
- 2026-04-05 | #74 | `.gallery-item` + `.gallery-item img` mutualises dans `utilities.css`
- 2026-04-05 | #75 | 29 `<br>` d'espacement supprimes dans 4 fichiers. CSS `margin-bottom` ajoute
- 2026-04-05 | #76 | Descriptions SEO reecrites (120-160 chars) dans 10 pages
- 2026-04-05 | #77 | `agenda.html` : `.spectacle-info` → `.agenda-info` + CSS dedie
- 2026-04-05 | #78 | `script.js` : popup focus trap, Escape, scroll lock
- 2026-04-05 | #90 | `index.css` : couleurs popup hardcodees → variables `theme.css`
- 2026-04-05 | #79 | `presentation.html` + `script.js` : `target="_blank"` + `rel="noopener"` supprimes du HTML, ajoutes en JS
- 2026-04-05 | #80 | `footer.html` + `script.js` : annee copyright dynamique
- 2026-04-05 | #84 | `spectacles.html` : `<h2>A l'affiche</h2>` ajoute
- 2026-04-05 | #85 | `presentation.html` : 3× `style ="` → `style="`
- 2026-04-05 | #86 | Analyse : 17 PNG dans `lebain/`, 72.9 MB — compression manuelle requise
- 2026-04-05 | #87 | `theme.css` : `--font-base: "Inter", sans-serif` defini
- 2026-04-05 | #88 | Logo renomme `logo-le-bain.png` + 28 refs dans 16 fichiers
- 2026-04-12 | #91 | `index.html` + `index.css` : popup restructure
- 2026-04-12 | #92 | `index.css` : popup responsive 320px
- 2026-04-12 | #93 | `agenda.html` + `agenda.css` : texte restructure
- 2026-04-12 | #94 | PERIME — images adhesion.png/bienfaiteur.png supprimees par #114
- 2026-04-12 | #97 | `script.js` : bloc bioModal legacy supprime
- 2026-04-12 | #100 | Resolu par #91 + #93 — liens "ici" remplaces par boutons
- 2026-04-12 | #83 | PERIME — image popup supprimee dans #67
- 2026-04-12 | #114 | `mecenat.html` : refonte cagnotte + adhesion tier cards
- 2026-04-12 | #115 | `mecenat.css` : CSS cagnotte/tiers/progress/adhesion
- 2026-04-12 | #116 | `responsive.css` : breakpoints mecenat 768px + 480px
- 2026-04-12 | #117 | `mecenat.html` : description front matter mise a jour
- 2026-04-12 | #119 | `index.html` + `index.css` : sous-titre "Compagnie de theatre"
- 2026-04-12 | #120 | `index.html` + `index.css` : bloc CTA hero 2 boutons
- 2026-04-12 | #121 | `responsive.css` : breakpoints CTA hero 768px + 480px
- 2026-04-12 | #122 | `index.css` : `@keyframes heroFadeIn` + prefers-reduced-motion
- 2026-04-13 | #98 | `components.css` + `responsive.css` : `.social-links` orphelin supprime
- 2026-04-13 | #99 | `responsive.css` : `.logo` + `.company-name` orphelins supprimes
- 2026-04-13 | #109 | `spectacle-stpb.html` : `loading="lazy"` ajoute
- 2026-04-13 | #123 | `spectacle-le-bain.html` : blockquote synopsis
- 2026-04-13 | #124 | `spectacle-le-bain.html` : section livre (flex container + `.btn` Amazon)
- 2026-04-13 | #125 | `images/lebain/livre-le-bain.jpg` : image couverture deposee (6 KB)
- 2026-04-13 | #126 | `responsive.css` : breakpoints section livre 768px + 480px

---

## 📎 Dependances entre taches
<!-- Taches qui doivent etre faites dans un ordre precis -->

### Actives
- **#127** (police Nanum Myeongjo) est INDEPENDANT — decision design a prendre en premier (charger la police ou documenter en dette assumee). Si chargee, tester les 3 breakpoints.
- **#131** (fermer `.presentation-members`) AVANT tout refactoring de `presentation.html` — le DOM est actuellement incorrect.
- **#130** (typo "Portait") : corriger dans les DEUX fichiers (`spectacle-le-bain.html` + `galerie.html`) dans le meme commit.
- Faire **#95** (optimisation images) AVANT deploiement — 175 MB est inacceptable. Si les extensions changent (.png → .webp), mettre a jour les chemins dans galerie.html ET spectacle-le-bain.html (images referencees dans les deux).
- **#105**, **#106**, **#107** (leonore-vanier HTML/typos) peuvent etre corriges ensemble dans un seul commit.
- **#108** (fonts @import → `<link>`) — si **#127** ajoute une 2e police Google Fonts, les combiner dans un seul `<link>` avec `family=...&family=...`.
- **#128** (galerie `<main>`) est INDEPENDANT — pas de CSS qui depend de `section.gallery`.
- **#129** (title Le Dahut) est INDEPENDANT — correction front matter seule.

### Terminees
- ~~**#125** AVANT **#124**~~ ✅ fait — image deposee
- ~~**#123** + **#124** + **#126** — refonte spectacle-le-bain~~ ✅ fait
- ~~**#119** + **#120** + **#121** + **#122** — refonte index CTA~~ ✅ fait
- ~~**#114** + **#115** + **#116** + **#117** — refonte mecenat~~ ✅ fait
- ~~**#97** (supprimer bioModal) AVANT refactoring script.js~~ ✅ fait
- ~~**#91** ET **#93** en meme temps~~ ✅ fait
- ~~**#59** (courtmetrage decouple) AVANT #76 (SEO)~~ ✅ fait
- ~~**#56 + #57** (classes logo) en meme temps~~ ✅ fait
- ~~**#55** (.error-hero utilities.css) AVANT 404.html~~ ✅ fait
- ~~**#62** (button menu-toggle) dans 13 fichiers en meme temps~~ ✅ fait
- ~~**#64** (variables couleur) AVANT remplacements~~ ✅ fait
- ~~**#74** (mutualiser .gallery-item) AVANT suppression doublon~~ ✅ fait
