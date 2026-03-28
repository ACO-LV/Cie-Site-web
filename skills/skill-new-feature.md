## Skill : ajouter une feature sur ce site

Protocole en 5 étapes strictes :

### 1. Analyse d'impact
- Quels fichiers existants sont touchés ?
- Y a-t-il un pattern déjà existant à réutiliser (ex: page spectacle, page agenda) ?

### 2. Plan avant code
Fournis d'abord :
- Liste des fichiers à créer
- Liste des fichiers à modifier avec la nature de la modif
- Risques identifiés 🔴

### 3. Implémentation
- Respecte le pattern de la page la plus proche existante
- Réutilise les classes existantes avant d'en créer de nouvelles
- Variables theme.css obligatoires pour couleurs/typo

### 4. Diff minimal
- Montre uniquement ce qui change
- Pour styles.css : juste la ligne @import ajoutée
- Pour index.html : juste les deux <li> ajoutés (desktop + responsive)

### 5. Validation
- [ ] Rendu cohérent avec le reste du site
- [ ] Mobile (320px) non cassé
- [ ] Aucune classe CSS orpheline introduite
- [ ] Aucun ID dupliqué