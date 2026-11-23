# Portfolio — Léonore Vanier

Site statique (HTML, CSS, JavaScript vanilla), sans framework ni build, publié avec le site de la compagnie (dépôt `ACO-LV/Cie-Site-web`, GitHub Pages/Jekyll) dans le dossier `leonore_vanier/`. **Ce dossier est la seule version de référence** (l’ancien dépôt `Leonore0309/leonore_vanier` n’est plus qu’une redirection). Adresse : https://lacompagniesensibleindocile.fr/leonore_vanier/ (français) et `/en/` (anglais). Contenu et interface en **français**.

Le guide de mise à jour pour Léonore est `README.md` (même dossier) : le tenir à jour si l’organisation change. Les règles générales du dépôt de la compagnie (`../CLAUDE.md`) ne s’appliquent pas à ce dossier (pas de pattern Jekyll, pas de front matter) ; ne rien y modifier en dehors de `leonore_vanier/` sans l’annoncer. Aucun commit ni push sans demande explicite.

## Architecture

- `contenu/` : **tout ce qui se modifie**. `data.js` (`window.SITE` : textes, rôles, projets, liens, médias) et `data.en.js` (traductions), `photos/` (WebP, un dossier par projet), `audio/`, `video/`. Modifier les contenus ici, jamais dans le HTML.
- `assets/js/main.js` : rendu des pages à partir de `window.SITE`, menu mobile, lecteurs vidéo. `assets/css/style.css` : tous les styles (variables CSS sur `:root`).
- `_outils/generate_pages.py` : génère les pages « coquilles » (un `index.html` par page, FR à la racine, EN sous `en/`), le `canonical`, les `hreflang`, le JSON-LD et `sitemap.xml`. Le dossier commence par `_` : Jekyll ne le publie pas. Ne jamais éditer les coquilles à la main.
- Attributs des coquilles : `data-root`, `data-lang-root`, `data-path`, `data-page`, `data-section`, `data-category`, `data-project`.

## Règles

- Ne pas ajouter de framework, bundler ou dépendance npm.
- Tous les chemins sont **relatifs** (le site vit dans un sous-dossier) ; `data-root` doit correspondre à la profondeur de la page (`./`, `../`, `../../`). Chemins de médias dans `data.js` : `contenu/photos/…`, `contenu/audio/…`, `contenu/video/…`.
- Information manquante : mettre `null` (ou liste vide) dans `data.js` (affiché « À compléter » seulement si `showTodos: true`). **Ne jamais inventer** de contenu (synopsis, crédits, chiffres, noms) ; signaler les manques à Léonore.
- `showTodos: false` uniquement pour la version publique.
- Images : renseigner `src`, `w`, `h` réels et un `alt` descriptif en français. 1 600 px de large conseillés.
- Vidéos YouTube / TikTok : lien vers la vidéo (nouvel onglet), pas d’iframe ni de lecteur intégré, pas de lecture automatique du son (voir « Visuels animés »).
- Typographie française : espaces insécables avant `: ; ? ! %` (gérées par `nb()` dans `main.js`), apostrophes typographiques ’, guillemets « ».
- **Le téléphone n’est volontairement jamais affiché** : ni dans un texte, ni dans un nom de fichier ou des métadonnées (photos, PDF), ni dans un titre de vidéo.
- Toute modification de texte français est répercutée en anglais (`data.en.js`, fusion par clé et **par position** dans les tableaux : même ordre des deux côtés).
- Accessibilité : lien d’évitement, `lang="fr"`, contrastes, navigation clavier, balises sémantiques.

## Charte graphique

- Couleurs : ivoire `#f5f1e9`, sable `#ece5d8`, brun `#302824`, bleu pétrole `--teal` `#2f4a52` (tiré du logo), beige rosé `--blush` `#ebdcd4`, taupe `--taupe` `#6f6159`, prune `#654653`, terracotta `--terra` `#a5573d` (interactions), rose `#b78c82` (filets uniquement, jamais du texte). Réutiliser les variables CSS existantes ; vérifier les contrastes (≥ 4,5:1 pour le texte courant).
- Polices : Anton (titres, via `--display` / `--serif`), Cormorant Garamond (nom du menu, citation), DM Sans (texte). Pas de gras ni d’italique synthétiques (`font-synthesis: none`).
- Photos : vignettes en 16:9 (2 par ligne, écarts réguliers) ; galeries paysages en 16:9, verticales à leur ratio ; couvertures audio carrées, `object-fit: cover`, même étalonnage léger (`.photo`) ; portraits Acting en 4:5 ou 3:2.
- Animations : fondu 0,3 s + 12 px (`.reveal`), survol discret ; tout doit être coupé sous `prefers-reduced-motion` (apparition, transitions, défilement fluide).
- Logo Sensible Indocile (`contenu/photos/brand/`) : secondaire, jamais plus visible que le nom. Chaque logo ouvre https://lacompagniesensibleindocile.fr/ ; version sombre (`logo-*-sombre.webp`) en mode sombre, logo d’origine en mode clair, jamais de pastille.

## Pages particulières

- **Thème** : deux modes (`html[data-theme="light|dark"]`), même mise en page. Le mode clair est le socle des variables de `style.css`, le mode sombre (`#03141a`) les remappe (section 11). Script du `<head>` généré par `generate_pages.py` (préférence mémorisée `lv-theme`, sinon réglage du système). La page d’entrée (`.landing`) redéfinit ses variables : toujours claire. Les zones qui restent sombres ou claires utilisent `--on-dark`, `--deep`, `--ink`. `url()` construit les liens de pages (langue courante), `asset()` les fichiers.
- **Langues** : français (racine) et anglais (`en/`). Libellés d’interface dans `ui`.
- **Accueil** : page d’entrée seule, sans en-tête ni pied de page ; MON PORTFOLIO mène à `projets/`. Nom, titre et bouton en Cormorant, en majuscules ; le tout tient sur l’écran sans défiler (classe `landing--v2`).
- **Menu** : À propos, Fiction, Audio, Spectacles vivants, IA, Acting, Contacts (liste `nav`, mêmes rangs en anglais). `renderActing` et `renderContact` lisent `S.nav[5]` et `S.nav[6]` : ne pas déplacer Acting et Contacts.
- **Rubriques et adresses** : une rubrique à un seul projet affiche directement ce projet à l’adresse de la rubrique (`fiction/` est une liste, `audio/` et `ia/` des projets) ; dès qu’il y en a plusieurs, la rubrique est une liste et chaque projet a sa page `rubrique/slug/` (ex. `spectacles-vivants/le-bain/`). Toute nouvelle page demande une ligne dans `PAGES` de `generate_pages.py` puis `python leonore_vanier/_outils/generate_pages.py`.
- **Ordres** : l’ordre des blocs de `projects` = ordre des pages de chaque rubrique (ex. Fiction : Contrôle sanitaire, Matriochka, ADAM, Sous ta peau brûlante). `mosaicOrder` (liste d’`id`, dans `data.js` seulement) = ordre de la mosaïque `projets/` et de la navigation précédent/suivant (Contrôle sanitaire, ADAM, Matriochka, Sous ta peau brûlante, …) ; un projet absent de la liste est placé à la suite. Ne pas réordonner les blocs de `data.en.js` sans faire de même dans `data.js` (fusion par position).
- **Projet hors mosaïque** : `mosaic: false` dans `data.js` le masque de `projets/` et de la navigation précédent/suivant des autres projets, mais pas de sa rubrique (Merci Maman). Le retirer (et l’ajouter à `mosaicOrder`) pour l’afficher partout.
- **Pages projets** : titre en Cormorant Garamond majuscules ; champs `method` (« Mon intervention », une ligne) et `synopsis` (facultatif : sans lui, la distribution occupe toute la largeur), `stats` (chiffres clés), `credits` (une ligne peut porter un `url`, rendu en lien externe), « Mon intervention » : une majuscule après chaque flèche ; distribution en petit sur 3 colonnes ; survol des vignettes : genre en grand, rôle en petit ; crédits photo `@sensibleindocile` dans la fiche seulement.
- **Boucles vidéo muettes** : `tile.loop` / `hero.loop` ; jouées en continu dès que le cadre est visible, jamais avec mouvement réduit ou économie de données. Jamais de film source dans le dépôt (limite GitHub 100 Mo).
- **Visuels animés** : liens `<a class="player">` vers la vidéo (nouvel onglet, `hero.url`), sans bouton play ni iframe ; bande-démo vers Filmmakers (le titre YouTube contient un numéro de téléphone). Les encarts (liens) sont dans la colonne `.essentials`, sous le dernier bloc de texte.
- **Audio** : `productions-audio`, groupes (`groups`) puis fiches (`items`) ; pastilles de genres collantes (`.audio-chips`, ancres `#genre-<id>`), survol des couvertures et apparition décalée (`--i`) coupés sous `prefers-reduced-motion`. Les nombres (« neuf productions », « 9 contrats ») sont à tenir à jour dans les deux langues, les preuves de À propos et la description du générateur.
- **À propos** : « Ce que je fais » = boutons `aria-expanded` ; un clic ouvre toute la ligne de la grille (`initDo`). Ordre : Ce que je fais, Preuves, Domaines, Identité, Exemples d’application. Seuls des faits vérifiés.
- **Acting** : portraits `contenu/photos/acting/portrait-NN.webp` (5 grands, 5 petits), crédits photo obligatoires ; aucun CV téléchargeable ; agents (`agent`, `adAgent`, `adAgent2`).
- **CV** : non publié. Tout PDF publié : jamais de numéro de téléphone (texte, lien, métadonnées).
- **Référencement** : généré (constante `BASE`, canonical, hreflang, JSON-LD, `sitemap.xml`). Le `robots.txt` est celui du site de la compagnie.

## Originaux privés (hors dépôt)

Les originaux lourds (films, photos HD, portraits, ADAM, démo voix, CV, logos) et le mémo `AMELIORATIONS.md` ne sont **pas** dans git : ils sont dans le dossier **Portfolio - originaux** de l’ordinateur de Léonore (OneDrive). Ne jamais copier dans le dépôt un fichier dont le nom ou les métadonnées contiennent un numéro de téléphone.

## Vérifier avant de publier

Servir le dossier `leonore_vanier/` comme sous-dossier d’un site (ex. `python -m http.server 8000` à la racine du dépôt, puis http://localhost:8000/leonore_vanier/) et contrôler : toutes les pages du `sitemap.xml` (FR et EN) se chargent sans requête en erreur, sans erreur JavaScript, sans image cassée ; mode clair et sombre ; 375 px sans défilement horizontal ; mouvement réduit. Le dossier est dans OneDrive ou téléchargé : une image peut parfois se charger lentement, recharger.
