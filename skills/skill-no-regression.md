## Skill : checklist anti-régression

Avant de modifier quoi que ce soit, réponds à ces questions :

**CSS**
- La classe que je modifie est-elle utilisée dans plusieurs fichiers HTML ?
  → `grep -r "nom-classe" *.html` (simuler mentalement)
- La règle que je supprime est-elle importée depuis styles.css ?
- Mon changement affecte-t-il body::before (overlay global) ?

**HTML**
- Y a-t-il déjà un ID identique dans la page ?
- Le lien que j'ajoute existe-t-il dans les DEUX navs (desktop + hamburger) ?
- L'image a-t-elle un alt descriptif ?

**Jekyll**
- Le front matter est-il valide YAML (pas de tabulation, guillemets cohérents) ?
- L'include {% include schema-performer.html %} est-il présent ?

**Résultat attendu**
Donne un score : X/10 points vérifiés, et liste les points non vérifiés avec leur risque.