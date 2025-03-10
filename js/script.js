document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js est bien chargé !");

    // Vérifier si `menuToggle` et `navLinks` existent après injection du header
    setTimeout(function() {
        console.log("⏳ Vérification après délai...");

        /* ----- MENU RESPONSIVE (Chargé sur toutes les pages) ----- */
        var menuToggle = document.getElementById("menuToggle");
        var navLinks = document.getElementById("navLinks");

        if (menuToggle && navLinks) {
            console.log("✅ Menu Toggle et Nav Links trouvés !");
            
            menuToggle.addEventListener("click", function(e) {
                e.stopPropagation(); // Empêche la propagation du clic
                console.log("🖱 Clic détecté sur le menu !");
                navLinks.classList.toggle("active"); // Affiche/masque le menu
            });

            document.addEventListener("click", function(e) {
            // Ferme le menu uniquement si le clic n'est pas sur le menu ou sur le bouton hamburger
            if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && e.target !== menuToggle) {
                console.log("🔒 Clic en dehors du menu, fermeture du menu.");
                navLinks.classList.remove("active");
            }

            
            // Fermer le menu si on clique sur un lien
            navLinks.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", function() {
                    console.log("🔗 Clic sur un lien, fermeture du menu.");
                    navLinks.classList.remove("active");
                });
            });

            // Gestion du clic sur le logo pour naviguer vers la page d'accueil sans fermer prématurément le menu
            var logoLink = document.querySelector('.logo-link');
            if (logoLink) {
                logoLink.addEventListener("click", function(e) {
                    e.stopPropagation(); // Empêche la propagation vers l'écouteur global
                    console.log("Logo cliqué : navigation vers la page d'accueil.");
                    // La navigation se fera normalement grâce à l'attribut href
                });
            }

        });
        } else {
            console.error("❌ Erreur : menuToggle ou navLinks introuvables.");
        }

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

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.highlight-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            // Calculer la position de départ en prenant en compte la position du slider
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            // Calculer la distance parcourue
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Multiplicateur pour ajuster la vitesse
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});

