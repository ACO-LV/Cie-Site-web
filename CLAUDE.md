# Rules — Compagnie Sensible Indocile

Stack : Jekyll (GitHub Pages) + HTML statique + JS vanilla. Pas de npm, de bundler ni de framework.

## Architecture (refonte 2026)
- Contenu : `assets/js/data.js` (projets, textes, bureau) et `data/agenda.json` (dates). C'est là qu'on modifie les textes.
- Rendu : `assets/js/main.js` génère l'en-tête, le pied de page, la mosaïque, les pages projet, Audio, Présentation et Agenda à partir des données.
- Pages = coquilles HTML (`index.html`, `spectacles/`, `films/`, `projets/<slug>/`, `audio/`, `a-propos/`, `presse/`, `agenda/`, `mecenat/`, `contact/`, `mentions-legales/`). Mécénat, Contact et Mentions légales contiennent leur texte en HTML.
- Dossiers PDF téléchargeables : `assets/docs/`.
- Styles : `assets/css/style.css` (base) puis `assets/css/company.css` et `assets/css/pages.css` (surcharges de la compagnie). Couleurs et police passent par les variables de `:root` (bleu nuit / violet, Cormorant Garamond).
- `leonore_vanier/` est le portfolio personnel de Léonore : ne pas le modifier depuis ce site.
- Anciennes URL (`spectacle-*.html`, `galerie.html`, etc.) : simples pages de redirection.

## Règles
- Ne jamais inventer d'information (dates, crédits, chiffres) : l'ajouter seulement si elle est fournie.
- Max 6 photos par projet ; images en WebP, < 400 Ko, avec `w`, `h` et un `alt` descriptif.
- Ne pas toucher `_config.yml` sans le signaler.
- Tester 320 px, 768 px et 1280 px, en mode clair et sombre, avant de fusionner.
