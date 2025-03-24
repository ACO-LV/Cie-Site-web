document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js est bien chargé !");

    // Vérifier si `menuToggle` et `navLinks` existent après injection du header
    setTimeout(function() {
        console.log("⏳ Vérification après délai...");

        /* ----- MODALE (Chargée seulement si présente sur la page) ----- */
        var modal = document.getElementById("bioModal");
        var img = document.getElementById("openModal");
        var closeBtn = document.querySelector(".close");
       
        if (modal && img && closeBtn) {
            console.log("✅ Modale trouvée !");

            img.addEventListener("click", function() {
                modal.style.display = "flex";
            });

            closeBtn.addEventListener("click", function() {
                modal.style.display = "none";
            });

            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        } else {
            console.log("ℹ️ Aucune modale détectée sur cette page.");
        }

    }, 500); // ✅ On attend 500ms après le chargement du script pour s'assurer que le header est bien injecté
});

/* Bouton hamburger */
document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function(){
      navLinks.classList.toggle('active');
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
    let sections = document.querySelectorAll("section");

    function reveal() {
        sections.forEach(section => {
            let sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 50) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Vérifier les sections visibles dès le chargement
});

document.addEventListener("DOMContentLoaded", function(){
    const hero = document.getElementById('hero');
    const images = [
        'images/troupe.jpg',
        'images/spectacle.jpg',
        'images/spectacle1.jpg'
        // Ajoutez ici autant d'images que souhaité
    ];
    let current = 0;
    
    // Définir la première image
    hero.style.backgroundImage = `url('${images[0]}')`;
    
    function changeBackground(){
        current = (current + 1) % images.length;
        hero.style.backgroundImage = `url('${images[current]}')`;
    }
    
    setInterval(changeBackground, 5000); // Changement toutes les 5 secondes
});


document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith("presentation.html")) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      document.body.style.backgroundPosition = `center ${-scrollPosition * 0.3}px`;
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  function updateParallax() {
    const scrollPosition = window.pageYOffset;
    document.body.style.backgroundPosition = `center ${-scrollPosition * 0.1}px`;
  }
  
  // Appliquer la position correcte dès le chargement
  
  updateParallax();
  if (window.location.pathname.endsWith("presentation.html")) {
      window.addEventListener('scroll', updateParallax);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Sélectionne toutes les member cards
  const memberCards = document.querySelectorAll('.member-card');
  const modal = document.getElementById('memberModal');
  const closeBtn = modal.querySelector('.close');

  // Champs à remplir dans la modale
  const modalMemberPhoto = document.getElementById('modalMemberPhoto');
  const modalMemberName = document.getElementById('modalMemberName');
  const modalMemberRole = document.getElementById('modalMemberRole');
  const modalMemberDescription = document.getElementById('modalMemberDescription');
  const modalMemberInstagramTag = document.getElementById('modalMemberInstagramTag');
  const modalMemberInstagramLink = document.querySelector('#modalMemberInstagram a');
  const modalSpectaclesList = document.getElementById('modalSpectaclesList');

  // Fonction pour ouvrir la modale et remplir les infos
  memberCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Récupérer les données depuis les attributs data-*
      const name = card.getAttribute('data-name');
      const role = card.getAttribute('data-role');
      const description = card.getAttribute('data-description');
      const instagram = card.getAttribute('data-instagram');
      const photo = card.getAttribute('data-photo');
      const spectaclesData = card.getAttribute('data-spectacles');
      let spectacles = [];
      try {
        spectacles = JSON.parse(spectaclesData);
      } catch (error) {
        console.error('Erreur lors du parsing des spectacles', error);
      }
      
      // Remplir les champs de la modale
      modalMemberPhoto.src = photo;
      modalMemberName.textContent = name;
      modalMemberRole.innerHTML = `<strong>${role}</strong>`;
      modalMemberDescription.textContent = description;
      modalMemberInstagramTag.textContent = instagram;
      modalMemberInstagramLink.href = `https://www.instagram.com/${instagram.replace('@','')}`;
      
      // Remplir la liste des spectacles
      modalSpectaclesList.innerHTML = ''; // Vider la liste
      if (spectacles.length > 0) {
        spectacles.forEach(spec => {
          const a = document.createElement('a');
          a.href = spec.link;
          const img = document.createElement('img');
          img.src = spec.img;
          img.alt = `Spectacle de ${name}`;
          a.appendChild(img);
          modalSpectaclesList.appendChild(a);
        });
      }
      
      // Afficher la modale
      modal.style.display = 'flex';
    });
  });

  // Fermer la modale lorsqu'on clique sur le bouton de fermeture
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Fermer la modale en cliquant en dehors du contenu
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Footer dynamique
document.addEventListener("DOMContentLoaded", function() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erreur lors du chargement du footer:', error));
});
