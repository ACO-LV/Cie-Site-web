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
| 11 | P1 | `mecenat.html` | Balise `</main>` manquante — le `<main>` ouvert ligne 24 n'est jamais ferme |
| 12 | P1 | `agenda.html` | Balise `</main>` manquante — meme probleme |
| 13 | P1 | `spectacle-stpb.html:61` | Typos dans la description : "semblre" → "semble", "cauchemars" → "cauchemar" |
| 14 | P2 | `presentation.html:47` | Point-virgule parasite apres l'attribut style : `style="object-position:50% 20%";` |

---

## 2. Refacto & dette technique

| # | Prio | Fichier | Description |
|---|------|---------|-------------|
| 15 | P1 | `layout.css:1` | `@import` duplique de Google Fonts Playfair Display — deja importe dans `theme.css:1` |
| 16 | P1 | `presentation.css`, `spectacles.css`, `mecenat.css`, `agenda.css` | Quatre fichiers redefinissent `body::before` avec le meme pattern d'overlay — conflits entre pages, seul le dernier charge gagne |
| 17 | P1 | `js/script.js` | 6 listeners `DOMContentLoaded` separes — consolider en un seul avec des gardes de page |
| 18 | P1 | `js/script.js:86-105` | Le carrousel hero (`setInterval(changeBackground, 5000)`) tourne sur TOUTES les pages — ajouter un guard `if (!hero) return` |
| 19 | P1 | `js/script.js:108-129` | Deux handlers parallax pour `presentation.html` qui font la meme chose — doublon |
| 20 | P1 | `js/script.js:131-214` | Code modal membre s'execute globalement — envelopper dans `if (!document.getElementById('memberModal')) return` |
| 21 | P2 | `index.css` + `presentation_spectacle.css` | `.btn-reserver` defini deux fois a l'identique — factoriser dans `components.css` |
| 22 | P2 | `mecenat.html`, `agenda.html` | Reutilisent les classes `.presentation-hero`, `.presentation-main`, `.presentation-intro` au lieu de leurs propres classes definies dans leur CSS (`.mecenat-*`, `.agenda-*`) — styles non appliques |
| 23 | P2 | `footer.html` | Charge via `fetch()` JS et non via `{% include %}` Jekyll — flash de footer absent, pas de footer sans JS |
| 24 | P2 | `index.html:1-2` | Front matter vide `--- ---` — pas de `title` ni `description` explicite pour la page d'accueil (SEO faible) |
| 25 | P2 | `leonore-vanier/` | Sous-site completement independant (son propre CSS/JS) — aucun partage de styles ou layout avec le site principal |

---

## 3. Accessibilite & SEO

| # | Prio | Fichier | Description |
|---|------|---------|-------------|
| 26 | P0 | `spectacle-le-dahut.html:89` | `<iframe>` YouTube sans attribut `title` — obligatoire WCAG |
| 27 | P0 | `spectacle-stpb.html:70` | `<iframe>` YouTube sans attribut `title` |
| 28 | P1 | `spectacle-le-bain.html:84-172` | Alt generiques sur 30 images : "Residence TMF 1", "Residence TMF 2"... — non descriptifs |
| 29 | P1 | `galerie.html:26-115` | Meme alts generiques "Residence TMF 1"... sur toute la galerie |
| 30 | P1 | `presentation.html:35-187` | Les member-cards sont des `<a href="#">` — devraient etre des `<button>` ou avoir `role="button"` |
| 31 | P1 | `contact.html:48` | Champ honeypot (`display:none`) accessible au clavier et aux lecteurs d'ecran — ajouter `aria-hidden="true"` et `tabindex="-1"` |
| 32 | P1 | Toutes les pages | Aucun lien skip-to-content pour la navigation au clavier |
| 33 | P1 | Toutes les pages | Pas de `<link rel="icon">` — pas de favicon declare |
| 34 | P2 | `index.html` | Navigation dupliquee desktop/mobile sans `aria-label` sur chaque `<nav>` pour les distinguer |
| 35 | P2 | Toutes les pages | Pas de `<meta name="theme-color">` |
| 36 | P2 | `spectacle-le-dahut.html:89`, `spectacle-stpb.html:70` | Attribut `frameborder="0"` deprece sur les iframes — utiliser CSS `border: none` |
| 37 | P2 | `_includes/schema-performer.html:9` | Lien Facebook dans le schema JSON-LD (`sameAs`) mais pas de page Facebook active |

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
| 45 | P1 | `spectacle-le-bain.html`, `galerie.html` | ~30 images chargees sans `loading="lazy"` — ajout trivial pour ameliorer le temps de chargement |
| 46 | P1 | `index.html:69-70` | Dates du pop-up "Le Bain" en dur ("15 novembre 2025 au 4 janvier 2026") — perimees, le pop-up s'affiche encore pour un evenement termine |
| 47 | P1 | `footer.html:3` | Annee copyright en dur "2025" — devrait etre dynamique via JS ou Liquid (`{{ site.time | date: '%Y' }}`) |
| 48 | P2 | Toutes sauf `index.html` | Pas de breadcrumb ou lien "Accueil" visible — seul le logo sert de retour, pas intuitif pour tous les visiteurs |
| 49 | P2 | `presentation.html` | Photos membres en niveaux de gris mais pas de retour couleur au hover — ajouter `filter: grayscale(0)` au hover pour plus d'interactivite |
| 50 | P2 | Racine du projet | Pas de page `404.html` — GitHub Pages affichera sa page par defaut |
| 51 | P2 | `contact.html` | Pas de feedback visuel (animation/icone) apres envoi du formulaire — juste un changement de texte |
| 52 | P2 | `index.html:62-63` | Image du pop-up "Le Bain" non optimisee (PNG) — un WebP ou JPEG reduit accelererait l'affichage |
