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
            console.error("❌ Erreur : menuToggle ou navLinks introuvables.");
        }

        /* ----- MODALE (Chargée seulement si présente sur la page) ----- */
        var modal = document.getElementById("bioModal");
        var img = document.getElementById("openModal");
        var closeBtn = document.querySelector(".close");

        if (modal && img && closeBtn) {
            console.log("✅ Modale trouvée !");
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
            console.log("ℹ️ Aucune modale détectée sur cette page.");
        }

    }, 500); // ✅ On attend 500ms après le chargement du script pour s'assurer que le header est bien injecté
});
