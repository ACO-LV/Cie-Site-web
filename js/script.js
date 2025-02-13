document.addEventListener("DOMContentLoaded", function() {
    /* ----- MODALE ----- */
    var modal = document.getElementById("bioModal");
    var img = document.getElementById("openModal");
    var closeBtn = document.querySelector(".close");

    if (modal && img && closeBtn) {
        modal.style.display = "none"; // Cache la modale au chargement

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
        console.error("Erreur : Un ou plusieurs éléments de la modale sont introuvables.");
    }

    /* ----- MENU RESPONSIVE ----- */
    var menuToggle = document.getElementById("menuToggle");
    var navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function() {
            console.log("🖱 Clic détecté sur le menu !");
            navLinks.classList.toggle("active"); // Affiche/masque le menu
        });

        // Fermer le menu si on clique sur un lien
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function() {
                console.log("🔗 Clic sur un lien, fermeture du menu.");
                navLinks.classList.remove("active");
            });
        });
    } else {
        console.error("Erreur : menuToggle ou navLinks introuvables.");
    }
});
