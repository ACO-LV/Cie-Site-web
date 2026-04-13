document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js est bien chargé !");

    /* ----- BOUTON HAMBURGER ----- */
    const menuToggle = document.querySelector('.responsive-header .menu-toggle');
    const responsiveNav = document.querySelector('.responsive-header .nav-links-index-responsive');

    if (menuToggle && responsiveNav) {
        menuToggle.addEventListener('click', function(){
            responsiveNav.classList.toggle('active');
            const isOpen = responsiveNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
            menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
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

    /* ----- MODALE MEMBRE (presentation.html) — #63 focus trap + Escape + scroll lock ----- */
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

        let previouslyFocused = null;

        function openMemberModal() {
            previouslyFocused = document.activeElement;
            memberModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            memberCloseBtn.focus();
            document.addEventListener('keydown', memberModalKeyHandler);
        }

        function closeMemberModal() {
            memberModal.style.display = 'none';
            document.body.style.overflow = '';
            document.removeEventListener('keydown', memberModalKeyHandler);
            if (previouslyFocused) previouslyFocused.focus();
        }

        function memberModalKeyHandler(e) {
            if (e.key === 'Escape') {
                closeMemberModal();
                return;
            }
            if (e.key === 'Tab') {
                const focusable = memberModal.querySelectorAll(
                    'button, a[href], [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        }

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
                modalMemberInstagramLink.target = '_blank';
                modalMemberInstagramLink.rel = 'noopener';
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

                openMemberModal();
            });
        });

        memberCloseBtn.addEventListener('click', closeMemberModal);

        window.addEventListener('click', function(e) {
            if (e.target === memberModal) {
                closeMemberModal();
            }
        });
    }

    /* ----- FOOTER DYNAMIQUE ----- */
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            var yearEl = document.querySelector('.copyright-year');
            if (yearEl) yearEl.textContent = new Date().getFullYear();
        })
        .catch(error => console.error('Erreur lors du chargement du footer:', error));

    /* ----- POP-UP « Le Bain » (index.html) — #78 focus trap + Escape + scroll lock ----- */
    const popup = document.getElementById("popup-le-bain");
    if (popup) {
        const popupCloseBtn = popup.querySelector(".popup-close");
        const overlay = popup.querySelector(".popup-overlay");
        let popupPreviouslyFocused = null;

        /* #46 — ne pas afficher le popup si l'événement est terminé */
        const endDateStr = popup.getAttribute("data-end-date");
        if (endDateStr && new Date() > new Date(endDateStr + "T23:59:59")) {
            popup.remove();
        } else {
            var alreadySeen = sessionStorage.getItem("leBainPopupSeen");

            if (!alreadySeen) {
                setTimeout(function() { openPopup(); }, 800);
            }

            function openPopup() {
                popupPreviouslyFocused = document.activeElement;
                popup.classList.remove("hidden");
                document.body.style.overflow = 'hidden';
                popupCloseBtn.focus();
                document.addEventListener('keydown', popupKeyHandler);
            }

            function closePopup() {
                popup.classList.add("hidden");
                document.body.style.overflow = '';
                document.removeEventListener('keydown', popupKeyHandler);
                sessionStorage.setItem("leBainPopupSeen", "1");
                if (popupPreviouslyFocused) popupPreviouslyFocused.focus();
            }

            function popupKeyHandler(e) {
                if (e.key === 'Escape') {
                    closePopup();
                    return;
                }
                if (e.key === 'Tab') {
                    var focusable = popup.querySelectorAll(
                        'button, a[href], [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusable.length === 0) return;
                    var first = focusable[0];
                    var last = focusable[focusable.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                }
            }

            popupCloseBtn.addEventListener("click", closePopup);
            overlay.addEventListener("click", closePopup);
        }
    }
});
