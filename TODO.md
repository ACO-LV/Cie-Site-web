# TODO — Compagnie Sensible Indocile
> Derniere mise a jour : 2026-04-12 (v15 — #92 #97 #109 implémentés)
> Reviewer : senior SW engineer
> Stack : Jekyll + GitHub Pages · CSS modulaire · JS vanilla

---

## 🔴 P0 — Bugs bloquants
<!-- Casse en prod ou risque de regression immediate -->

- [x] **#91** ~~`index.html:59-79` | Popup "Le Bain — Avignon 2026" : texte deborde sur la croix de fermeture, lien "ici" trop discret et inaccessible~~ → corrigé : `.popup-body` padding-top 2rem, texte restructuré avec `.popup-title` + 2× `.popup-text`, lien "ici" remplacé par `<a class="btn popup-btn">Nous soutenir</a>`, CSS ajouté dans `index.css`

- [x] **#92** ~~`css/pages/index.css:112` | Popup deborde a 320px (`max-width: 420px` sans contrainte viewport)~~ → `max-width: min(420px, calc(100vw - 2rem))` — à 320px donne 288px avec 1rem de marge de chaque côté

---

## 🟠 P1 — Degradations visibles
<!-- Visible utilisateur, UX mesurably degradee -->

- [x] **#93** ~~`agenda.html:45-49` | Lien "ici" trop faible + texte a ajuster~~ → corrigé : texte restructuré avec `.agenda-highlight` + paragraphes séparés, lien "ici" remplacé par `<a class="btn">Nous soutenir</a>`, CSS ajouté dans `agenda.css` (cohérent avec popup #91)

- [Obsolète] **#94** `mecenat.html:55-60` + `mecenat.css:11-13` | Images infographiques (adhesion.png, bienfaiteur.png) croppees en carre | `.mecenat-gallery-img` (specificite 0,1,0) est ecrasee par `.gallery-item img` de utilities.css (specificite 0,1,1). Les infographies sont tronquees et perdent de l'information. Correctif : dans mecenat.html, remplacer `<div class="gallery-item">` par `<div class="mecenat-infographic">` pour ces 2 images, et ajouter dans mecenat.css :
  ```css
  .mecenat-infographic { text-align: center; margin: 20px 0; }
  .mecenat-infographic img { width: 75%; height: auto; max-width: 600px; }
  ```
  > 👨‍💻 Ne PAS modifier `.gallery-item` dans utilities.css — il est utilise par galerie.html, spectacle-le-bain.html, le-dahut.html et stpb.html. La correction doit etre locale a mecenat. Le #60 a cree `.mecenat-gallery-img` mais n'a pas resolu le probleme de specificite.
  > ⚠️ **OBSOLÈTE après #114** — les images adhesion.png/bienfaiteur.png sont supprimées (remplacées par les tier cards texte). `.mecenat-gallery-img` à supprimer dans le même commit que #115.

- [ ] **#95** `images/` | 175 MB d'images total, dont 20+ PNG > 1 MB (pic : lebain/20.png 8.6 MB, lebain/18.png 8.2 MB, lebain/17.png 8.1 MB) | Convertir les PNG photos en JPEG ou WebP. Priorite : 14 fichiers `lebain/*.png` totalisant ~70 MB. Puis les affiches (`affichelebain.png` 3.6 MB, `afficheledahut.png` 5.7 MB). Mettre a jour les chemins dans galerie.html, spectacle-le-bain.html et mecenat.html si les extensions changent.
  > 👨‍💻 C'est la premiere chose que Google PageSpeed signalera. Un visiteur mobile en 3G telecharge 175 MB. Utiliser squoosh.dev ou cwebp (pas d'outil npm par CLAUDE.md). Attention : les memes images sont referencees dans DEUX pages (galerie.html ET spectacle-le-bain.html) — mettre a jour les deux.

- [ ] **#96** `leonore-vanier/index.html:72,87` | Attributs HTML colles : `decoding="async"style="object-position:..."` (espace manquant avant `style=`) | Ajouter un espace : `decoding="async" style="object-position:..."`. 2 occurrences.
  > 👨‍💻 Certains parseurs HTML ignorent le second attribut quand il est colle au precedent. Risque : `object-position` ne s'applique pas et les photos sont mal cadrees.

- [x] **#119** ~~`index.html` + `css/pages/index.css` | Sous-titre "Compagnie de théâtre"~~ → `<p class="company-subtitle">` ajouté dans `.header-container`, CSS dans `index.css:158-167` (`font-size: 0.95rem`, `letter-spacing: 0.35em`, `text-transform: uppercase`, `var(--color-beige)`, `margin-top: -2rem`)
- [x] **#120** ~~`index.html` + `css/pages/index.css` | Bloc CTA hero 2 boutons~~ → `<div class="hero-cta">` avec `.btn` (mecenat) + `.btn-outline` (spectacle-le-bain) ajouté dans `.header-container`. `.hero-cta` et `.btn-outline` définis dans `index.css:171-200`

---

## 🟡 P2 — Dette technique
<!-- Maintenabilite, accessibilite non bloquante, CSS orphelin -->

- [ ] **#81** `footer.html` | Charge via `fetch()` JS et non via `{% include %}` Jekyll | 🔴 BLOQUE par CLAUDE.md (interdit de changer la structure du footer)
- [ ] **#82** Toutes sauf `index.html` | Pas de breadcrumb ou lien "Accueil" visible — seul le logo sert de retour

- [x] **#97** ~~`js/script.js:5-29` | Code mort : bloc bioModal / openModal / `.close` legacy~~ → 25 lignes supprimées (`setTimeout` + guards + 3 event listeners). `#bioModal`/`#openModal` absents de tout HTML, risque de conflit `.close` éliminé

- [ ] **#98** `css/components.css:1-30` | CSS orphelin : `.social-links`, `.social-links a`, `.social-links img`, `.social-links img:hover` | Aucun HTML n'utilise ces classes (confirme par grep). Supprimer les ~30 lignes.

- [ ] **#99** `css/responsive.css:163-168` | CSS orphelin : `.logo` et `.company-name` dans le media 480px | Aucun HTML n'utilise ces classes (confirme par grep). Les classes reelles sont `.spectacles-logo`, `.presentation-logo`, etc. et `.company-name-index`. Supprimer les 6 lignes.

- [ ] **#101** `css/` (sauf components.css) | Accessibilite : pas de style `:focus-visible` sur les liens de navigation et liens generaux | Seul `.menu-toggle` a un `:focus-visible`. Ajouter dans `components.css` : `a:focus-visible { outline: 2px solid var(--color-bordeaux); outline-offset: 2px; }`. Tester sur les navs desktop et mobile, les liens footer, et les liens dans le contenu.
  > 👨‍💻 Ne PAS utiliser `:focus` seul — cela montre un outline au clic souris aussi. `:focus-visible` cible uniquement la navigation clavier.

- [ ] **#102** `index.html` | Pas de landmark `<main>` — seule page sans | Ajouter `<main id="main-content">` autour du popup ou entre le hero et le footer. Le `skip-to-content` pointe vers `#hero` ce qui est acceptable, mais un `<main>` ameliore la navigation par lecteur d'ecran.

- [ ] **#103** `mentions-legales.html:45,51,62` | `<br>` utilises pour l'espacement vertical entre sections (ex: `</section><br>`) | Ce ne sont PAS des `<br>` de contenu (contrairement a ce que note #75) — ce sont des `<br>` entre les `<section>` et `<p>`. Remplacer par `margin-bottom` CSS sur `.mentions-info` ou ses enfants.
  > 👨‍💻 Le #75 avait classe ces `<br>` comme "contenu" mais `</section><br>` est clairement de l'espacement. Corriger l'evaluation.

- [ ] **#104** `courtmetrage.html` | Pas de `<h2>` dans la section `.cards` — incohérent avec `spectacles.html` qui a `<h2>À l'affiche</h2>` (ajoute en #84) | Ajouter `<h2>Nos films</h2>` ou `<h2>A l'affiche</h2>` dans `<section class="cards">`.

- [ ] **#105** `leonore-vanier/index.html:152,154` | Balises `</br>` invalides (HTML void element, pas de fermeture) | Remplacer les 4 occurrences de `</br>` par `<br>`.

- [ ] **#106** `leonore-vanier/index.html:152` | Typo "Intitation" | Corriger en "Initiation".

- [ ] **#107** `leonore-vanier/index.html:154` | Parenthese orpheline : "Khadija El Mahdi)" — `)` en trop | Supprimer la parenthese.

- [ ] **#108** `css/theme.css:1` | Google Fonts charge via `@import url()` en CSS — render-blocking | Deplacer dans le `<head>` HTML avec `<link rel="preconnect">` + `<link rel="stylesheet">`. Alternative : accepter en dette assumee (faible trafic).

- [x] **#109** ~~`spectacle-stpb.html:96` | Image affiche sans `loading="lazy"`~~ → `loading="lazy"` ajouté sur l'`<img>` affiche

- [ ] **#118** `css/pages/mecenat.css` | Vérifier hover `.btn-reserver` dans le contexte mecenat | Confirmer visuellement que `scale(1.05)` (layout.css) + `--color-dark-bordeaux` (components.css) est satisfaisant sur fond sombre. Si insuffisant : ajouter override local `translateY(-2px)`.

- [x] **#121** ~~`css/responsive.css` | Breakpoints hero CTA 768px + 480px~~ → `.hero-cta` column + 260px à 768px, pleine largeur 280px max à 480px, `.company-subtitle` réduit à 480px. Insertions dans les blocs `@media` existants (CLAUDE.md).
- [x] **#122** ~~`css/pages/index.css` | Fade-in échelonné hero~~ → `@keyframes heroFadeIn` défini dans `index.css:206-209`. Animés uniquement : `.company-subtitle` (delay 0.2s) + `.hero-cta` (delay 0.5s). Éléments existants (h1, nav) non animés — bénéficient déjà du fade-in de la `<section>` via JS. `prefers-reduced-motion` ajouté (`index.css:212-215`).

---

## 🟢 P3 — Ameliorations
<!-- Ni urgent ni bloquant -->

- [ ] **#86** Images PNG galerie | `lebain/*.png` : 17 fichiers, **72.9 MB** total (moy. 4.4 MB), top 3 > 8 MB. Total images/ : **175 MB** | ⏸ Nécessite outil externe (squoosh.dev recommandé) — CLAUDE.md interdit dépendances non approuvées. Voir aussi **#95** (P1).
- [ ] **#89** `leonore-vanier/` | Utilise `html2pdf.js` CDN — dependance externe non approuvee par CLAUDE.md | A valider (page hors pattern)

- [ ] **#110** `galerie.html` + `spectacle-le-bain.html` | Alt textes trop courts sur certaines images : "Guilherme", "Clara", "Mailys", "Affiche spectacle" | Enrichir avec description visuelle ("Portrait de Guilherme en scene", "Portrait de Clara en coulisses", etc.)

- [ ] **#111** `presentation.html` | `<a href="#">` sur les 10 member-cards — scroll-to-top si JS echoue | Deja mitige par `e.preventDefault()` dans le JS + `role="button"`. Amelioration : remplacer les `<a>` par des `<button>` styles comme des cartes, ou utiliser `href="javascript:void(0)"`.
  > 👨‍💻 Faible priorite car le JS est charge sur toutes les pages et le fallback sans JS est extremement rare. Mais c'est un pattern a11y plus propre.

- [ ] **#112** `spectacles.html:46-51` + `courtmetrage.html:45-56` | `<a>` encapsulant `<div class="card">` — le lien tire son nom accessible du alt de l'image seul | Ajouter `aria-label="Voir le spectacle Le Bain"` (etc.) pour plus de clarte aux lecteurs d'ecran.

- [ ] **#113** `leonore-vanier/index.html` | Pas de front matter Jekyll, pas de `{% seo %}` | Si la page doit etre indexee par Google, ajouter front matter + `{% seo %}`. Sinon, documenter que c'est un mini-site standalone volontairement hors Jekyll.

---

## 🔒 Dette assumee
<!-- Problemes connus, volontairement non traites, avec justification -->

- `leonore-vanier/` | Page autonome avec son propre CSS/JS, hors pattern Jekyll | ⏸ Portfolio independant, volontairement decouple. Couleurs hardcodees et CDN specifiques a cette page.
- `index.html` | Pas de hero-logo ni body class (structure differente) | ⏸ Page d'accueil a structure unique (carrousel hero + nav integree). Ne pas forcer le pattern pages internes.
- `mecenat.html:50-51` | Iframes HelloAsso avec `onload` inline contenant du JS | ⏸ Impose par le widget HelloAsso — pas de controle sur le code d'integration.
- `contact.html:79` | Cle publique EmailJS en clair dans le HTML | ⏸ Cle *publique* (pas secrete) — fonctionnement normal d'EmailJS cote client.
- `footer.html` | Charge via `fetch()` au lieu de `{% include %}` | ⏸ CLAUDE.md interdit de modifier la structure du footer.
- `css/styles.css` | Chaine de 17 `@import` sequentiels | ⏸ Accepte : pas de bundler dans le stack (CLAUDE.md). Le gain de maintenabilite prime. Revisiter si le trafic augmente.
- Overlays `rgba()` hardcodes par page | Chaque page a un taux d'opacite different (0.2 a 0.8) | ⏸ Pas candidat a une variable CSS unique — la valeur est intentionnellement differente par page.
- `mecenat.html` refonte #114-#115 | `.tier-price` + CTA utilisent `var(--color-bordeaux)` (#8b0000) au lieu de `#ff6b6b` (maquette) | ⏸ Couleur hardcodée interdite (CLAUDE.md). Si trop sombre après test visuel, ajouter `--color-accent-light` dans theme.css.
- `mecenat.html` refonte #114-#115 | Progress bar couleur unie `var(--color-bordeaux)` au lieu du dégradé `#e74c3c → #ff6b6b` | ⏸ Dégradé 2 couleurs hors palette pour 1 composant = dette injustifiée.
- `mecenat.html` refonte #114 | Inline `style="width: 33%"` sur `.progress-bar` | ⏸ Donnée dynamique, pas design — même pattern que `object-position`. Valeur à mettre à jour manuellement au fil de la cagnotte.
- `index.html` refonte #119-#120 | Gradient rouge-orange sur CTA primaire (maquette Lovable) | ⏸ Couleurs hors palette — `var(--color-bordeaux)` utilisé à la place. Si contraste insuffisant après test visuel, ajouter `--color-accent` dans theme.css.
- `index.html` refonte #120 | Emoji ❤️ dans bouton "Soutenir" (maquette Lovable) | ⏸ Rendu variable selon OS/navigateur — texte seul retenu. Alternative : icône SVG inline si souhaité.

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
- 2026-04-12 | #91 | `index.html` + `index.css` : popup restructuré — `.popup-body` padding-top 2rem, `.popup-title` + `.popup-btn` ajoutés, lien "ici" remplacé par bouton "Nous soutenir"
- 2026-04-12 | #93 | `agenda.html` + `agenda.css` : texte restructuré avec `.agenda-highlight`, paragraphes séparés, lien "ici" remplacé par bouton "Nous soutenir" (cohérent avec #91)
- 2026-04-12 | #100 | Résolu automatiquement par #91 + #93 — liens "ici" remplacés par boutons "Nous soutenir" (WCAG 2.4.4)
- 2026-04-12 | #83 | PÉRIMÉ — image popup supprimée dans #67, tâche sans objet
- 2026-04-12 | #94 | PÉRIMÉ — images adhesion.png/bienfaiteur.png supprimées par #114, bug spécificité disparu
- 2026-04-12 | #114 | `mecenat.html` : refonte `<main>` — h1 MERCI, cagnotte card + barre de progression, fiscalité card, 4 tier cards adhésion. Supprimé : haWidget2, 2× .gallery-item images
- 2026-04-12 | #115 | `css/pages/mecenat.css` : `.cagnotte-card`, `.fiscalite-card`, `.progress-*`, `.adhesion-tiers`, `.tier-card`, `.tier-highlight`, `.tier-price`, `.adhesion-widget`. Override `.mecenat-main { max-width: 1100px }`. Supprimé `.mecenat-gallery-img`
- 2026-04-12 | #116 | `css/responsive.css` : breakpoints 768px + 480px mecenat ajoutés dans les blocs @media existants
- 2026-04-12 | #117 | `mecenat.html:3` : description front matter mise à jour (143 chars, cagnotte + paliers Avignon 2026)
- 2026-04-12 | #119 | `index.html:44` + `index.css:158-167` : sous-titre "Compagnie de théâtre" ajouté sous le h1 (`.company-subtitle`, uppercase, `var(--color-beige)`, `letter-spacing: 0.35em`)
- 2026-04-12 | #120 | `index.html:58-61` + `index.css:171-200` : bloc CTA hero ajouté — `.btn` (Soutenir → mecenat) + `.btn-outline` (Découvrir LE BAIN → spectacle-le-bain), `transition` inclut `transform` pour respecter `layout.css`
- 2026-04-12 | #121 | `css/responsive.css` : breakpoints CTA 768px (column, 260px) + 480px (pleine largeur, 280px max) insérés dans les blocs @media existants
- 2026-04-12 | #122 | `index.css:206-215` : `@keyframes heroFadeIn` + animation delay 0.2s (subtitle) / 0.5s (CTA). Éléments existants non animés (conflit opacity section). `prefers-reduced-motion` géré.
- 2026-04-12 | #92 | `index.css:113` : `.popup-body { max-width: min(420px, calc(100vw - 2rem)) }` — popup dans le viewport à 320px (288px avec 1rem de marge de chaque côté)
- 2026-04-12 | #97 | `script.js` : bloc bioModal legacy supprimé (25 lignes) — `#bioModal`/`#openModal` absents de tout HTML, risque `.close` presentation.html éliminé
- 2026-04-12 | #109 | `spectacle-stpb.html:96` : `loading="lazy"` ajouté sur l'affiche du court-métrage

---

## 📎 Dependances entre taches
<!-- Taches qui doivent etre faites dans un ordre precis -->

### Actives
- Faire **#92** (popup responsive 320px) — meme fichier CSS que #91, contexte identique. Idéalement dans le même commit que **#121** (même fichier `responsive.css`).
- ~~**#119** + **#120** + **#121** + **#122** — index.html refonte CTA~~ ✅ fait
- ~~**#114** + **#115** + **#116** + **#117** — refonte mecenat~~ ✅ fait
- **#118** indépendant — à faire après déploiement sur la base d'un test visuel.
- Faire **#97** (supprimer bioModal code mort) AVANT tout refactoring de `script.js` — eliminer le bruit d'abord.
- Faire **#95** (optimisation images) AVANT deploiement — 175 MB est inacceptable. Si les extensions changent (.png → .webp), mettre a jour les chemins dans galerie.html ET spectacle-le-bain.html (images referencees dans les deux).
- **#108** (fonts @import → `<link>`) est independant mais se fait bien APRES decision sur la chaine @import (dette assumee).
- **#105**, **#106**, **#107** (leonore-vanier HTML/typos) peuvent etre corriges ensemble dans un seul commit.

### Terminees
- ~~Faire **#91** (popup index) ET **#93** (texte agenda) EN MEME TEMPS~~ ✅ fait — message Avignon 2026 cohérent, bouton "Nous soutenir" identique
- ~~**#100** (a11y liens "ici") résolu automatiquement par **#91** + **#93**~~ ✅ fait
- ~~Faire **#59** (`.courtmetrage-page` + `courtmetrage.css`) AVANT `.spectacles-page`~~ ✅ fait
- ~~Faire **#56 + #57** (classes logo) EN MEME TEMPS~~ ✅ fait
- ~~Faire **#55** (`.error-hero` dans `utilities.css`) AVANT `404.html`~~ ✅ fait
- ~~Faire **#62** (`<button>` menu-toggle) dans les 13 fichiers HTML EN MEME TEMPS~~ ✅ fait
- ~~Faire **#64** (variables couleur `theme.css`) AVANT de remplacer les couleurs hardcodees~~ ✅ fait
- ~~Faire **#74** (mutualiser `.gallery-item`) AVANT de supprimer le doublon~~ ✅ fait
- ~~Faire **#59** (decoupler courtmetrage) AVANT **#76** (descriptions SEO)~~ ✅ fait
