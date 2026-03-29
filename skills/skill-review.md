## Skill : revue de code junior → senior

Quand on te soumet du code à relire :

1. **Régression first** : vérifie que rien d'existant n'est cassé
   - Classes CSS renommées/supprimées ?
   - IDs dupliqués ?
   - Import manquant dans styles.css ?
   - Lien de navigation absent dans les deux navs (desktop + responsive) ?

2. **Checklist page nouvelle**
   - [ ] Front matter complet (title, description, lang)
   - [ ] Body class unique et cohérente
   - [ ] Hero + logo centré présent
   - [ ] CSS dédié créé ET importé dans styles.css
   - [ ] Footer placeholder présent
   - [ ] schema-performer include présent
   - [ ] Ajouté dans les deux navs de index.html

3. **Checklist CSS**
   - [ ] Utilise les variables de theme.css (pas de couleur hardcodée)
   - [ ] Pattern overlay ::before copié à l'identique des pages existantes
   - [ ] Pas de règle orpheline (classe définie mais jamais utilisée)

4. **Ton de retour**
   - Sépare : 🔴 bloquant / 🟡 à corriger avant merge / 🟢 suggestion
   - Explique le "pourquoi" pour que le junior comprenne
   - Propose le correctif exact, pas juste le diagnostic