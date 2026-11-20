/*
 * Rendu des pages à partir de window.SITE (assets/js/data.js) et de data/agenda.json.
 * Chaque page HTML est une « coquille » portant :
 *   data-root     chemin relatif vers la racine du site ("./", "../", "../../")
 *   data-page     home | category | project | about | press | agenda | static
 *   data-section  entrée de menu active
 *   data-project  identifiant du projet (pages projet)
 *   data-category rubrique (pages category)
 * Pages « static » (Mécénat, Contact, Mentions légales) : le contenu est écrit dans le HTML ;
 * le script n'ajoute que l'en-tête, le pied de page, le thème et le menu.
 */
(function () {
  "use strict";

  var S = window.SITE;
  var UI = S.ui;
  var body = document.body;
  var ROOT = body.dataset.root || "./";
  var PAGE = body.dataset.page;
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SAVE_DATA = !!(navigator.connection && navigator.connection.saveData);

  /* ---------- Utilitaires ---------- */

  function nb(s) {
    return String(s).replace(/ ([:;?!»%])/g, " $1").replace(/« /g, "« ");
  }
  var ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  function esc(s) {
    return nb(s).replace(/[&<>"]/g, function (c) {
      return ENT[c];
    });
  }
  function byId(id) {
    return S.projects.filter(function (p) {
      return p.id === id;
    })[0];
  }
  function asset(path) {
    return /^(https?:|mailto:)/.test(path) ? path : ROOT + path;
  }
  function theme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function logoSrc(kind) {
    var c = S.company;
    var dark = kind === "mark" ? c.markDark : c.fullDark;
    return theme() === "dark" && dark ? dark.src : c[kind].src;
  }
  function projectUrl(p) {
    return p.type === "audio" ? ROOT + "audio/" : ROOT + "projets/" + p.slug + "/";
  }
  function img(i, opts) {
    opts = opts || {};
    return (
      '<img src="' + asset(i.src) + '" width="' + i.w + '" height="' + i.h + '" alt="' + esc(i.alt) + '"' +
      (opts.style ? ' style="' + opts.style + '"' : "") +
      (opts.eager ? ' fetchpriority="high"' : ' loading="lazy"') +
      ' decoding="async">'
    );
  }
  // Photo agrandissable (visionneuse)
  function zoomImg(i) {
    return '<button type="button" class="photo__btn" data-zoom aria-label="Agrandir la photo : ' + esc(i.alt) + '">' + img(i) + "</button>";
  }
  function ext(href, label) {
    return (
      '<a class="link-ext" href="' + href + '" target="_blank" rel="noopener noreferrer">' + esc(label) +
      '<span aria-hidden="true"> ↗</span><span class="sr-only"> ' + esc(UI.newTab) + "</span></a>"
    );
  }
  // Lien d'un bloc « links » : fichier à télécharger, page du site ou lien externe.
  function link(l) {
    if (l.file) return '<a class="link-file" href="' + asset(l.url) + '" download>' + esc(l.label) + '<span aria-hidden="true"> ↓</span></a>';
    if (l.internal) return '<a class="link-ext" href="' + asset(l.url) + '">' + esc(l.label) + "</a>";
    return ext(l.url, l.label);
  }
  function ratioNum(r) {
    var p = r.split("/");
    return parseFloat(p[0]) / parseFloat(p[1]);
  }

  /* ---------- Icônes (SVG en ligne) ---------- */

  function svg(inner) {
    return '<svg class="icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + inner + "</svg>";
  }
  var ICONS = {
    sun: svg('<circle class="i-sun" cx="12" cy="12" r="4"/><path class="i-sun" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path class="i-moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'),
    camera: svg('<path d="M3 7h12v10H3z"/><path d="M15 10l6-3v10l-6-3"/>'),
    headphones: svg('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M4 15h3v5H5a1 1 0 0 1-1-1zM20 15h-3v5h2a1 1 0 0 0 1-1z"/>'),
    masks: svg('<path d="M3 4h10v6a5 5 0 0 1-10 0z"/><path d="M5.5 7.2h1.2M9.5 7.2h1.2M5.6 10.4a2.6 2.6 0 0 0 4.8 0"/><path d="M13 9h8v5a4 4 0 0 1-8 0z"/><path d="M15 12h1M18 12h1M15.2 16.2a2 2 0 0 1 3.6 0"/>'),
    trophy: svg('<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M9 18h6"/>'),
    chevL: svg('<path d="M15 6l-6 6 6 6"/>'),
    chevR: svg('<path d="M9 6l6 6-6 6"/>'),
    calendar: svg('<path d="M4 6h16v14H4z"/><path d="M4 10h16M8 3v4M16 3v4"/>'),
    pdf: svg('<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 15h6M9 18h4"/>'),
    heart: svg('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/>'),
    mail: svg('<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>'),
    play: svg('<path d="M8 5l11 7-11 7z"/>')
  };

  /* ---------- Agenda : données partagées (accueil, pastille, calendrier) ---------- */

  var agendaPromise = null;
  function getAgenda() {
    if (!agendaPromise) {
      agendaPromise = fetch(ROOT + "data/agenda.json", { cache: "no-cache" })
        .then(function (r) { return r.json(); })
        .catch(function () { return { events: [] }; });
    }
    return agendaPromise;
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function key(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseDay(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    return new Date(+m[1], +m[2] - 1, +m[3]);
  }
  var MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var DAYS = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];
  function timeOf(s) {
    var m = /T(\d{2}):(\d{2})/.exec(s || "");
    return m ? m[1] + "h" + m[2] : "";
  }
  function longDate(d) {
    return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }
  function nextEvent(data) {
    var today = key(new Date());
    var up = (data.events || []).filter(function (e) { return e && e.start && e.title && (e.end || e.start).slice(0, 10) >= today; })
      .sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    return up[0] || null;
  }

  /* ---------- En-tête, pied de page ---------- */

  function navLinks(cls, section) {
    return S.nav.map(function (n) {
      var cur = n.id === section ? ' aria-current="page"' : "";
      return '<li><a href="' + ROOT + n.path + '"' + cur + ">" + esc(n.label) + "</a></li>";
    }).join("");
  }

  function renderHeader() {
    var section = body.dataset.section || "";
    var home = PAGE === "home";
    return (
      '<header class="site-header' + (home ? " site-header--home" : "") + '"><div class="container site-header__bar">' +
      '<a class="brand" href="' + ROOT + '" aria-label="' + esc(S.name) + ' — accueil">' +
      '<img class="brand__mark" data-logo="mark" src="' + asset(logoSrc("mark")) + '" width="17" height="32" alt="">' +
      '<span class="brand__text"><span class="brand__name">' + esc(S.name) + "</span></span></a>" +
      '<nav id="site-nav" class="site-nav" aria-label="' + esc(UI.mainNav) + '"><ul>' + navLinks("", section) + "</ul></nav>" +
      '<div class="site-header__tools">' +
      '<button class="theme-btn" type="button" aria-pressed="false">' + ICONS.sun + ICONS.moon + "</button>" +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">' +
      '<span class="menu-btn__label">' + esc(UI.menu) + '</span><span class="menu-btn__icon" aria-hidden="true"></span></button></div>' +
      "</div></header>"
    );
  }

  function renderFooter() {
    var f = S.company.full;
    return (
      '<footer class="site-footer"><div class="container site-footer__inner">' +
      '<a class="footer-logo" href="' + ROOT + '"><img data-logo="full" src="' + asset(logoSrc("full")) + '" width="72" height="94" alt="' + esc(f.alt) + '" loading="lazy"></a>' +
      '<div class="site-footer__text"><p>© ' + new Date().getFullYear() + " Compagnie " + esc(S.name) + " · " + esc(UI.footerRights) + "</p>" +
      "<p>" + ext(S.instagram.url, S.instagram.label) + ' · <a href="' + ROOT + 'contact/">Contact</a> · <a href="' + ROOT + 'mentions-legales/">' + esc(UI.legal) + "</a></p></div>" +
      "</div></footer>"
    );
  }

  function renderFab() {
    if (body.dataset.section === "mecenat") return "";
    return '<a class="support-fab" href="' + ROOT + 'mecenat/">' + ICONS.heart + "<span>" + esc(UI.supportShort) + "</span></a>";
  }

  function initMenu() {
    var btn = document.querySelector(".menu-btn");
    var nav = document.getElementById("site-nav");
    if (!btn || !nav) return;
    function set(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.querySelector(".menu-btn__label").textContent = open ? UI.closeMenu : UI.menu;
      nav.classList.toggle("is-open", open);
      document.documentElement.classList.toggle("menu-open", open);
    }
    btn.addEventListener("click", function () {
      set(btn.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        set(false);
        btn.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) set(false);
    });
    window.matchMedia("(min-width: 1001px)").addEventListener("change", function () {
      set(false);
    });
  }

  // Accueil : la barre n'apparaît qu'une fois le grand visuel (et son menu) dépassé.
  function initHomeBar() {
    var bar = document.querySelector(".site-header--home");
    var hero = document.querySelector(".hero");
    if (!bar || !hero) return;
    function upd() {
      bar.classList.toggle("is-visible", window.scrollY > hero.offsetHeight * 0.55);
    }
    window.addEventListener("scroll", upd, { passive: true });
    upd();
  }

  function initTheme() {
    var btn = document.querySelector(".theme-btn");
    if (!btn) return;
    function apply() {
      var dark = theme() === "dark";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? UI.themeToLight : UI.themeToDark);
      btn.setAttribute("title", dark ? UI.themeToLight : UI.themeToDark);
      document.querySelectorAll("[data-logo]").forEach(function (i) {
        i.setAttribute("src", asset(logoSrc(i.getAttribute("data-logo"))));
      });
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute("content", dark ? "#07062b" : "#f4f2fb");
    }
    btn.addEventListener("click", function () {
      var next = theme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("si-theme", next);
      } catch (e) {}
      apply();
    });
    apply();
  }

  /* ---------- Mosaïque ---------- */

  function tileMedia(p, eager) {
    var t = p.tile;
    var media = t.images.map(function (i) {
      return img(i, { eager: eager, style: t.focus ? "object-position:" + t.focus : "" });
    }).join("");
    return '<span class="tile__media tile__media--' + t.images.length + '">' + media + "</span>";
  }

  function tile(p, idx) {
    return (
      '<li class="mosaic__item mosaic__item--' + (idx + 1) + ' reveal">' +
      '<a class="tile" href="' + projectUrl(p) + '">' +
      '<span class="tile__frame" style="--ar:' + p.tile.ratio + '"' + (p.tile.loop ? ' data-loop="' + p.tile.loop + '"' : "") + ">" +
      tileMedia(p, idx < 2) +
      '<span class="tile__veil" aria-hidden="true"></span>' +
      '<span class="tile__role"><span class="tile__genre">' + esc(S.categories[p.category].tag) + "</span></span>" +
      "</span>" +
      '<span class="tile__caption"><span class="tile__title">' + esc(p.title) + "</span></span>" +
      "</a></li>"
    );
  }

  function mosaic(list) {
    return '<ul class="mosaic" id="mosaic">' + (list || S.projects).map(tile).join("") + "</ul>";
  }

  /* ---------- Vidéos en boucle (muettes) ---------- */

  function initLoops() {
    if (REDUCED || SAVE_DATA || !("IntersectionObserver" in window)) return;
    document.querySelectorAll("[data-loop]").forEach(function (box) {
      var host = box.querySelector(".tile__media") || box;
      var v = null;
      function ensure() {
        if (!v) {
          v = document.createElement("video");
          v.className = "loop-video";
          v.muted = true;
          v.loop = true;
          v.playsInline = true;
          v.preload = "auto";
          v.tabIndex = -1;
          v.setAttribute("aria-hidden", "true");
          v.src = asset(box.dataset.loop);
          host.appendChild(v);
        }
        return v;
      }
      new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              var x = ensure();
              var pr = x.play();
              if (pr && pr.then) pr.then(function () { x.classList.add("is-on"); }).catch(function () {});
            } else if (v) {
              v.pause();
              v.classList.remove("is-on");
            }
          });
        },
        { threshold: 0.4 }
      ).observe(box);
    });
  }

  /* ---------- Composants de page projet ---------- */

  function videoUrl(h) {
    return h.url || "https://www.youtube.com/watch?v=" + h.id;
  }

  function player(h) {
    var ratio = h.ratio || "16 / 9";
    var vertical = ratioNum(ratio) < 1;
    return (
      '<a class="player' + (vertical ? " player--vertical" : "") + '" style="--ar:' + ratio + '" href="' + videoUrl(h) + '" target="_blank" rel="noopener noreferrer" ' +
      'aria-label="' + esc(UI.watchVideo + h.title + " " + UI.newTab) + '"' + (h.loop ? ' data-loop="' + h.loop + '"' : "") + ">" +
      img(h.poster, { eager: true }) + "</a>"
    );
  }

  function figure(i, extra) {
    return "<li" + (extra || "") + '><figure class="photo">' + zoomImg(i) + (i.caption ? "<figcaption>" + esc(i.caption) + "</figcaption>" : "") + "</figure></li>";
  }

  function gallery(items, label) {
    if (!items || !items.length) return "";
    var wide = items.filter(function (i) { return i.w / i.h >= 1.2; });
    var tall = items.filter(function (i) { return i.w / i.h < 1.2; });
    return (
      (wide.length ? '<ul class="gallery gallery--wide" aria-label="' + esc(label) + '">' + wide.map(function (i) { return figure(i); }).join("") + "</ul>" : "") +
      (tall.length
        ? '<ul class="gallery gallery--tall" aria-label="' + esc(label) + '">' +
          tall.map(function (i) { return figure(i, ' style="flex:' + (i.w / i.h).toFixed(3) + ' 1 0"'); }).join("") + "</ul>"
        : "")
    );
  }

  function stats(list, note) {
    if (!list || !list.length) return "";
    return (
      '<ul class="stats">' +
      list.map(function (s) {
        return '<li><span class="stats__value">' + esc(s.value) + '</span><span class="stats__label">' + esc(s.label) + "</span></li>";
      }).join("") + "</ul>" + (note ? '<p class="stats__note">' + esc(note) + "</p>" : "")
    );
  }

  function credits(list) {
    if (!list || !list.length) return "";
    return '<dl class="credits">' + list.map(function (c) {
      return c.value ? "<div><dt>" + esc(c.label) + "</dt><dd>" + esc(c.value) + "</dd></div>" : "";
    }).join("") + "</dl>";
  }

  function projectNav(p) {
    var list = S.projects;
    var i = list.indexOf(p);
    var prev = list[(i + list.length - 1) % list.length];
    var next = list[(i + 1) % list.length];
    function item(q, dir, label) {
      return '<li class="pnav__' + dir + '"><a href="' + projectUrl(q) + '"><span class="pnav__dir">' + esc(label) + '</span><span class="pnav__title">' + esc(q.title) + "</span></a></li>";
    }
    return (
      '<nav class="pnav" aria-label="' + esc(UI.otherProjects) + '"><ul>' + item(prev, "prev", UI.prev) + item(next, "next", UI.next) +
      '</ul><p class="pnav__all"><a href="' + ROOT + '#projets">' + esc(UI.allProjects) + "</a></p></nav>"
    );
  }

  function pageHead(p) {
    var cat = S.categories[p.category];
    return (
      '<header class="page-head reveal"><p class="eyebrow"><a href="' + ROOT + cat.path + '">' + esc(cat.label) + "</a></p>" +
      "<h1>" + esc(p.title) + "</h1>" +
      '<p class="page-head__format">' + esc(p.format) + (p.filmBy ? " · " + esc(p.filmBy) : "") + "</p></header>"
    );
  }

  function renderProject(p) {
    if (p.type === "audio") return renderAudio(p);
    var h = p.hero;
    var heroHtml = "";
    var vertical = false;
    if (h.type === "youtube") {
      heroHtml = player(h);
      vertical = (h.ratio ? ratioNum(h.ratio) : 1.78) < 1;
    } else if (h.type === "image") {
      heroHtml = '<figure class="photo">' + zoomImg(h.image) + "</figure>";
      vertical = h.image.h > h.image.w;
    }
    var awards = "";
    if (p.awards && p.awards.length) {
      awards = '<ul class="awards" aria-label="' + esc(UI.awards) + '">' + p.awards.map(function (a) {
        return "<li>" + (a.icon ? ICONS[a.icon] : "") + "<strong>" + esc(a.label) + "</strong> " + esc(a.detail) + (a.source ? '<span class="awards__src">' + esc(a.source) + "</span>" : "") + "</li>";
      }).join("") + "</ul>";
    }
    var links = p.links || [];
    var linksHtml = links.length
      ? '<ul class="links">' + links.map(function (l) { return "<li" + (l.primary ? ' class="links__primary"' : "") + ">" + link(l) + "</li>"; }).join("") + "</ul>"
      : "";
    var gal = gallery(p.galleryFirst ? [p.galleryFirst].concat(p.gallery || []) : p.gallery, UI.gallery);
    var press = p.pressImage
      ? '<figure class="press__clip photo">' + zoomImg(p.pressImage.image) + "<figcaption>" + esc(p.pressImage.credit) + "</figcaption></figure>"
      : "";
    return (
      '<article class="container project">' + pageHead(p) +
      '<div class="project__top reveal' + (vertical ? " project__top--vertical" : "") + '">' +
      (heroHtml ? '<div class="project__hero">' + heroHtml + "</div>" : "") +
      '<div class="essentials">' +
      (p.stats && p.stats.length ? stats(p.stats, p.statsNote) : "") + awards +
      (p.status ? '<p class="essentials__status">' + esc(p.status) + "</p>" : "") +
      (p.highlight ? '<p class="essentials__highlight">' + (p.highlight.icon ? ICONS[p.highlight.icon] : "") + "<span>" + esc(p.highlight.text) + "</span></p>" : "") +
      linksHtml + "</div></div>" +
      (gal ? '<section class="block reveal" aria-labelledby="gal"><h2 id="gal" class="sr-only">' + esc(UI.gallery) + "</h2>" + gal + "</section>" : "") +
      '<section class="block details reveal" aria-labelledby="cred"><div class="details__syn"><h2>' + esc(UI.synopsis) + "</h2><p>" + esc(p.synopsis) + "</p>" + press + "</div>" +
      '<div class="details__credits"><h2 id="cred">' + esc(UI.credits) + "</h2>" + credits(p.credits) + "</div></section>" +
      projectNav(p) + "</article>"
    );
  }

  /* ---------- Livres audio ---------- */

  function audioCard(it, role) {
    var cover = it.cover ? '<div class="audio-card__cover">' + img(it.cover) + "</div>" : "";
    var rows = [];
    if (it.author) rows.push("<div><dt>" + esc(UI.textBy) + "</dt><dd>" + esc(it.author) + "</dd></div>");
    rows.push("<div><dt>" + esc(UI.genre) + "</dt><dd>" + esc(it.genre) + "</dd></div>");
    if (it.series) rows.push("<div><dt>" + esc(UI.series) + "</dt><dd>" + esc(it.series) + "</dd></div>");
    rows.push("<div><dt>" + esc(UI.role) + "</dt><dd>" + esc(role) + "</dd></div>");
    var action;
    if (it.listen) {
      action = '<p class="audio-card__listen"><a class="btn btn--play" href="' + it.listen.url + '" target="_blank" rel="noopener noreferrer">' + ICONS.play +
        "<span>" + esc(UI.listenNow) .replace("▶ ", "") + '</span><span class="sr-only"> : ' + esc(it.title) + " — " + esc(it.listen.label) + " " + esc(UI.newTab) + "</span></a></p>";
    } else {
      action =
        '<form class="notify" data-title="' + esc(it.title) + '" novalidate>' +
        '<label for="n-' + it.slug + '">' + esc(UI.notifyTitle) + "</label>" +
        '<div class="notify__row"><input type="email" id="n-' + it.slug + '" name="email" placeholder="' + esc(UI.notifyEmail) + '" autocomplete="email" required>' +
        '<button type="submit" class="btn btn--small">' + esc(UI.notifyBtn) + "</button></div>" +
        '<p class="notify__status" role="status"></p></form>';
    }
    return (
      '<article class="audio-card reveal" id="' + it.slug + '">' + cover +
      '<div class="audio-card__body"><p class="audio-card__badge' + (it.listen ? " is-out" : "") + '">' + esc(it.listen ? it.genre : it.status || UI.soon) + "</p>" +
      "<h4>" + esc(it.title) + "</h4>" +
      '<dl class="credits credits--tight">' + rows.join("") + "</dl>" + action + "</div></article>"
    );
  }

  function renderAudio(p) {
    var ac = p.activity;
    var v = p.voice;
    var groups = p.groups.map(function (g) {
      return (
        '<section class="audio-group" data-group="' + g.id + '" aria-labelledby="g-' + g.id + '"><header><p class="eyebrow">' + esc(g.label) + "</p>" +
        '<h3 id="g-' + g.id + '">' + esc(g.title) + "</h3>" + (g.note ? '<p class="audio-group__note">' + esc(g.note) + "</p>" : "") + "</header>" +
        '<div class="audio-list">' + g.items.map(function (it) { return audioCard(it, p.itemRole); }).join("") + "</div></section>"
      );
    }).join("");
    var fil =
      '<div class="filters" role="group" aria-label="' + esc(UI.filterLabel) + '"><button type="button" class="filters__btn" data-filter="all" aria-pressed="true">' + esc(UI.all) + "</button>" +
      p.groups.map(function (g) { return '<button type="button" class="filters__btn" data-filter="' + g.id + '" aria-pressed="false">' + esc(g.label) + "</button>"; }).join("") + "</div>";
    return (
      '<article class="container project project--audio">' + pageHead(p) +
      '<div class="audio-intro reveal"><p class="audio-intro__tag">' + esc(p.tagline) + "</p><div>" + p.intro.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") + "</div></div>" +
      '<section class="block" aria-labelledby="prods"><h2 id="prods" class="sr-only">' + esc(UI.eightProductions) + "</h2>" + fil + groups + "</section>" +
      '<section class="block voice reveal" aria-labelledby="voice"><h2 id="voice">' + esc(v.title) + "</h2>" +
      v.text.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      '<ul class="links">' + v.links.map(function (l) { return "<li>" + link(l) + "</li>"; }).join("") + "</ul></section>" +
      '<section class="block reveal" aria-labelledby="act"><h2 id="act">' + esc(ac.title) + "</h2>" +
      '<ol class="contrib contrib--steps">' + ac.steps.map(function (s) { return "<li><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>"; }).join("") + "</ol>" +
      stats(ac.stats, ac.note) + '<p class="audio-credit">' + esc(p.credit) + "</p></section>" + projectNav(p) + "</article>"
    );
  }

  function initAudio() {
    var bar = document.querySelector(".project--audio .filters");
    if (bar) {
      var groups = document.querySelectorAll(".audio-group");
      bar.addEventListener("click", function (e) {
        var b = e.target.closest(".filters__btn");
        if (!b) return;
        bar.querySelectorAll(".filters__btn").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        groups.forEach(function (g) { g.hidden = !(b.dataset.filter === "all" || g.dataset.group === b.dataset.filter); });
      });
    }
    var sdk = null;
    function loadSdk() {
      if (sdk) return sdk;
      sdk = new Promise(function (res, rej) {
        if (window.emailjs) return res(window.emailjs);
        var s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js";
        s.onload = function () { window.emailjs.init({ publicKey: "C9r_QSX-YrY-xG4kZ" }); res(window.emailjs); };
        s.onerror = rej;
        document.head.appendChild(s);
      });
      return sdk;
    }
    document.querySelectorAll(".notify").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var st = f.querySelector(".notify__status");
        var input = f.querySelector("input");
        if (!input.value || input.validity.typeMismatch) {
          st.textContent = "Adresse e-mail invalide.";
          input.focus();
          return;
        }
        st.textContent = "Envoi en cours…";
        loadSdk().then(function (em) {
          return em.send("service_ip0b182", "template_gk67h0b", {
            name: "Prévenez-moi de la sortie",
            email: input.value,
            message: "Merci de me prévenir de la sortie du livre audio « " + f.dataset.title + " »."
          });
        }).then(function () {
          st.textContent = UI.notifyOk;
          f.reset();
        }).catch(function () {
          st.innerHTML = esc(UI.notifyKo) + ' <a href="mailto:' + S.email + "?subject=" + encodeURIComponent("Sortie : " + f.dataset.title) + '">' + esc(S.email) + "</a>";
        });
      });
    });
  }

  /* ---------- Accueil et rubriques ---------- */

  function renderHome() {
    var h = S.home;
    var ev = nextEvent({ events: [] });
    return (
      '<section class="hero" aria-labelledby="home-title">' +
      '<div class="hero__media"' + (REDUCED || SAVE_DATA ? "" : ' data-loop="' + h.video + '"') + ">" + img(h.poster, { eager: true, style: "object-position:50% 45%" }) + "</div>" +
      '<div class="hero__veil" aria-hidden="true"></div>' +
      '<div class="hero__content"><h1 id="home-title" class="hero__title">' + esc(S.name) + "</h1>" +
      '<p class="hero__sub">' + esc(S.baseline) + "</p>" +
      '<nav class="hero__nav" aria-label="' + esc(UI.mainNav) + '"><ul>' + navLinks("", "") + "</ul></nav>" +
      '<p class="hero__cta"><a class="btn" href="' + ROOT + 'mecenat/">' + esc(UI.support) + '</a><a class="btn btn--ghost" href="' + projectUrl(byId("le-bain")) + '">' + esc(UI.discoverBain) + "</a></p>" +
      '<p class="hero__soon" id="hero-soon" hidden></p></div></section>' +
      '<section class="container home-projects" id="projets" aria-labelledby="projets-title"><h2 id="projets-title" class="section-title">' + esc(UI.ourProjects) + "</h2>" + mosaic() + "</section>"
    );
  }

  function initHomeSoon() {
    var el = document.getElementById("hero-soon");
    if (!el) return;
    getAgenda().then(function (data) {
      var ev = nextEvent(data);
      var text = null;
      if (ev) {
        var d = parseDay(ev.start);
        text = ev.title + " — " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear() + (ev.city ? ", " + ev.city : "");
      } else if (data.banner) {
        text = data.banner.title + " — " + data.banner.text.replace(/\.$/, "");
      }
      if (!text) return;
      el.innerHTML = ICONS.calendar + '<a href="' + ROOT + 'agenda/"><strong>' + esc(UI.upcoming) + " :</strong> " + esc(text) + " →</a>";
      el.hidden = false;
    });
  }

  function renderCategory(cat) {
    var c = S.categories[cat];
    var list = S.projects.filter(function (p) { return p.category === cat; });
    return (
      '<section class="container"><header class="page-head reveal"><p class="eyebrow">' + esc(S.name) + "</p><h1>" + esc(c.label) + "</h1>" +
      '<p class="page-head__format">' + esc(c.description) + "</p></header>" + mosaic(list) + "</section>"
    );
  }

  /* ---------- À propos ---------- */

  function renderAbout() {
    var f = S.founder;
    var founder =
      '<section class="founder reveal" aria-labelledby="founder"><figure class="founder__photo">' + img(f.photo, { eager: true }) + "</figure>" +
      '<div class="founder__text"><p class="eyebrow">' + esc(UI.founderTitle) + '</p><h2 id="founder">' + esc(f.name) + '</h2><p class="founder__role">' + esc(f.role) + "</p>" +
      "<p>" + esc(f.bio) + '</p><ul class="founder__links">' + f.links.map(function (l) { return '<li><a class="btn btn--small" href="' + asset(l.url) + '"' + (l.internal ? "" : ' target="_blank" rel="noopener noreferrer"') + ">" + esc(l.label) + (l.internal ? "" : '<span class="sr-only"> ' + esc(UI.newTab) + "</span>") + "</a></li>"; }).join("") + "</ul></div></section>";
    var services = S.services.map(function (s) {
      return (
        '<li class="service reveal">' + ICONS[s.icon] + "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p>" +
        '<a class="service__link" href="' + projectUrl(byId(s.project)) + '">' + esc(UI.seeProject) + '<span class="sr-only"> : ' + esc(byId(s.project).title) + "</span> →</a></li>"
      );
    }).join("");
    var how = S.how.map(function (s, i) {
      return '<li class="how__step reveal"><span class="how__num" aria-hidden="true">' + (i + 1) + "</span><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>";
    }).join("");
    var team = S.bureau.map(function (m) {
      return (
        '<li class="member reveal"><button type="button" class="member__btn" data-member="' + m.id + '" aria-haspopup="dialog">' +
        '<span class="member__photo">' + img(m.photo) + "</span>" +
        '<span class="member__name">' + esc(m.name) + '</span><span class="member__role">' + esc(m.role) + "</span>" +
        '<span class="sr-only"> ' + esc(UI.memberOpen + m.name) + "</span></button></li>"
      );
    }).join("");
    return (
      '<section class="container presentation"><header class="page-head reveal"><p class="eyebrow">' + esc(S.name) + "</p><h1>À propos</h1>" +
      '<p class="page-head__format">' + esc(UI.servicesIntro) + "</p></header>" + founder +
      '<section class="block" aria-labelledby="serv"><h2 id="serv">' + esc(UI.servicesTitle) + '</h2><ul class="services">' + services + "</ul></section>" +
      '<section class="block" aria-labelledby="how"><h2 id="how">' + esc(UI.howTitle) + '</h2><ol class="how">' + how + "</ol>" +
      '<div class="callout reveal"><h3>' + esc(UI.contactTitle) + "</h3><p>" + esc(UI.contactText) + '</p><p><a class="btn" href="' + ROOT + 'contact/">' + esc(UI.contactBtn) + "</a></p></div></section>" +
      '<section class="block" aria-labelledby="team"><h2 id="team">' + esc(UI.bureauTitle) + '</h2><ul class="team">' + team + "</ul></section></section>" +
      '<dialog class="member-modal" id="member-modal" aria-labelledby="mm-name"><div class="member-modal__body"></div></dialog>'
    );
  }

  function initMembers() {
    var dlg = document.getElementById("member-modal");
    if (!dlg) return;
    var opener = null;
    function fill(m) {
      var links = [];
      if (m.site) links.push("<li>" + ext(m.site.url, m.site.label) + "</li>");
      if (m.instagram) links.push("<li>" + ext(m.instagram.url, m.instagram.label) + "</li>");
      dlg.querySelector(".member-modal__body").innerHTML =
        '<button type="button" class="member-modal__close" aria-label="' + esc(UI.memberClose) + '">×</button>' +
        '<div class="member-modal__photo">' + img(m.photo) + '</div><div><h2 id="mm-name">' + esc(m.name) + '</h2><p class="member-modal__role">' + esc(m.role) + "</p><p>" + esc(m.bio) + "</p>" +
        '<ul class="links">' + links.join("") + "</ul></div>";
    }
    document.querySelector(".team").addEventListener("click", function (e) {
      var b = e.target.closest(".member__btn");
      if (!b) return;
      opener = b;
      fill(S.bureau.filter(function (m) { return m.id === b.dataset.member; })[0]);
      if (dlg.showModal) dlg.showModal();
      else dlg.setAttribute("open", "");
    });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.closest(".member-modal__close")) dlg.close ? dlg.close() : dlg.removeAttribute("open");
    });
    dlg.addEventListener("close", function () {
      if (opener) opener.focus();
    });
  }

  /* ---------- Presse ---------- */

  function renderPress() {
    var pr = S.press;
    var arts = pr.articles.map(function (a) {
      return (
        '<li class="press-card reveal">' + (a.image ? '<div class="press-card__img photo">' + zoomImg(a.image) + "</div>" : "") +
        '<div class="press-card__body"><p class="press-card__outlet">' + esc(a.outlet) + "</p><h3>" + esc(a.title) + "</h3>" +
        '<p class="press-card__meta">' + esc((a.author ? a.author + " · " : "") + a.date) + "</p>" +
        '<p><a class="btn btn--small" href="' + a.url + '" target="_blank" rel="noopener noreferrer">' + esc(UI.readArticle) + '<span class="sr-only"> : ' + esc(a.title) + " " + esc(UI.newTab) + "</span></a></p></div></li>"
      );
    }).join("");
    var dls = pr.downloads.map(function (d) {
      return (
        '<li class="dl-card reveal">' + ICONS.pdf + "<div><h3>" + esc(d.title) + '</h3><p class="dl-card__meta">' + esc(d.detail) + "</p></div>" +
        '<a class="btn btn--small" href="' + asset(d.url) + '" download>' + esc(UI.download) + '<span class="sr-only"> : ' + esc(d.title) + "</span></a></li>"
      );
    }).join("");
    return (
      '<section class="container presse"><header class="page-head reveal"><p class="eyebrow">' + esc(S.name) + "</p><h1>" + esc(UI.pressTitle) + "</h1>" +
      '<p class="page-head__format">' + esc(UI.pressIntro) + "</p></header>" +
      '<section class="block" aria-labelledby="art"><h2 id="art">' + esc(UI.articles) + '</h2><ul class="press-list">' + arts + "</ul></section>" +
      '<section class="block" aria-labelledby="dl"><h2 id="dl">' + esc(UI.downloads) + '</h2><ul class="dl-list">' + dls + "</ul>" +
      '<p><a href="' + projectUrl(byId("le-bain")) + '">Découvrir LE BAIN →</a></p></section></section>'
    );
  }

  /* ---------- Agenda dynamique (data/agenda.json) ---------- */

  function icsFile(ev) {
    var d0 = ev.start.replace(/[-:]/g, "").slice(0, 15);
    var hasTime = /T/.test(ev.start);
    var endS = ev.end || ev.start;
    var d1 = endS.replace(/[-:]/g, "").slice(0, 15);
    function t(s) { return s.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n"); }
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sensible Indocile//Agenda//FR", "BEGIN:VEVENT",
      "UID:" + ev.id + "@lacompagniesensibleindocile.fr",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z",
      hasTime ? "DTSTART:" + d0 : "DTSTART;VALUE=DATE:" + d0.slice(0, 8),
      hasTime ? "DTEND:" + d1 : "DTEND;VALUE=DATE:" + key(new Date(parseDay(endS).getTime() + 864e5)).replace(/-/g, ""),
      "SUMMARY:" + t(ev.title),
      "LOCATION:" + t([ev.place, ev.city].filter(Boolean).join(", ")),
      "DESCRIPTION:" + t((ev.description || "") + (ev.url ? " " + ev.url : "")),
      "END:VEVENT", "END:VCALENDAR"
    ];
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
  }

  function renderAgenda() {
    return (
      '<section class="container agenda"><header class="page-head reveal"><p class="eyebrow">' + esc(S.name) + "</p><h1>Agenda</h1></header>" +
      '<div id="agenda-banner"></div>' +
      '<div class="agenda__layout"><section class="cal" aria-labelledby="cal-title">' +
      '<div class="cal__bar"><button type="button" class="cal__nav" data-nav="-1" aria-label="Mois précédent">' + ICONS.chevL + "</button>" +
      '<h2 id="cal-title" class="cal__title" aria-live="polite"></h2>' +
      '<button type="button" class="cal__nav" data-nav="1" aria-label="Mois suivant">' + ICONS.chevR + "</button>" +
      '<button type="button" class="cal__today">Aujourd’hui</button></div>' +
      '<div class="cal__grid" role="grid" aria-labelledby="cal-title"></div></section>' +
      '<aside class="agenda__side"><section aria-labelledby="day-title"><h2 id="day-title" class="agenda__h">Détail du jour</h2><div id="agenda-day" aria-live="polite"></div></section>' +
      '<section aria-labelledby="up-title"><h2 id="up-title" class="agenda__h">Prochaines dates</h2><div id="agenda-up"></div></section></aside></div></section>'
    );
  }

  function initAgenda() {
    var grid = document.querySelector(".cal__grid");
    if (!grid) return;
    getAgenda().then(function (data) { setup(data || {}); });

    function setup(data) {
      var events = (data.events || []).filter(function (e) { return e && e.start && e.title; }).sort(function (a, b) { return a.start < b.start ? -1 : 1; });
      var today = new Date();
      var cur = new Date(today.getFullYear(), today.getMonth(), 1);
      var selected = key(today);
      var title = document.getElementById("cal-title");
      var dayBox = document.getElementById("agenda-day");
      var upBox = document.getElementById("agenda-up");

      if (data.banner) {
        var b = data.banner;
        var bp = b.project && byId(b.project);
        document.getElementById("agenda-banner").innerHTML =
          '<aside class="soon reveal is-in">' + ICONS.calendar + '<div><p class="soon__label">' + esc(UI.upcoming) + '</p><p class="soon__title">' + esc(b.title) + "</p>" +
          "<p>" + esc(b.text) + "</p>" + (bp ? '<p><a href="' + projectUrl(bp) + '">' + esc(UI.seeProject) + " →</a></p>" : "") + "</div></aside>";
      }

      function onDay(k) {
        return events.filter(function (e) {
          var s = e.start.slice(0, 10), en = (e.end || e.start).slice(0, 10);
          return s <= k && k <= en;
        });
      }
      function evHtml(e, withDate) {
        var d = parseDay(e.start);
        var t = timeOf(e.start);
        return (
          '<article class="ev"><h3>' + esc(e.title) + "</h3>" +
          '<p class="ev__meta">' + (withDate ? esc(longDate(d)) + (t ? " · " + t : "") : t ? esc(t) : "") + "</p>" +
          (e.place || e.city ? '<p class="ev__meta">' + esc([e.place, e.city].filter(Boolean).join(" — ")) + "</p>" : "") +
          (e.description ? "<p>" + esc(e.description) + "</p>" : "") +
          '<p class="ev__links">' + (e.url ? ext(e.url, "Réserver / en savoir plus") + " · " : "") +
          '<a href="' + icsFile(e) + '" download="' + e.id + '.ics">Ajouter à mon agenda (.ics)</a></p></article>'
        );
      }

      function draw() {
        var y = cur.getFullYear(), m = cur.getMonth();
        title.textContent = MONTHS[m].charAt(0).toUpperCase() + MONTHS[m].slice(1) + " " + y;
        var first = (new Date(y, m, 1).getDay() + 6) % 7;
        var n = new Date(y, m + 1, 0).getDate();
        var h = '<div class="cal__row cal__row--head" role="row">' + DAYS.map(function (d) { return '<span role="columnheader">' + d + "</span>"; }).join("") + "</div>";
        var cells = [];
        for (var i = 0; i < first; i++) cells.push('<span class="cal__cell cal__cell--empty" role="gridcell"></span>');
        for (var d = 1; d <= n; d++) {
          var k = y + "-" + pad(m + 1) + "-" + pad(d);
          var evs = onDay(k);
          cells.push(
            '<button type="button" role="gridcell" class="cal__cell' + (k === key(today) ? " is-today" : "") + (k === selected ? " is-selected" : "") + (evs.length ? " has-event" : "") +
            '" data-day="' + k + '" aria-label="' + d + " " + MONTHS[m] + (evs.length ? ", " + evs.length + " événement" + (evs.length > 1 ? "s" : "") : "") + '"' +
            (k === selected ? ' aria-current="date"' : "") + ">" + d + (evs.length ? '<span class="cal__dot" aria-hidden="true"></span>' : "") + "</button>"
          );
        }
        while (cells.length % 7) cells.push('<span class="cal__cell cal__cell--empty" role="gridcell"></span>');
        var rows = "";
        for (var r = 0; r < cells.length; r += 7) rows += '<div class="cal__row" role="row">' + cells.slice(r, r + 7).join("") + "</div>";
        grid.innerHTML = h + rows;
        drawDay();
      }
      function drawDay() {
        var evs = onDay(selected);
        dayBox.innerHTML =
          '<p class="agenda__date">' + esc(longDate(parseDay(selected))) + "</p>" +
          (evs.length ? evs.map(function (e) { return evHtml(e, false); }).join("") : '<p class="agenda__empty">Aucun événement ce jour-là.</p>');
      }
      function drawUp() {
        var todayK = key(today);
        var up = events.filter(function (e) { return (e.end || e.start).slice(0, 10) >= todayK; });
        upBox.innerHTML = up.length
          ? up.map(function (e) { return evHtml(e, true); }).join("")
          : '<p class="agenda__empty">Aucune date annoncée pour le moment' + (data.banner ? " : voir l’annonce ci-dessus" : "") + ".</p>";
      }
      document.querySelector(".cal").addEventListener("click", function (e) {
        var nav = e.target.closest(".cal__nav");
        var day = e.target.closest("[data-day]");
        if (nav) {
          cur = new Date(cur.getFullYear(), cur.getMonth() + (+nav.dataset.nav), 1);
          draw();
        } else if (e.target.closest(".cal__today")) {
          cur = new Date(today.getFullYear(), today.getMonth(), 1);
          selected = key(today);
          draw();
        } else if (day) {
          selected = day.dataset.day;
          draw();
          var again = grid.querySelector('[data-day="' + selected + '"]');
          if (again) again.focus();
        }
      });
      grid.addEventListener("keydown", function (e) {
        var step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
        if (!step) return;
        e.preventDefault();
        var d = parseDay(selected);
        d.setDate(d.getDate() + step);
        selected = key(d);
        cur = new Date(d.getFullYear(), d.getMonth(), 1);
        draw();
        var f = grid.querySelector('[data-day="' + selected + '"]');
        if (f) f.focus();
      });
      draw();
      drawUp();
    }
  }

  /* ---------- Contact : copier l'adresse ---------- */

  function initCopy() {
    var b = document.querySelector("[data-copy]");
    if (!b) return;
    var st = document.getElementById("copy-status");
    b.addEventListener("click", function () {
      function ok() { if (st) st.textContent = UI.copied; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(S.email).then(ok, function () {});
      else {
        var r = document.createRange();
        var a = document.querySelector(".contact__mail a");
        r.selectNodeContents(a);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        if (st) st.textContent = "Adresse sélectionnée : copiez-la (Ctrl+C).";
      }
    });
  }

  /* ---------- Visionneuse de photos ---------- */

  function initLightbox() {
    var btns = Array.prototype.slice.call(document.querySelectorAll("button[data-zoom]"));
    if (!btns.length) return;
    var dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Visionneuse de photos");
    dlg.innerHTML =
      '<button type="button" class="lightbox__close" aria-label="' + esc(UI.lightboxClose) + '">×</button>' +
      '<button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="' + esc(UI.lightboxPrev) + '">' + ICONS.chevL + "</button>" +
      '<figure class="lightbox__fig"><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="lightbox__nav lightbox__nav--next" aria-label="' + esc(UI.lightboxNext) + '">' + ICONS.chevR + "</button>";
    document.body.appendChild(dlg);
    var im = dlg.querySelector("img");
    var cap = dlg.querySelector("figcaption");
    var cur = 0;
    var opener = null;
    function show(i) {
      cur = (i + btns.length) % btns.length;
      var src = btns[cur].querySelector("img");
      im.src = src.currentSrc || src.src;
      im.alt = src.alt;
      cap.textContent = src.alt + (btns.length > 1 ? "  (" + (cur + 1) + "/" + btns.length + ")" : "");
      var many = btns.length > 1;
      dlg.querySelector(".lightbox__nav--prev").hidden = !many;
      dlg.querySelector(".lightbox__nav--next").hidden = !many;
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () {
        opener = b;
        show(i);
        if (dlg.showModal) dlg.showModal();
        else dlg.setAttribute("open", "");
      });
    });
    dlg.addEventListener("click", function (e) {
      if (e.target.closest(".lightbox__close") || e.target === dlg) dlg.close();
      else if (e.target.closest(".lightbox__nav--prev")) show(cur - 1);
      else if (e.target.closest(".lightbox__nav--next")) show(cur + 1);
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(cur - 1);
      else if (e.key === "ArrowRight") show(cur + 1);
    });
    dlg.addEventListener("close", function () {
      if (opener) opener.focus();
    });
    var x0 = null;
    dlg.addEventListener("touchstart", function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* ---------- Apparition progressive et filtre d'accueil ---------- */

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (REDUCED || !("IntersectionObserver" in window) || !els.length) return;
    document.documentElement.classList.add("has-reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Montage ---------- */

  function render() {
    var html = null;
    if (PAGE === "home") html = renderHome();
    else if (PAGE === "category") html = renderCategory(body.dataset.category);
    else if (PAGE === "project") html = renderProject(byId(body.dataset.project));
    else if (PAGE === "about") html = renderAbout();
    else if (PAGE === "press") html = renderPress();
    else if (PAGE === "agenda") html = renderAgenda();

    document.getElementById("site-header").innerHTML = renderHeader();
    if (html !== null) document.getElementById("main").innerHTML = html;
    document.getElementById("site-footer").innerHTML = renderFooter();
    document.body.insertAdjacentHTML("beforeend", renderFab());
    document.documentElement.classList.add("is-ready");
    initTheme();
    initMenu();
    initHomeBar();
    initHomeSoon();
    initAudio();
    initMembers();
    initAgenda();
    initCopy();
    initLightbox();
    initLoops();
    initReveal();
  }

  render();
})();
