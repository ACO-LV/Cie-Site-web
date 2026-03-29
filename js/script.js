document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js est bien chargé !");

    /* ----- MODALE BIO (legacy, seulement si #bioModal) ----- */
    setTimeout(function() {
        var bioModal = document.getElementById("bioModal");
        var openModalBtn = document.getElementById("openModal");
        var bioCloseBtn = document.querySelector(".close");

        if (bioModal && openModalBtn && bioCloseBtn) {
            console.log("✅ Modale trouvée !");

            openModalBtn.addEventListener("click", function() {
                bioModal.style.display = "flex";
            });

            bioCloseBtn.addEventListener("click", function() {
                bioModal.style.display = "none";
            });

            window.addEventListener("click", function(event) {
                if (event.target === bioModal) {
                    bioModal.style.display = "none";
                }
            });
        } else {
            console.log("ℹ️ Aucune modale détectée sur cette page.");
        }
    }, 500);

    /* ----- BOUTON HAMBURGER ----- */
    const menuToggle = document.querySelector('.responsive-header .menu-toggle');
    const responsiveNav = document.querySelector('.responsive-header .nav-links-index-responsive');

    if (menuToggle && responsiveNav) {
        menuToggle.addEventListener('click', function(){
            responsiveNav.classList.toggle('active');
            if (responsiveNav.classList.contains('active')) {
                menuToggle.innerHTML = '&times;';
            } else {
                menuToggle.innerHTML = '&#9776;';
            }
        });
    }

    /* ----- SURLIGNAGE NAV ACTIVE ----- */
    const allNavLinks = document.querySelectorAll(".nav-links-index a, .nav-links-index-responsive a");
    const currentUrl = window.location.href;

    allNavLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });

    /* ----- REVEAL SECTIONS AU SCROLL ----- */
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
    reveal();

    /* ----- CARROUSEL HERO (index.html uniquement) ----- */
    const hero = document.getElementById('hero');
    if (hero) {
        const images = [
            'images/troupe.jpg',
            'images/spectacle.jpg',
            'images/spectacle1.jpg'
        ];
        let current = 0;

        hero.style.backgroundImage = `url('${images[0]}')`;

        function changeBackground(){
            current = (current + 1) % images.length;
            hero.style.backgroundImage = `url('${images[current]}')`;
        }

        setInterval(changeBackground, 5000);
    }

    /* ----- PARALLAX (presentation.html uniquement) ----- */
    if (window.location.pathname.endsWith("presentation.html")) {
        function updateParallax() {
            const scrollPosition = window.pageYOffset;
            document.body.style.backgroundPosition = `center ${-scrollPosition * 0.1}px`;
        }
        updateParallax();
        window.addEventListener('scroll', updateParallax);
    }

    /* ----- MODALE MEMBRE (presentation.html) ----- */
    const memberModal = document.getElementById('memberModal');
    if (memberModal) {
        const memberCards = document.querySelectorAll('.member-card');
        const memberCloseBtn = memberModal.querySelector('.close');

        const modalMemberPhoto = document.getElementById('modalMemberPhoto');
        const modalMemberName = document.getElementById('modalMemberName');
        const modalMemberRole = document.getElementById('modalMemberRole');
        const modalMemberDescription = document.getElementById('modalMemberDescription');
        const modalMemberInstagramTag = document.getElementById('modalMemberInstagramTag');
        const modalMemberInstagramLink = document.querySelector('#modalMemberInstagram a');
        const modalSpectaclesList = document.getElementById('modalSpectaclesList');
        const memberWebsiteBlock = document.getElementById('memberWebsiteBlock');
        const modalMemberSite = document.getElementById('modalMemberSite');

        memberCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();

                const name = card.getAttribute('data-name');
                const role = card.getAttribute('data-role');
                const description = card.getAttribute('data-description');
                const instagram = card.getAttribute('data-instagram');
                const photo = card.getAttribute('data-photo');
                const spectaclesData = card.getAttribute('data-spectacles');
                const siteUrl = card.getAttribute('data-site');
                let spectacles = [];
                try {
                    spectacles = JSON.parse(spectaclesData);
                } catch (error) {
                    console.error('Erreur lors du parsing des spectacles', error);
                }

                modalMemberPhoto.src = photo;
                modalMemberName.textContent = name;
                modalMemberRole.innerHTML = `<strong>${role}</strong>`;
                modalMemberDescription.textContent = description;
                modalMemberInstagramTag.textContent = instagram;
                modalMemberInstagramLink.href = `https://www.instagram.com/${instagram.replace('@','')}`;
                if (memberWebsiteBlock && modalMemberSite) {
                    if (siteUrl) {
                        modalMemberSite.href = siteUrl;
                        memberWebsiteBlock.style.display = '';
                    } else {
                        modalMemberSite.removeAttribute('href');
                        memberWebsiteBlock.style.display = 'none';
                    }
                }
                modalSpectaclesList.innerHTML = '';
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

                memberModal.style.display = 'flex';
            });
        });

        memberCloseBtn.addEventListener('click', function() {
            memberModal.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target === memberModal) {
                memberModal.style.display = 'none';
            }
        });
    }

    /* ----- FOOTER DYNAMIQUE ----- */
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            var currentYear = new Date().getFullYear();
            document.getElementById('footer-placeholder').innerHTML =
                data.replace('2025', currentYear);
        })
        .catch(error => console.error('Erreur lors du chargement du footer:', error));

    /* ----- POP-UP « Le Bain » (index.html) ----- */
    const popup = document.getElementById("popup-le-bain");
    if (popup) {
        const popupCloseBtn = popup.querySelector(".popup-close");
        const overlay = popup.querySelector(".popup-overlay");

        /* #46 — ne pas afficher le popup si l'événement est terminé */
        const endDateStr = popup.getAttribute("data-end-date");
        if (endDateStr && new Date() > new Date(endDateStr + "T23:59:59")) {
            popup.remove();
        } else {
            var alreadySeen = sessionStorage.getItem("leBainPopupSeen");

            if (!alreadySeen) {
                setTimeout(() => popup.classList.remove("hidden"), 800);
            }

            function closePopup() {
                popup.classList.add("hidden");
                sessionStorage.setItem("leBainPopupSeen", "1");
            }

            popupCloseBtn.addEventListener("click", closePopup);
            overlay.addEventListener("click", closePopup);
        }
    }
});
