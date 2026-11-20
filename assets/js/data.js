/*
 * ============================================================================
 *  CONTENU DU SITE — Compagnie Sensible Indocile (le seul fichier à modifier pour changer les textes)
 * ============================================================================
 *  Sommaire :  1. IDENTITÉ   2. NAVIGATION ET LIBELLÉS   3. PROJETS (un bloc par projet,
 *  dans l'ordre de la mosaïque)   4. ACCUEIL ET PRÉSENTATION   5. BUREAU
 *  Les dates de l'agenda sont dans data/agenda.json.
 *  Règles : ne jamais inventer d'information ; chemins d'images relatifs à la racine ;
 *  une image = src, w, h (dimensions réelles) et alt (description).
 *  tile.loop : boucle vidéo muette jouée sur la vignette.
 */
window.SITE = {
  lang: "fr",

  /* 1. IDENTITÉ ------------------------------------------------------------- */
  name: "Sensible Indocile",
  baseline: "Compagnie de productions audiovisuelles & spectacle vivant",
  instagram: { label: "@ciesensibleindocile", url: "https://www.instagram.com/ciesensibleindocile" },
  company: {
    mark: { src: "assets/img/brand/logo-mark.webp", w: 160, h: 299, alt: "Logo Sensible Indocile" },
    markDark: { src: "assets/img/brand/logo-mark-sombre.webp", w: 160, h: 299, alt: "Logo Sensible Indocile" },
    full: { src: "assets/img/brand/logo-sensible-indocile.webp", w: 640, h: 833, alt: "Sensible Indocile — Production Company" },
    fullDark: { src: "assets/img/brand/logo-sensible-indocile-sombre.webp", w: 640, h: 835, alt: "Sensible Indocile — Production Company" }
  },

  /* 2. NAVIGATION ET LIBELLÉS ---------------------------------------------- */
  nav: [
    { id: "projets", label: "Projets", path: "projets/" },
    { id: "audio", label: "Audio", path: "audio/" },
    { id: "presentation", label: "Présentation", path: "presentation/" },
    { id: "agenda", label: "Agenda", path: "agenda/" },
    { id: "mecenat", label: "Mécénat", path: "mecenat/" },
    { id: "contact", label: "Contact", path: "contact/" }
  ],
  categories: {
    spectacles: { label: "Spectacles", description: "Théâtre contemporain." },
    films: { label: "Films", description: "Courts-métrages et séries." },
    ia: { label: "Fictions IA", description: "Fictions créées avec des outils de génération vidéo IA." },
    audio: { label: "Audio", description: "Livres audio : narration, direction artistique et production." }
  },
  ui: {
    skip: "Aller au contenu",
    menu: "Menu",
    mainNav: "Navigation principale",
    newTab: "(nouvel onglet)",
    role: "Rôle",
    roleSr: "Rôle : ",
    projects: "Projets",
    allCategories: "Tous",
    filterLabel: "Filtrer par catégorie",
    method: "Intervention",
    synopsis: "Synopsis",
    toolsUsed: "Outils utilisés",
    themeToLight: "Passer en mode clair",
    themeToDark: "Passer en mode sombre",
    watchVideo: "Voir la vidéo : ",
    gallery: "Photos",
    credits: "Fiche et crédits",
    awards: "Distinctions et sélections",
    prev: "← Précédent",
    next: "Suivant →",
    otherProjects: "Autres projets",
    allProjects: "Tous les projets",
    textBy: "Texte de",
    genre: "Genre",
    series: "Série",
    eightProductions: "Les huit productions",
    support: "Soutenir la compagnie",
    discoverBain: "Découvrir LE BAIN",
    ourProjects: "Nos projets",
    footerRights: "Tous droits réservés",
    legal: "Mentions légales",
    bureauTitle: "Le bureau de l'association",
    servicesTitle: "Ce que fait la compagnie",
    servicesIntro: "Sensible Indocile conçoit, produit et diffuse des projets audiovisuels, sonores et scéniques, de l'écriture à la livraison.",
    howTitle: "Comment nous vous accompagnons",
    contactTitle: "Parlons de votre projet",
    contactText: "Vous portez un projet, une commande ou une idée de collaboration ? Écrivez-nous : nous vous répondons rapidement.",
    contactBtn: "Nous contacter",
    memberOpen: "Voir la fiche de ",
    memberClose: "Fermer",
    seeProject: "Voir le projet"
  },

  /* 3. PROJETS ------------------------------------------------------------- *
   * L'ordre de cette liste = ordre de la mosaïque et de la navigation précédent / suivant. */
  projects: [
    {
      id: "le-bain",
      category: "spectacles",
      slug: "le-bain",
      title: "LE BAIN",
      format: "Théâtre contemporain · Paris + Festival OFF Avignon 2026",
      role: "Productrice · Auteure · Co-metteuse en scène",
      description:
        "LE BAIN, théâtre contemporain à Paris et au Festival OFF d’Avignon 2026 : production, écriture et co-mise en scène par Léonore Vanier.",
      synopsis: "Pièce de théâtre contemporain, présentée à Paris puis au Festival OFF d’Avignon 2026.",
      method: "Modèle économique et financements → Production et coordination de 13 personnes → Plus de 30 représentations à Paris et Avignon.",
      highlight: { icon: "masks", text: "Festival OFF Avignon 2026 — La Factory" },
      tile: {
        ratio: "16 / 9",
        focus: "50% 50%",
        loop: "assets/video/le-bain.mp4",
        images: [
          {
            src: "assets/img/le-bain/scene-mouvement.webp",
            w: 1600,
            h: 1067,
            alt: "Scène du BAIN : silhouette en mouvement flou sous une lumière bleue."
          }
        ]
      },
      hero: {
        type: "youtube",
        id: "aE0wtUnpz-Y",
        loop: "assets/video/le-bain.mp4",
        title: "LE BAIN, teaser",
        poster: {
          src: "assets/img/le-bain/scene-mouvement.webp",
          w: 1600,
          h: 1067,
          alt: "Scène du BAIN : silhouette en mouvement flou sous une lumière bleue."
        }
      },
      stats: [
        { value: "45 k€", label: "budget de production" },
        { value: "13", label: "personnes coordonnées" },
        { value: "30+", label: "représentations" },
        { value: "21 k€", label: "financements levés" },
        { value: "> 75 %", label: "de taux de remplissage au Festival OFF Avignon 2026" }
      ],
      awards: [],
      press: {
        outlet: "La Provence",
        title: "Festival off : « Le Bain », absurde et dérangeant",
        author: "Jean-Noël Grando",
        date: "19 juillet 2026",
        url: "https://www.laprovence.com/article/region/9482563578810414/festival-off-le-bain-absurde-et-derangeant"
      },
      pressImage: {
        image: {
          src: "assets/img/le-bain/image1.webp",
          w: 915,
          h: 902,
          alt: "Coupure de presse : « Au festival off d’Avignon, Léonore Vanier se jette dans Le (grand) Bain », article avec la photo de Léonore Vanier tenant un livret."
        },
        credit: "La République de Seine-et-Marne"
      },
      gallery: [
        {
          src: "assets/img/le-bain/scene-baignoire.webp",
          w: 1536,
          h: 1075,
          alt: "Scène du BAIN : une femme dans une baignoire blanche entre deux autres, sur un plateau sombre éclairé de bleu.",
          caption: "Photo : Arthur Couvreur"
        },
        {
          src: "assets/img/le-bain/divine.webp",
          w: 1600,
          h: 1067,
          alt: "Scène du BAIN : une comédienne en chemise blanche tient un papier sous une lumière violette.",
          caption: "Photo : Marcus Boury"
        },
        {
          src: "assets/img/le-bain/scene-pied.webp",
          w: 1600,
          h: 1067,
          alt: "Scène du BAIN : une comédienne sourit dans une baignoire blanche, les jambes en l’air.",
          caption: "Photo : Matthieu Le Jeune"
        },
        {
          src: "assets/img/le-bain/grace.webp",
          w: 1200,
          h: 1800,
          alt: "Scène du BAIN : une comédienne assise au sol près d’une bougie, sur un plateau éclairé de bleu et de violet.",
          caption: "Photo : Marcus Boury"
        },
        {
          src: "assets/img/le-bain/lebain1.webp",
          w: 1200,
          h: 1600,
          alt: "Le Bain : visage d’une comédienne mouillé, sous une lumière bleutée.",
          caption: "Photo : Léonore Vanier"
        },
      ],
      credits: [
        { label: "Genre", value: "Théâtre contemporain" },
        { label: "Écriture · Production", value: "Léonore Vanier" },
        { label: "Mise en scène", value: "Léonore Vanier et Clara Kermarec" },
        { label: "Composition sonore", value: "Zoé Juin" },
        { label: "Interprétation", value: "Mélina Cortès-Davezat, Antoine Ody, Adèle Thomas, Léonore Vanier" },
        { label: "Direction technique", value: "Dominique Pierson" },
        { label: "Soutiens", value: "Théâtre Municipal de Fontainebleau, Service culturel de Montrouge, Cours Florent" },
        { label: "Paris", value: "Théâtre La Croisée des Chemins, du 15 novembre 2025 au 4 janvier 2026" },
        { label: "Avignon", value: "Festival OFF 2026 (La Factory, salle des Antonins)" }
      ],
      links: [
        {
          label: "Lire l’article de La Provence",
          url: "https://www.laprovence.com/article/region/9482563578810414/festival-off-le-bain-absurde-et-derangeant"
        },
        { label: "Acheter la pièce", url: "https://www.amazon.fr/BAIN-pi%C3%A8ce-th%C3%A9%C3%A2tre-contemporaine-absurde/dp/B0G1HZQBQG", primary: true }
      ]
    },

    /* ---- LE DAHUT ---- */
    {
      id: "le-dahut",
      category: "films",
      slug: "le-dahut",
      title: "Le Dahut",
      format: "Court-métrage · Prix Florent Image 2025",
      filmBy: "Un film de Léonore Vanier",
      role: "Réalisation · Production",
      description:
        "Le Dahut, premier court-métrage de fiction réalisé par Léonore Vanier dans le cadre du Prix Florent Image 2025, produit par la Compagnie Sensible Indocile.",
      synopsis:
        "Connaissez-vous le Dahut ? À Dahut-Ville, petite bourgade des Vosges, statues, panneaux et spécialités locales : tout est créé pour faire croire à l'existence de cet animal. Quatre amis d'enfance partent à sa recherche, guidés par Daniel et Muriel, un couple de guides passionnés. Mais très vite, des indices troublants se multiplient : des empreintes « trop parfaites », des bruits étranges la nuit, des murmures entre les guides. Emma, déterminée, prend les rênes de l'enquête et découvre la vaste supercherie. Avant de quitter le refuge, une silhouette étrange apparaît au loin sur une crête, laissant planer un doute : le Dahut existe-t-il vraiment ?",
      tile: {
        ratio: "16 / 9",
        focus: "50% 45%",
        images: [
          {
            src: "assets/img/le-dahut/photo-1.webp",
            w: 1600,
            h: 900,
            alt: "Le Dahut : cinq amis en vestes de montagne assis sur un banc devant une forêt."
          }
        ]
      },
      hero: {
        type: "image",
        image: {
          src: "assets/img/le-dahut/affiche.webp",
          w: 800,
          h: 1132,
          alt: "Affiche du Dahut, un film de Léonore Vanier : cinq amis en vestes de montagne devant une forêt."
        }
      },
      stats: [],
      awards: [],
      gallery: [
        {
          src: "assets/img/le-dahut/photo-2.webp",
          w: 1600,
          h: 900,
          alt: "Le Dahut : des promeneurs de dos, assis face à un paysage de montagnes sous un ciel ensoleillé."
        },
        {
          src: "assets/img/le-dahut/photo-3.webp",
          w: 1600,
          h: 900,
          alt: "Le Dahut : paysage vallonné des Vosges sous un ciel de traîne."
        }
      ],
      credits: [
        { label: "Format", value: "Court-métrage de fiction" },
        { label: "Réalisation", value: "Léonore Vanier" },
        { label: "Martin", value: "Guilherme Conde" },
        { label: "Romy", value: "Juliette Ganay" },
        { label: "Tom", value: "Colin Pugin-Bron" },
        { label: "Emma", value: "Léonore Vanier" },
        { label: "Daniel", value: "Adrien Genoud" },
        { label: "Muriel", value: "Félicie Genest" },
        { label: "Assistant à la mise en scène", value: "Nemo Pierson" },
        { label: "Assistant réalisateur", value: "Guilherme Conde" },
        { label: "Direction de la photographie", value: "Salomé Bossé" },
        { label: "Son", value: "Joseph Laurent et Calypso Vanier" },
        { label: "Régie", value: "Arthur Couvreur" },
        { label: "Soutiens", value: "Compagnie Sensible Indocile, Mairie de Faucompierre, Cours Florent, Armand Lameloise" }
      ],
      links: []
    },

    {
      id: "sous-ta-peau-brulante",
      category: "films",
      slug: "sous-ta-peau-brulante",
      title: "Sous ta peau brûlante",
      format: "Court-métrage · 2025 · 1 min",
      role: "Productrice · Auteure · Réalisatrice",
      description:
        "Sous ta peau brûlante, court-métrage de fiction (2025, 1 min) écrit et réalisé par Léonore Vanier, produit par la Compagnie Sensible Indocile.",
      synopsis: "Entre Axel et Léo, c’est tout de suite l’étincelle. Alors que le date se poursuit à merveille, Léo remarque un détail chez Axel qui va faire basculer leur idylle en drame.",
      method: "Écriture → Préparation → Tournage → Postproduction (montage, étalonnage, mixage) → Festivals et diffusion en ligne.",
      methodNote: "En collaboration avec le Cours Florent.",
      tile: {
        ratio: "16 / 9",
        focus: "50% 40%",
        loop: "assets/video/sous-ta-peau-brulante.mp4",
        images: [
          {
            src: "assets/img/sous-ta-peau-brulante/photogramme-1.webp",
            w: 1600,
            h: 900,
            alt: "Sous ta peau brûlante : deux silhouettes de profil, face à face, sur un fond violet."
          }
        ]
      },
      hero: {
        type: "youtube",
        id: "jm_t5PYLE94",
        loop: "assets/video/sous-ta-peau-brulante.mp4",
        title: "Sous ta peau brûlante, court-métrage",
        poster: {
          src: "assets/img/sous-ta-peau-brulante/photogramme-1.webp",
          w: 1600,
          h: 900,
          alt: "Sous ta peau brûlante : deux silhouettes de profil, face à face, sur un fond violet."
        }
      },
      stats: [{ value: "4 400 vues", label: "sur Instagram (mai 2025)" }],
      awards: [{ label: "Sélection festival", detail: "1 min 2 court", source: null }],
      gallery: [
        {
          src: "assets/img/sous-ta-peau-brulante/photogramme-1.webp",
          w: 1600,
          h: 900,
          alt: "Sous ta peau brûlante : deux silhouettes de profil, face à face, sur un fond violet."
        },
        {
          src: "assets/img/sous-ta-peau-brulante/photogramme-2.webp",
          w: 1600,
          h: 900,
          alt: "Sous ta peau brûlante : deux silhouettes enlacées sur un fond violet, un bras levé."
        },
        {
          src: "assets/img/sous-ta-peau-brulante/photogramme-3.webp",
          w: 1600,
          h: 900,
          alt: "Sous ta peau brûlante : gros plan sur le visage d’un jeune homme de profil, une main posée sur son épaule."
        },
        {
          src: "assets/img/sous-ta-peau-brulante/photogramme-4.webp",
          w: 1600,
          h: 900,
          alt: "Sous ta peau brûlante : deux hommes enlacés, l’un le visage tourné vers le haut."
        }
      ],
      credits: [
        { label: "Format", value: "Court-métrage de fiction, 2025" },
        { label: "Durée", value: "1 minute" },
        { label: "Réalisation · Écriture", value: "Léonore Vanier" },
        { label: "Assistanat à la réalisation", value: "Juliette Ganay" },
        { label: "Direction de la photographie", value: "Calypso Vanier" },
        { label: "Son et lumière", value: "Joseph Laurent" },
        { label: "Distribution", value: "Mathias Benhamou, Louis Faudais, Félicie Genest" },
        { label: "Musique", value: "« Sicilian Tango », Joshua Arcoleo et Alex Munk (Cezame Music)" },
        { label: "Production", value: "Compagnie Sensible Indocile et Léonore Vanier, en collaboration avec le Cours Florent" },
        { label: "Photos", value: "@sensibleindocile" }
      ],
      links: [{ label: "Voir le film sur YouTube", url: "https://youtu.be/jm_t5PYLE94" }]
    },

    {
      id: "le-controle-sanitaire",
      category: "films",
      slug: "le-controle-sanitaire",
      title: "Le Contrôle sanitaire",
      format: "Court-métrage · 2026 · 8 min",
      filmBy: "Un film de Léonore Vanier & Juliette Ganay",
      role: "Productrice · Auteure · Réalisatrice",
      description:
        "Le Contrôle sanitaire, court-métrage de fiction (2026, 8 min), un film de Léonore Vanier et Juliette Ganay. Sélections et mention spéciale en festivals.",
      synopsis: "Alice et Sacha s’aiment éperdument depuis 5 ans, mais le couple s’est fragilisé. Unies par un même amour, les deux jeunes femmes cherchent à concilier leur couple et leurs différences.",
      method: "Écriture → Préparation → Tournage → Postproduction (montage, étalonnage, mixage) → Festivals et diffusion en ligne.",
      tile: {
        ratio: "16 / 9",
        focus: "50% 40%",
        loop: "assets/video/le-controle-sanitaire.mp4",
        images: [
          {
            src: "assets/img/le-controle-sanitaire/hd-1.webp",
            w: 1600,
            h: 900,
            alt: "Le Contrôle sanitaire : deux femmes face à face dans une chambre, l’une rejetant ses cheveux en arrière."
          }
        ]
      },
      hero: {
        type: "youtube",
        id: "SmhharGafCE",
        loop: "assets/video/le-controle-sanitaire.mp4", // animée au survol
        title: "Le Contrôle sanitaire, court-métrage",
        poster: {
          src: "assets/img/le-controle-sanitaire/hd-1.webp",
          w: 1600,
          h: 900,
          alt: "Le Contrôle sanitaire : deux femmes face à face dans une chambre, l’une rejetant ses cheveux en arrière."
        }
      },
      stats: [{ value: "33 000 vues", label: "sur YouTube (octobre 2026)" }],
      awards: [
        {
          label: "Mention spéciale",
          icon: "trophy",
          detail: "pour « la qualité de l’écriture et de l’interprétation »",
          source: "Prix Florent Image 2026"
        },
        {
          label: "Sélection officielle 2026",
          detail: "Plus c’est court, plus c’est bon · KINO POP Festival · CAST Festival",
          source: null
        }
      ],
      gallery: [
        {
          src: "assets/img/le-controle-sanitaire/hd-7.webp",
          w: 1600,
          h: 900,
          alt: "Le Contrôle sanitaire : deux jeunes femmes de profil, face à face dans une chambre ; l’une pose la main sur le menton de l’autre, bouche ouverte."
        },
        {
          src: "assets/img/le-controle-sanitaire/hd-2.webp",
          w: 1600,
          h: 900,
          alt: "Le Contrôle sanitaire : portrait d’une jeune femme brune en peignoir bleu, l’air inquiet, dans une chambre."
        },
        {
          src: "assets/img/le-controle-sanitaire/hd-3.webp",
          w: 1600,
          h: 900,
          alt: "Le Contrôle sanitaire : portrait d’une jeune femme aux cheveux courts, bouche entrouverte, guirlande lumineuse en arrière-plan."
        },
        {
          src: "assets/img/le-controle-sanitaire/hd-4.webp",
          w: 1600,
          h: 900,
          alt: "Le Contrôle sanitaire : deux jeunes femmes rieuses se prennent dans les bras."
        },
        {
          src: "assets/img/le-controle-sanitaire/hd-5.webp",
          w: 1600,
          h: 900,
          alt: "Le Contrôle sanitaire : une jeune femme en peignoir bleu, saisie en plein mouvement, regarde hors champ."
        },
      ],
      credits: [
        { label: "Format", value: "Court-métrage de fiction, 2026" },
        { label: "Durée", value: "8 minutes" },
        { label: "Un film de", value: "Léonore Vanier & Juliette Ganay" },
        { label: "Réalisation · Production", value: "Léonore Vanier" },
        { label: "Écriture", value: "Juliette Ganay et Léonore Vanier" },
        { label: "Interprétation", value: "Juliette Ganay et Léonore Vanier" },
        { label: "Direction de la photographie", value: "Matthieu Le Jeune" },
        { label: "Son", value: "Louis Faudais" },
        { label: "Assistanat à la mise en scène", value: "Clara Kermarec" },
        { label: "Montage · Étalonnage · Mixage", value: "Léonore Vanier" },
        { label: "Photos", value: "@sensibleindocile" }
      ],
      links: [{ label: "Voir le film sur YouTube", url: "https://www.youtube.com/watch?v=SmhharGafCE" }]
    },

    {
      id: "adam",
      category: "films",
      slug: "adam",
      title: "ADAM",
      format: "Mini-série · produite par FeatureProd",
      role: "Chargée de production · Assistante réalisatrice",
      description:
        "ADAM, mini-série réalisée par Hadrien Fière et produite par FeatureProd. Léonore Vanier y est chargée de production et assistante réalisatrice.",
      synopsis: "Quand Adam apprend qu’il va devenir père, tous ses repères changent. Perdu entre loyauté pour sa nouvelle famille et sa famille d’origine, il se questionne sur son futur rôle de père.",
      method: "Production : dépouillement, plan de travail, casting, repérages · Assistanat : feuilles de service, contraintes acteurs, lieux et techniques, suivi des rushes.",
      status: "Projet en cours",
      tile: {
        ratio: "16 / 9",
        focus: "50% 50%",
        images: [
          {
            src: "assets/img/adam/adam-2-169.webp",
            w: 1011,
            h: 569,
            alt: "Image d’ADAM : un homme en long manteau vert se tient dans une rue la nuit, image floue en mouvement."
          }
        ]
      },
      hero: {
        type: "image",
        image: {
          src: "assets/img/adam/adam-2-169.webp",
          w: 1011,
          h: 569,
          alt: "Image d’ADAM : un homme en long manteau vert se tient dans une rue la nuit, image floue en mouvement."
        }
      },
      stats: [],
      awards: [],
      gallery: [
        {
          src: "assets/img/adam/adam-2.webp",
          w: 900,
          h: 1600,
          alt: "Image d’ADAM : visage de profil presque entièrement dans l’ombre, lumière rasante sur le nez et les lèvres.",
          caption: "Photo : FeatureProd"
        },
        {
          src: "assets/img/adam/adam-3.webp",
          w: 1014,
          h: 1464,
          alt: "Image d’ADAM : une main saisit une pelote d’épingles aux têtes colorées.",
          caption: "Photo : @bidounini"
        },
        {
          src: "assets/img/adam/adam-4.webp",
          w: 900,
          h: 1600,
          alt: "Image d’ADAM : un jeune homme en chemise grise, de profil au premier plan ; une femme floue se tient dans l’embrasure d’une porte.",
          caption: "Photo : FeatureProd"
        }
      ],
      galleryFirst: {
        src: "assets/img/adam/adam-1.webp",
        w: 900,
        h: 1600,
        alt: "Image d’ADAM : gros plan sur le profil d’un jeune homme barbu, visage éclairé par une lumière chaude.",
        caption: "Photo : FeatureProd"
      },
      credits: [
        { label: "Format", value: "Mini-série" },
        { label: "Réalisation", value: "Hadrien Fière" },
        { label: "Production", value: "FeatureProd" },
        { label: "Statut", value: "En cours · sortie prévue fin 2026" },
        { label: "Mon rôle", value: "Chargée de production · Assistante réalisatrice" },
        { label: "Photos", value: "@bidounini · FeatureProd" },
        { label: "Distribution et équipe", value: null, todo: "crédits d’équipe autorisés à la publication" }
      ],
      links: []
    },

    {
      id: "life-on-xenia",
      category: "ia",
      slug: "life-on-xenia",
      title: "Life on Xenia",
      format: "Série verticale · fiction générée en IA",
      role: "Productrice · Scénariste · AI Video Creator",
      description:
        "Life on Xenia, fiction verticale en 30 épisodes créée avec des outils de génération vidéo IA : écriture, génération, itérations et sélection des plans.",
      synopsis: "Fiction verticale (9:16) en 30 épisodes, générée avec des outils de création vidéo par IA.",
      method: "Écriture → Découpage et prompts → Générations et itérations → Sélection des plans et montage.",
      tools: "Runway, OpenRouter, FFmpeg, Seedance, WAN, GitHub, Visual Studio Code",
      tile: {
        ratio: "16 / 9",
        focus: "50% 50%",
        images: [
          {
            src: "assets/img/life-on-xenia/foret-vignette.webp",
            w: 1280,
            h: 720,
            alt: "Life on Xenia : une forêt luxuriante traversée de rayons de soleil."
          }
        ]
      },
      hero: {
        type: "tiktok",
        id: "7693246234198396192",
        url: "https://www.tiktok.com/@lifeonxenia/video/7693246234198396192",
        title: "Life on Xenia, extrait sur TikTok",
        ratio: "9 / 16",
        poster: {
          src: "assets/img/life-on-xenia/video-poster.webp",
          w: 720,
          h: 1280,
          alt: "Image de Life on Xenia : une femme appuyée contre un homme à l’oreille pointue, dans une forêt la nuit."
        }
      },
      stats: [
        { value: "30", label: "épisodes" },
        { value: "+ 14 000 vues", label: "sur TikTok" },
        { value: "> 8 600 vues", label: "sur Instagram" }
      ],
      statsNote: "Vues sur deux semaines de lancement (relevé : octobre 2026).",
      awards: [],
      gallery: [
        {
          src: "assets/img/life-on-xenia/lya.webp",
          w: 1600,
          h: 893,
          alt: "Planche de personnage : Lya, de face, de dos et en gros plan.",
          caption: "Planche de personnage : Lya"
        },
        {
          src: "assets/img/life-on-xenia/raafa.webp",
          w: 1600,
          h: 893,
          alt: "Planche de personnage : Raafa, de face, de dos et en gros plan.",
          caption: "Planche de personnage : Raafa"
        },
        {
          src: "assets/img/life-on-xenia/foret.webp",
          w: 1600,
          h: 893,
          alt: "Planche de décors : six variantes d’une forêt lumineuse traversée de rayons de soleil.",
          caption: "Décors : la forêt de Xenia"
        },
        {
          src: "assets/img/life-on-xenia/civilisation-ancienne.webp",
          w: 1600,
          h: 893,
          alt: "Planche de décors : vaisseau d’une civilisation ancienne recouvert de lianes dans la jungle.",
          caption: "Décors : la civilisation ancienne"
        },
      ],
      credits: [
        { label: "Format", value: "Série verticale 9:16, fiction générée en IA" },
        { label: "Épisodes", value: "30" },
        { label: "Rôle", value: "Productrice · Scénariste · AI Video Creator" },
        { label: "Outils", value: "Runway · OpenRouter · FFmpeg · Seedance · WAN · GitHub · Visual Studio Code" },
        { label: "Images", value: "@leonorevanier" }
      ],
      links: [
        { label: "Voir l’extrait sur TikTok", url: "https://www.tiktok.com/@lifeonxenia/video/7693246234198396192" },
        { label: "Life on Xenia sur Instagram", url: "https://www.instagram.com/lifeonxenia/" },
        { label: "Voir un reel sur Instagram", url: "https://www.instagram.com/reel/De4z9DGsBS4/" }
      ]
    },

    {
      id: "productions-audio",
      type: "audio",
      category: "audio",
      slug: "productions-audio",
      title: "Productions audio",
      format: "Livres audio · 2026",
      role: "Productrice · Directrice artistique",
      description:
        "Huit productions de livres audio : prospection, coordination des enregistrements, direction artistique, narration et livraison.",
      tile: {
        ratio: "16 / 9",
        images: [
          {
            src: "assets/img/audio/les-disparues-de-la-crypte.webp",
            w: 800,
            h: 800,
            alt: "Couverture du livre audio Les disparues de la crypte, de Mélodie Miller."
          },
          {
            src: "assets/img/audio/la-mariee-de-la-fosse.webp",
            w: 447,
            h: 434,
            alt: "Couverture du livre audio La Mariée de la fosse, de Mélodie Miller."
          },
          {
            src: "assets/img/audio/au-coeur-du-yukon.webp",
            w: 436,
            h: 434,
            alt: "Couverture du livre audio Au cœur du Yukon, de Sophie Camus Hoguet."
          }
        ]
      },
      intro: [
        "Développement et structuration d’une nouvelle activité de production de livres audio en 2026, de la prospection commerciale à la livraison des productions.",
        "Huit productions : six thrillers, dont une trilogie, et deux romances."
      ],
      activity: {
        title: "Du manuscrit à la livraison finale",
        steps: [
          { title: "Développement", text: "Prospection, négociation, acquisition de clients et contractualisation." },
          {
            title: "Production",
            text: "Recrutement et coordination des intervenants, calendrier d’enregistrement, suivi artistique et opérationnel."
          },
          { title: "Livraison", text: "Coordination de la postproduction, contrôle qualité et remise des fichiers finalisés." }
        ],
        stats: [
          { value: "8 contrats", label: "signés" },
          { value: "10 000 €", label: "de chiffre d’affaires généré par l’activité" }
        ],
        note: null
      },
      credit: "Postproduction : La Lucarne d’Ariane, studio de postproduction partenaire.",
      /* Chaque production = une fiche. `null` = à compléter.
         Ordre d’affichage : enquêtes d’Anna Blanchard & Julien Vautrin, romances, trilogie. */
      groups: [
        {
          id: "thrillers",
          label: "Thrillers",
          title: "Les enquêtes d’Anna Blanchard & Julien Vautrin",
          note: "Série de Mélodie Miller.",
          items: [
            {
              slug: "la-mariee-de-la-fosse",
              title: "La Mariée de la fosse",
              author: "Mélodie Miller",
              genre: "Thriller",
              series: "Les enquêtes d’Anna Blanchard & Julien Vautrin, tome 1",
              cover: {
                src: "assets/img/audio/la-mariee-de-la-fosse.webp",
                w: 447,
                h: 434,
                alt: "Couverture de La Mariée de la fosse, de Mélodie Miller : une jeune mariée flotte dans l’eau verte d’un bassin."
              },
              listen: {
                label: "Écouter sur Audible",
                url: "https://www.audible.fr/pd/La-mariee-de-la-fosse-Un-thriller-psychologique-inspire-de-faits-reels-Livre-Audio/B0GRX36BLP"
              }
            },
            {
              slug: "les-disparues-de-la-crypte",
              title: "Les disparues de la crypte",
              author: "Mélodie Miller",
              genre: "Thriller",
              series: "Les enquêtes d’Anna Blanchard & Julien Vautrin, tome 2",
              cover: {
                src: "assets/img/audio/les-disparues-de-la-crypte.webp",
                w: 800,
                h: 800,
                alt: "Couverture de Les disparues de la crypte, de Mélodie Miller : une fillette court dans une crypte sombre."
              },
              listen: { label: "Écouter sur Audible", url: "https://www.audible.fr/pd/B0HNHT8XD7" }
            },
            {
              slug: "l-enfant-du-canal",
              title: "L’enfant du canal",
              author: "Mélodie Miller",
              genre: "Thriller",
              series: "Les enquêtes d’Anna Blanchard & Julien Vautrin, tome 3",
              status: "En cours de production",
              cover: {
                src: "assets/img/audio/l-enfant-du-canal.webp",
                w: 900,
                h: 900,
                alt: "Couverture de L’enfant du canal, de Mélodie Miller : une péniche éclairée glisse sur un canal de nuit, un ours en peluche abandonné au bord de l’eau."
              },
              listen: null
            }
          ]
        },
        {
          id: "romances",
          label: "Romances",
          title: "Romances",
          items: [
            {
              slug: "au-coeur-du-yukon",
              title: "Au cœur du Yukon",
              author: "Sophie Camus Hoguet",
              genre: "Romance",
              cover: {
                src: "assets/img/audio/au-coeur-du-yukon.webp",
                w: 436,
                h: 434,
                alt: "Couverture de Au cœur du Yukon, de Sophie Camus Hoguet : une femme et son chien husky dans un paysage enneigé."
              },
              listen: { label: "Écouter sur Kobo", url: "https://www.kobo.com/fr/fr/audiobook/au-coeur-du-yukon-1" }
            },
            {
              slug: "un-chum-pour-noel",
              title: "Un chum pour Noël",
              author: "Mélodie Miller",
              genre: "Romance",
              series: "Comédie romantique de Noël au Québec",
              cover: {
                src: "assets/img/audio/un-chum-pour-noel.webp",
                w: 800,
                h: 800,
                alt: "Couverture de Un chum pour Noël, de Mélodie Miller."
              },
              listen: null
            }
          ]
        },
        {
          id: "trilogie",
          label: "Trilogie",
          title: "Quand les murs tremblent",
          note: "Trilogie de Victoire Sentenac, trois thrillers.",
          items: [
            {
              slug: "quand-les-murs-tremblent",
              title: "Quand les murs tremblent",
              author: "Victoire Sentenac",
              genre: "Thriller",
              series: "Trilogie Quand les murs tremblent, tome 1",
              cover: {
                src: "assets/img/audio/quand-les-murs-tremblent.webp",
                w: 800,
                h: 800,
                alt: "Couverture de Quand les murs tremblent, de Victoire Sentenac."
              },
              listen: null
            },
            {
              slug: "sur-les-chemins-du-doute",
              title: "Sur les chemins du doute",
              author: "Victoire Sentenac",
              genre: "Thriller",
              series: "Trilogie Quand les murs tremblent, tome 2",
              cover: {
                src: "assets/img/audio/sur-les-chemins-du-doute.webp",
                w: 800,
                h: 800,
                alt: "Couverture de Sur les chemins du doute, de Victoire Sentenac."
              },
              listen: null
            },
            {
              slug: "envers-et-contre-tout",
              title: "Envers et contre tout",
              author: "Victoire Sentenac",
              genre: "Thriller",
              series: "Trilogie Quand les murs tremblent, tome 3",
              cover: {
                src: "assets/img/audio/envers-et-contre-tout.webp",
                w: 800,
                h: 800,
                alt: "Couverture de Envers et contre tout, de Victoire Sentenac."
              },
              listen: null
            }
          ]
        }
      ],
      /* Rôle affiché sur chaque fiche de livre audio. */
      itemRole: "Narratrice · Productrice · Directrice artistique",
      credits: [],
      links: []
    }
  ],

  /* 4. ACCUEIL ET PRÉSENTATION -------------------------------------------- */
  home: {
    video: "assets/video/le-bain.mp4",
    poster: { src: "assets/img/home/hero-poster.webp", w: 900, h: 1600, alt: "Visage d'une comédienne sous l'eau, dans une lumière bleue et violette (LE BAIN)." },
    lead: "Création, production et diffusion de fictions, livres audio et spectacles."
  },
  services: [
    {
      icon: "camera",
      title: "Production audiovisuelle",
      text: "Courts-métrages, séries et films de commande : développement, financement, préparation, tournage, postproduction et diffusion.",
      project: "le-controle-sanitaire"
    },
    {
      icon: "headphones",
      title: "Production de livres audio",
      text: "Du manuscrit à la livraison : prospection d'auteurs, casting de voix, direction artistique, enregistrement et postproduction.",
      project: "productions-audio"
    },
    {
      icon: "masks",
      title: "Spectacle vivant",
      text: "Production et diffusion de spectacles de théâtre contemporain : budget, équipe, lieux, communication et tournée.",
      project: "le-bain"
    },
    {
      icon: "spark",
      title: "Fictions IA",
      text: "Création de fictions avec des outils de génération vidéo IA, intégrées à un vrai travail d'écriture et de mise en scène.",
      project: "life-on-xenia"
    }
  ],
  how: [
    { title: "Écoute", text: "Nous partons de votre intention : public, format, budget, calendrier." },
    { title: "Proposition", text: "Nous vous proposons une méthode de production, une équipe et un plan de financement adaptés." },
    { title: "Production", text: "Nous coordonnons les artistes, les techniciens et les prestataires, jusqu'à la livraison finale." },
    { title: "Diffusion", text: "Nous accompagnons la sortie : festivals, plateformes, salles, communication." }
  ],

  /* 5. BUREAU DE L'ASSOCIATION -------------------------------------------- */
  bureau: [
    {
      id: "leonore-vanier",
      name: "Léonore Vanier",
      role: "Productrice artistique, Actrice",
      bio: "Productrice artistique et ingénieure diplômée de l'ENSTA Paris et de la National University of Singapore, Léonore Vanier a débuté sa carrière comme Project Manager chez ENGIE avant de fonder la compagnie de production audiovisuelle Sensible Indocile. Elle y développe et produit des projets audiovisuels, audio et de spectacle vivant, en pilotant stratégie, financement, production, business development et équipes pluridisciplinaires.",
      photo: { src: "assets/img/bureau/leonore-vanier.webp", w: 700, h: 1019, alt: "Portrait de Léonore Vanier, souriante, cheveux longs bruns." },
      instagram: { label: "@leonorevanier", url: "https://www.instagram.com/leonorevanier" },
      site: { label: "Portfolio de Léonore Vanier", url: "leonore_vanier/" }
    },
    {
      id: "melodie-miller",
      name: "Mélodie Miller",
      role: "Autrice, Voyageuse",
      bio: "Mélodie écrit en voyageant et voyage en écrivant. Elle nous entraîne au fil de ses mots vers un panel d'émotions allant du feel good au thriller psychologique.",
      photo: { src: "assets/img/bureau/melodie-miller.webp", w: 372, h: 372, alt: "Portrait de Mélodie Miller." },
      instagram: { label: "@melodie.miller.autrice", url: "https://www.instagram.com/melodie.miller.autrice" }
    },
    {
      id: "arthur-couvreur",
      name: "Arthur Couvreur",
      role: "Musicien, Producteur",
      bio: "Ingénieur spécialisé en data, IA et process, Arthur a mêlé sa passion pour la musique à son génie pour les maths et la data science.",
      photo: { src: "assets/img/bureau/arthur-couvreur.webp", w: 393, h: 393, alt: "Portrait d'Arthur Couvreur." },
      instagram: { label: "@arthur.couvreur", url: "https://www.instagram.com/arthur.couvreur" }
    }
  ]
};
