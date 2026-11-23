# Portfolio de Léonore Vanier — guide de mise à jour

Site : <https://lacompagniesensibleindocile.fr/leonore_vanier/> (français) et <https://lacompagniesensibleindocile.fr/leonore_vanier/en/> (anglais).

**Tout ce que vous modifiez se trouve dans le dossier [`contenu/`](https://github.com/ACO-LV/Cie-Site-web/tree/main/leonore_vanier/contenu).** Le reste (`assets/`, `_outils/`, les dossiers de pages) est le moteur du site : n'y touchez pas.

## Je veux… → où aller

| Je veux… | Fichier ou dossier | Lien |
|---|---|---|
| Changer un texte, un chiffre, un lien (français) | `contenu/data.js` | [Modifier](https://github.com/ACO-LV/Cie-Site-web/edit/main/leonore_vanier/contenu/data.js) |
| Faire la même chose en anglais | `contenu/data.en.js` | [Modifier](https://github.com/ACO-LV/Cie-Site-web/edit/main/leonore_vanier/contenu/data.en.js) |
| Ajouter une photo | `contenu/photos/<projet>/` | [Choisir le dossier](https://github.com/ACO-LV/Cie-Site-web/tree/main/leonore_vanier/contenu/photos) puis **Add file → Upload files** |
| Ajouter un livre audio (couverture) | `contenu/photos/audio/` | [Ouvrir](https://github.com/ACO-LV/Cie-Site-web/tree/main/leonore_vanier/contenu/photos/audio) |
| Remplacer une boucle vidéo ou la démo voix | `contenu/video/`, `contenu/audio/` | [Vidéos](https://github.com/ACO-LV/Cie-Site-web/tree/main/leonore_vanier/contenu/video) · [Audio](https://github.com/ACO-LV/Cie-Site-web/tree/main/leonore_vanier/contenu/audio) |

```
leonore_vanier/
  contenu/     ← MODIFIER ICI : data.js, data.en.js, photos/, audio/, video/
  assets/      ne pas toucher (style et fonctionnement du site)
  _outils/     ne pas toucher (génération des pages)
  a-propos/ acting/ audio/ contacts/ fiction/ ia/ projets/ spectacles-vivants/ en/
               ne pas toucher (pages générées)
  README.md    ce guide
```

## Modifier un fichier sur GitHub, pas à pas

1. Cliquez sur le lien **Modifier** du tableau (connexion à GitHub nécessaire).
2. Cherchez le texte avec **Ctrl + F** (un mot du texte actuel, ou le nom du projet).
3. Changez **seulement le texte entre guillemets**. Laissez les guillemets, virgules, accolades `{ }` et crochets `[ ]` : une virgule oubliée suffit à vider tout le site.
4. En haut à droite, **Commit changes…** → **Commit directly to the `main` branch** → **Commit changes**.
5. Attendez **2 à 10 minutes**, puis rechargez la page en forçant : **Ctrl + F5** (le navigateur garde l'ancienne version environ 10 minutes).

Si le site s'affiche vide ou cassé après une modification : ne touchez à rien d'autre et demandez à Claude « annule mon dernier changement sur le portfolio ».

## Règle d'or : français ET anglais

Chaque texte existe dans `data.js` (français) **et** `data.en.js` (anglais). Les deux fichiers sont fusionnés **par position** : le 2ᵉ projet anglais correspond au 2ᵉ projet français, la 3ᵉ photo à la 3ᵉ photo, etc. Donc :
- ajoutez ou supprimez un élément **aux deux endroits, au même rang** ;
- ne changez jamais l'ordre d'un côté seulement.

## Fiches pratiques

**Changer un chiffre (ex. nombre de vues).** Cherchez l'ancien chiffre dans les deux fichiers : il est parfois à deux endroits (page du projet **et** page À propos, rubrique « preuves »).

**Ajouter une photo à un projet.**
1. Préparez-la : format **WebP**, environ 1 600 px de large, sans numéro de téléphone dans le nom du fichier.
2. Déposez-la dans `contenu/photos/<projet>/`.
3. Dans `data.js`, dans le bloc du projet, ajoutez à la liste `gallery` :
   `{ src: "contenu/photos/<projet>/<fichier>.webp", w: 1600, h: 900, alt: "Description de l'image", caption: "Photo : Nom" },`
   (`w` et `h` = dimensions réelles en pixels.)
4. Dans `data.en.js`, au **même rang** : `{ alt: "Image description", caption: "Photo: Name" },`

**Ajouter le lien de visionnage d'un film (ex. Matriochka).** Dans le bloc du projet de `data.js`, remplacez `links: []` par
`links: [{ label: "Voir le film sur YouTube", url: "https://..." }]`, puis dans `data.en.js` : `links: [{ label: "Watch the film on YouTube" }]`. Pensez à adapter la ligne `status:` (« Production : novembre 2026 »).

**Remplacer le visuel d'un projet (ex. la vignette de Matriochka).** Déposez la photo dans `contenu/photos/<projet>/`, puis changez `src`, `w`, `h` et `alt` aux deux endroits du bloc du projet : `tile.images` (vignette de la mosaïque) et `hero.image` (grand visuel de la page). Faites de même pour `alt` dans `data.en.js`.

**Livre audio : mettre le lien Audible.** Dans `data.js`, section des productions audio, remplacez `listen: null` par
`listen: { label: "Écouter sur Audible", url: "https://..." }` et supprimez la ligne `status: "En cours de production",`. En anglais : `listen: { label: "Listen on Audible" }`. Pour la couverture : déposez-la dans `contenu/photos/audio/` puis remplacez `cover: null` par un bloc `{ src: "...", w: 800, h: 800, alt: "..." }`.

**Ajouter un livre audio.** Copiez le bloc d'un livre existant dans la bonne liste `items` (ou créez un groupe en copiant un groupe entier), changez titre, auteur, genre, série. Mettez à jour les nombres (« neuf productions », « 9 contrats »…) : cherchez `neuf` et `9 ` dans les deux fichiers.

**Afficher un projet dans la mosaïque.** Merci Maman n'y est pas : son bloc contient la ligne `mosaic: false,`. Supprimez-la (dans `data.js`) pour le montrer dans la mosaïque de la page Projets, puis ajoutez son `id` à la liste `mosaicOrder` (voir ci-dessous) à la place voulue ; sans cela il est placé à la fin.

**Changer l'ordre.** Deux ordres existent :
- **la mosaïque** (page Projets) et les boutons « précédent / suivant » : la liste `mosaicOrder` en haut de la section PROJETS de `data.js` (les identifiants des projets, dans l'ordre voulu) ; un seul fichier à modifier ;
- **la page d'une rubrique** (ex. Fiction, Spectacles vivants) : l'ordre des blocs dans `projects`, dans `data.js` **et** `data.en.js` (même ordre des deux côtés).

Le menu : liste `nav` (aux deux endroits).

**Agents, portraits, démo voix.** Section `ACTING` de `data.js`.

## Règles à respecter

- **Ne jamais inventer** une information : mettre `null` et l'ajouter à votre liste de visuels et chiffres à fournir.
- **Aucun numéro de téléphone** sur le site : ni dans un texte, ni dans un nom de fichier, ni dans les propriétés d'une photo ou d'un PDF.
- Typographie : apostrophes courbes ’ et guillemets « », les espaces avant `:` `;` `?` `!` sont gérées par le site.
- Photos : WebP, environ 1 600 px de large. Pas de film lourd (GitHub refuse plus de 100 Mo) : seulement des boucles muettes courtes.
- Ne pas modifier `assets/`, `_outils/` ni les dossiers de pages à la main.

## Ce qui demande l'aide de Claude (une phrase suffit)

Créer la **page d'un nouveau projet** ou d'une nouvelle rubrique, changer l'apparence, ou régénérer les pages. Exemples :
- « Ajoute le projet XXX à la rubrique Fiction, voici les informations : … »
- « Remplace la photo d'affiche de YYY par celle que j'ai déposée dans `contenu/photos/…` »
- « Annule mon dernier changement sur le portfolio »

Dites-lui de travailler dans le dépôt `ACO-LV/Cie-Site-web`, dossier `leonore_vanier/`, et d'appliquer les règles de `leonore_vanier/CLAUDE.md`.

## Vos originaux ne sont pas sur GitHub

Les originaux lourds (films, photos haute définition, démo voix, CV, logos) et le mémo privé des visuels à fournir sont dans le dossier **Portfolio - originaux** de votre ordinateur (OneDrive). Ne le supprimez pas : GitHub n'en garde aucune copie.
