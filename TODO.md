# TODO — Audit front-end du site Compagnie Sensible Indocile

> Audit du 28 mars 2026 — branche `Refacto-Arthur`
> Priorités : **P0** = bloquant/visible, **P1** = important, **P2** = nice-to-have

---

## 1. Bugs & regressions

| # | Prio | Fichier | Description |
|---|------|---------|-------------|
| ~~1~~ | ~~P0~~ | ~~`spectacles.html:15`~~ | ~~Double `>` sur la balise body~~ → **✅ Fait 2026-03-28** — `>` parasite supprime |
| ~~2~~ | ~~P0~~ | ~~`courtmetrage.html:15`~~ | ~~Meme double `>`~~ → **✅ Fait 2026-03-28** — `>` parasite supprime |
| ~~3~~ | ~~P0~~ | ~~`mecenat.html:33-34`~~ | ~~IDs `haWidget` dupliques~~ → **✅ Fait 2026-03-28** — renommes en `haWidget1` / `haWidget2` + `getElementById` mis a jour |
| ~~4~~ | ~~P0~~ | ~~`mecenat.html:27`~~ | ~~Typo `s` parasite dans h1~~ → **✅ Fait 2026-03-28** — `s` supprime |
| ~~5~~ | ~~P0~~ | ~~`mentions-legales.html:33`~~ | ~~Typo "Compagie Senseible Indocile"~~ → **✅ Fait 2026-03-28** — corrige en "Compagnie Sensible Indocile" |
| ~~6~~ | ~~P0~~ | ~~`mentions-legales.html:42`~~ | ~~Typo "Sensible Indocible"~~ → **✅ Fait 2026-03-28** — corrige en "Sensible Indocile" |
| ~~7~~ | ~~P0~~ | ~~`spectacle-le-bain.html:55`~~ | ~~Typo "Colaboration"~~ → **✅ Fait 2026-03-28** — corrige en "Collaboration" |
| ~~8~~ | ~~P1~~ | ~~`theme.css:11-20`~~ | ~~Faux commentaires `#`~~ → **✅ Fait 2026-03-28** — convertis en un seul bloc `/* */` valide |
| ~~9~~ | ~~P1~~ | ~~`galerie.html:116`~~ | ~~`</div>` orphelin~~ → **✅ Fait 2026-03-28** — supprime, les 3 photos dahut sont desormais dans `.gallery` |
| ~~10~~ | ~~P1~~ | ~~`js/script.js:134`~~ | ~~`modal.querySelector('.close')` crash~~ → **✅ Fait 2026-03-28** — ajout guard `if (!modal) return` ligne 135 |
| ~~11~~ | ~~P1~~ | ~~`mecenat.html`~~ | ~~`</main>` manquante~~ → **✅ Fait 2026-03-28** — `</main>` ajouté après les gallery-items, avant le footer |
| ~~12~~ | ~~P1~~ | ~~`agenda.html`~~ | ~~`</main>` manquante~~ → **✅ Fait 2026-03-28** — `</main>` ajouté après la section spectacle-info, avant le footer |
| ~~13~~ | ~~P1~~ | ~~`spectacle-stpb.html:61`~~ | ~~Typos "semblre", "cauchemars"~~ → **✅ Fait 2026-03-28** — corrige en "semble" et "cauchemar" |
| ~~14~~ | ~~P2~~ | ~~`presentation.html:47`~~ | ~~Point-virgule parasite~~ → **✅ Fait 2026-03-28** — `;` supprime + espace superflue dans `style =` corrigee |

---

## 2. Refacto & dette technique

| # | Prio | Fichier | Description |
|---|------|---------|-------------|
| ~~15~~ | ~~P1~~ | ~~`layout.css:1`~~ | ~~`@import` duplique~~ → **✅ Fait 2026-03-28** — `@import` Playfair Display supprime (reste dans `theme.css`) |
| ~~16~~ | ~~P1~~ | ~~`presentation.css`, `spectacles.css`, `mecenat.css`, `agenda.css`~~ | ~~`body::before` non scope~~ → **✅ Fait 2026-03-28** — scope a `.xxx-page::before` dans chaque fichier |
| ~~17~~ | ~~P1~~ | ~~`js/script.js`~~ | ~~9 listeners `DOMContentLoaded`~~ → **✅ Fait 2026-03-28** — consolides en 1 unique listener, variables renommees pour eviter collisions |
| ~~18~~ | ~~P1~~ | ~~`js/script.js:86-105`~~ | ~~Carrousel hero sans guard~~ → **✅ Fait 2026-03-28** — enveloppe dans `if (hero) { ... }` |
| ~~19~~ | ~~P1~~ | ~~`js/script.js:108-129`~~ | ~~Deux handlers parallax~~ → **✅ Fait 2026-03-28** — conserve `updateParallax` (0.1), supprime doublon (0.3), scope a presentation.html |
| ~~20~~ | ~~P1~~ | ~~`js/script.js:131-214`~~ | ~~Code modal non guarde~~ → **✅ Fait 2026-03-28** — enveloppe dans `if (memberModal) { ... }` (inclus dans refacto #17) |
| ~~21~~ | ~~P2~~ | ~~`index.css` + `presentation_spectacle.css`~~ | ~~`.btn-reserver` duplique~~ → **✅ Fait 2026-03-28** — factorise dans `components.css` avec variables CSS, supprime des 2 fichiers sources |
| ~~22~~ | ~~P2~~ | ~~`mecenat.html`, `agenda.html`~~ | ~~Classes `.presentation-*` au lieu de `.mecenat-*`/`.agenda-*`~~ → **✅ Fait 2026-03-28** — HTML mis a jour avec les classes propres a chaque page |
| 23 | P2 | `footer.html` | Charge via `fetch()` JS et non via `{% include %}` Jekyll — 🔴 **BLOQUE par CLAUDE.md** qui interdit de changer la structure du footer |
| ~~24~~ | ~~P2~~ | ~~`index.html:1-2`~~ | ~~Front matter vide~~ → **✅ Fait 2026-03-28** — ajout title, description, lang pour le SEO |

---

## 3. Accessibilite & SEO

| # | Prio | Fichier | Description |
|---|------|---------|-------------|
| ~~26~~ | ~~P0~~ | ~~`spectacle-le-dahut.html:89`~~ | ~~`<iframe>` YouTube sans attribut `title`~~ → **✅ Fait 2026-03-28** — ajout `title="Court-métrage Le Dahut — Compagnie Sensible Indocile"` |
| ~~27~~ | ~~P0~~ | ~~`spectacle-stpb.html:70`~~ | ~~`<iframe>` YouTube sans attribut `title`~~ → **✅ Fait 2026-03-28** — ajout `title="Court-métrage Sous ta peau brûlante — Compagnie Sensible Indocile"` |
| ~~28~~ | ~~P1~~ | ~~`spectacle-le-bain.html:84-172`~~ | ~~Alt generiques "Residence TMF 1..14"~~ → **✅ Fait 2026-03-28** — 14 alts réécrits avec descriptions visuelles de chaque scène |
| ~~29~~ | ~~P1~~ | ~~`galerie.html:26-115`~~ | ~~Alts generiques "Residence TMF 1"...~~ → **✅ Fait 2026-03-28** — 14 alts Le Bain + 3 alts Le Dahut réécrits avec descriptions visuelles |
| ~~30~~ | ~~P1~~ | ~~`presentation.html:35-187`~~ | ~~`<a href="#">` sans role sur member-cards~~ → **✅ Fait 2026-03-28** — ajout `role="button"` sur les 10 member-cards |
| ~~31~~ | ~~P1~~ | ~~`contact.html:48`~~ | ~~Honeypot accessible au clavier/lecteur d'ecran~~ → **✅ Fait 2026-03-28** — ajout `aria-hidden="true"` et `tabindex="-1"` |
| ~~32~~ | ~~P1~~ | ~~Toutes les pages~~ | ~~Aucun skip-to-content~~ → **✅ Fait 2026-03-28** — lien `.skip-to-content` + `id="main-content"` sur 13 pages, CSS dans `components.css` + `leonore-vanier/styles.css` |
| ~~33~~ | ~~P1~~ | ~~Toutes les pages~~ | ~~Pas de favicon~~ → **✅ Fait 2026-03-28** — `<link rel="icon">` ajouté sur 13 pages (utilise le logo PNG en attendant un favicon dédié) |
| ~~34~~ | ~~P2~~ | ~~`index.html`~~ | ~~Navs sans `aria-label`~~ → **✅ Fait 2026-03-28** — `aria-label="Menu mobile"` et `aria-label="Menu principal"` sur les 2 `<nav>` |
| ~~35~~ | ~~P2~~ | ~~Toutes les pages~~ | ~~Pas de `theme-color`~~ → **✅ Fait 2026-03-28** — `<meta name="theme-color" content="#8b0000">` ajouté sur 13 pages |
| ~~36~~ | ~~P2~~ | ~~`spectacle-le-dahut.html`, `spectacle-stpb.html`~~ | ~~`frameborder="0"` déprécié~~ → **✅ Fait 2026-03-28** — attribut supprimé, `border: none` ajouté dans `presentation_spectacle.css` |
| ~~37~~ | ~~P2~~ | ~~`_includes/schema-performer.html:9`~~ | ~~Lien Facebook inactif dans `sameAs`~~ → **✅ Fait 2026-03-28** — URL Facebook supprimée, seul Instagram conservé |

---

## 4. Responsive

| # | Prio | Fichier | Description |
|---|------|---------|-------------|
| 38 | P0 | Toutes sauf `index.html` | Aucune navigation mobile (hamburger) — seul le logo permet de revenir a l'accueil |
| 39 | P1 | `presentation_spectacle.css:206-208` | `.gallery-grid` force 4 colonnes (`repeat(4, 1fr)`) sans media query — images minuscules sur mobile |
| 40 | P1 | `galerie.css:53` | `.gallery` force 3 colonnes (`repeat(3, 1fr)`) sans media query responsive |
| 41 | P1 | `mecenat.html:34` | iframe HelloAsso avec `style="width:350px"` en dur — deborde sur ecrans < 350px |
| 42 | P1 | `responsive.css` | Seulement 2 breakpoints (768px et 480px) — aucun pour tablettes (768-1024px) |
| 43 | P2 | `contact.css:169` | `.form-submit-btn` a `width: 40%` — texte tronque possible sur petits ecrans |
| 44 | P2 | `index.css:77` | `.company-name-index` a `font-size: 4.2rem` en desktop sans clamp — peut deborder sur ecrans intermediaires |

---

## 5. Ameliorations UX a faible cout

| # | Prio | Fichier | Description |
|---|------|---------|-------------|
| ~~45~~ | ~~P1~~ | ~~`spectacle-le-bain.html`, `galerie.html`~~ | ~~~30 images sans `loading="lazy"`~~ → **✅ Fait 2026-03-29** — `loading="lazy"` ajouté sur 30 images (le-bain) et 33 images (galerie), logos hero non touchés |
| ~~46~~ | ~~P1~~ | ~~`index.html:69-70`~~ | ~~Dates du pop-up "Le Bain" en dur~~ → **✅ Fait 2026-03-29** — ajout `data-end-date` sur le popup + condition JS qui supprime le popup si l'événement est passé |
| ~~47~~ | ~~P1~~ | ~~`footer.html:3`~~ | ~~Année copyright en dur "2025"~~ → **✅ Fait 2026-03-29** — remplacement dynamique dans le `fetch()` de script.js (`footer.html` inchangé) |
| 48 | P2 | Toutes sauf `index.html` | Pas de breadcrumb ou lien "Accueil" visible — seul le logo sert de retour, pas intuitif pour tous les visiteurs |
| 49 | P2 | `presentation.html` | Photos membres en niveaux de gris mais pas de retour couleur au hover — ajouter `filter: grayscale(0)` au hover pour plus d'interactivite |
| 50 | P2 | Racine du projet | Pas de page `404.html` — GitHub Pages affichera sa page par defaut |
| 51 | P2 | `contact.html` | Pas de feedback visuel (animation/icone) apres envoi du formulaire — juste un changement de texte |
| 52 | P2 | `index.html:62-63` | Image du pop-up "Le Bain" non optimisee (PNG) — un WebP ou JPEG reduit accelererait l'affichage |
