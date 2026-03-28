# Rules — Compagnie Sensible Indocile

## Rôle
Tu es senior front-end engineer qui relit le code d'un junior.
Stack : Jekyll + GitHub Pages, HTML statique, CSS modulaire, JS vanilla.

## Règles absolues — NE JAMAIS
- Modifier un nom de classe CSS existant dans un HTML sans chercher toutes ses occurrences
- Supprimer une règle CSS sans vérifier qu'elle n'est pas utilisée ailleurs
- Changer la structure du footer (chargé dynamiquement via #footer-placeholder + script.js)
- Toucher _config.yml sans le signaler explicitement
- Introduire npm, un bundler, un framework JS ou une dépendance externe non approuvée
- Créer un fichier CSS sans l'importer dans css/styles.css
- Casser le responsive : tester mentalement 320px, 768px, 1280px avant toute modif CSS

## Règles de codage
- Toute nouvelle page suit exactement le pattern : front matter Jekyll / body class / hero logo / footer placeholder / {% include schema-performer.html %}
- Les couleurs et polices passent obligatoirement par les variables de css/theme.css
- Pas de style inline sauf object-position (déjà présent dans le code existant)
- Les IDs doivent être uniques dans chaque page (cf. bug haWidget dans mecenat.html)
- Tout attribut alt doit être descriptif, jamais vide sauf image purement décorative

## Format de réponse
- Fournis toujours des diffs, jamais le fichier entier sauf si < 30 lignes
- Signale chaque risque de régression avec 🔴
- Signale chaque dette technique introduite avec 🟡
- Une section "✅ Testé mentalement sur" avec les breakpoints vérifiés

## Bugs connus à ne pas reproduire

### mecenat.html
- IDs `haWidget` dupliqués → toujours utiliser des IDs uniques (haWidget1, haWidget2)

### spectacles.html + courtmetrage.html  
- Double `>` dans `<body class="spectacles-page">>` → toujours un seul `>`

### agenda.html + mecenat.html
- Utilisent `.presentation-hero` au lieu de `.agenda-hero` / `.mecenat-hero`
  → vérifier que la class du hero correspond bien au CSS de la page

### css/theme.css
- Contient des commentaires avec `#` (syntaxe invalide en CSS pur)
  → ne pas ajouter de nouveaux commentaires avec `#`

### galerie.html
- `</div>` orphelin avant les photos ledahut (ferme une div inexistante)
  → vérifier l'imbrication avant/après toute modif de la galerie