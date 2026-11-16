(function () {
  "use strict";
  var C = window.WEDDING;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function txt(s) { return esc(s).replace(/\n/g, "<br>"); }
  // wraps "&" in a gold italic span
  function amp(s) { return esc(s).replace(/&amp;/g, '<span class="amp">&amp;</span>'); }

  var DIVIDER =
    '<svg class="divider" viewBox="0 0 300 16" aria-hidden="true">' +
    '<defs><linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset="1" stop-color="currentColor"/></linearGradient>' +
    '<linearGradient id="fadeR" x1="1" x2="0"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset="1" stop-color="currentColor"/></linearGradient></defs>' +
    '<rect x="0" y="7.5" width="110" height="1" fill="url(#fadeL)"/><rect x="190" y="7.5" width="110" height="1" fill="url(#fadeR)"/>' +
    '<circle cx="128" cy="8" r="1.8" fill="currentColor"/><circle cx="172" cy="8" r="1.8" fill="currentColor"/>' +
    '<rect x="134" y="7.4" width="7" height="1.2" fill="currentColor"/><rect x="159" y="7.4" width="7" height="1.2" fill="currentColor"/>' +
    '<path d="M150 2 L155 8 L150 14 L145 8 Z" fill="currentColor"/></svg>';

  function head(intro, title) {
    return '<header class="head reveal"><p class="label">' + esc(intro) + '</p><h2 class="title">' + esc(title) + "</h2>" + DIVIDER + "</header>";
  }

  /* ---------- meta ---------- */
  document.title = C.meta.title;
  $('meta[name="description"]').content = C.meta.description;
  $('meta[property="og:title"]').content = C.meta.title;
  $('meta[property="og:description"]').content = C.meta.description;

  /* ---------- nav ---------- */
  $$('[data-bind="monogram"]').forEach(function (el) { el.innerHTML = amp(C.monogram); });
  var links = C.nav.map(function (n) { return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>"; }).join("");
  $(".nav__links").innerHTML = links;
  $(".mobile-menu__links").innerHTML = links;

  var corner = esc(C.images.floralCorner);
  var branch = esc(C.images.floralBranch);

  /* ---------- hero ---------- */
  var H = C.hero;
  $("#home").innerHTML =
    '<div class="hero__frame" aria-hidden="true"></div>' +
    '<img class="floral floral--tl" src="' + corner + '" alt="" aria-hidden="true">' +
    '<img class="floral floral--tr" src="' + corner + '" alt="" aria-hidden="true">' +
    '<div class="petals" aria-hidden="true"></div>' +
    '<div class="hero__inner">' +
      '<p class="arabic hero__bismillah seq" style="--d:0">' + esc(H.bismillah) + "</p>" +
      '<div class="seq" style="--d:1">' + DIVIDER + "</div>" +
      '<p class="hero__intro seq" style="--d:2">' + esc(H.intro) + "</p>" +
      '<h1 class="hero__names">' +
        '<span class="hero__name seq" style="--d:3">' + esc(H.name1) + "</span>" +
        '<span class="hero__amp amp seq" style="--d:4">&amp;</span>' +
        '<span class="hero__name seq" style="--d:5">' + esc(H.name2) + "</span>" +
      "</h1>" +
      '<p class="hero__tagline seq" style="--d:6">' + txt(H.tagline) + "</p>" +
      '<p class="hero__date seq" style="--d:7">' + esc(H.date) + "</p>" +
      '<p class="hero__venue seq" style="--d:8">' + esc(H.venue) + "</p>" +
      '<p class="hero__city seq" style="--d:8">' + esc(H.city) + "</p>" +
      '<a class="btn hero__btn seq" style="--d:9" href="#invitation" id="openInvite">' + esc(H.button) + "</a>" +
    "</div>";

  /* ---------- welcome ---------- */
  var W = C.welcome;
  $("#invitation").innerHTML =
    '<div class="card-frame reveal">' +
      '<p class="label">' + esc(W.greeting) + "</p>" +
      '<h2 class="title">' + esc(W.title) + "</h2>" + DIVIDER +
      '<p class="welcome__first">' + txt(W.lines[0] || "") + "</p>" +
      W.lines.slice(1).map(function (l) { return '<p class="welcome__body">' + txt(l) + "</p>"; }).join("") +
      (C.images.welcomePhoto
        ? '<img class="welcome__photo" src="' + esc(C.images.welcomePhoto) + '" alt="' + esc(C.images.welcomePhotoAlt || "") + '" loading="lazy">'
        : '<img class="branch" src="' + branch + '" alt="" aria-hidden="true">') +
    "</div>";

  /* ---------- couple ---------- */
  var P = C.couple;
  function person(p) {
    var first = String(p.details[0] || "").split("\n");
    var firstHtml = '<p class="person__parent"><strong>' + esc(first[0]) + "</strong>" +
      (first.length > 1 ? "<br>" + txt(first.slice(1).join("\n")) : "") + "</p>";
    return '<article class="person reveal">' +
      '<div class="person__initial" aria-hidden="true">' + esc(p.initial) + "</div>" +
      '<p class="person__role">' + esc(p.role) + "</p>" +
      '<h3 class="person__name">' + esc(p.name) + "</h3>" +
      '<span class="person__rule" aria-hidden="true"></span>' +
      firstHtml +
      p.details.slice(1).map(function (d) { return '<p class="person__detail">' + txt(d) + "</p>"; }).join("") +
    "</article>";
  }
  $("#couple").innerHTML =
    '<div class="container">' + head(P.intro, P.title) +
      '<div class="couple__grid">' + person(P.bride) +
        '<div class="couple__amp amp reveal" aria-hidden="true">&amp;</div>' +
        person(P.groom) +
      "</div>" +
    "</div>";

  /* ---------- countdown ---------- */
  var D = C.countdown;
  var units = [["days", "Days"], ["hours", "Hours"], ["minutes", "Minutes"], ["seconds", "Seconds"]];
  $("#countdown").innerHTML =
    '<div class="container">' + head(D.intro, D.title) +
      (D.showTimer === false
        ? '<p class="save-date reveal">' + esc(D.dateText) + "</p>"
        : '<div class="timer reveal" role="timer" aria-live="off">' +
            units.map(function (u) {
              return '<div class="timer__cell"><span class="timer__num" data-unit="' + u[0] + '">--</span><span class="timer__label">' + u[1] + "</span></div>";
            }).join("") +
          "</div>") +
      '<p class="timer__note reveal">' + txt(D.note) + "</p>" +
    "</div>";

  /* ---------- story ---------- */
  var S = C.story;
  $("#story").innerHTML =
    '<div class="container narrow">' + head(S.intro, S.title) +
      '<p class="story__text reveal">' + txt(S.text) + "</p>" +
    "</div>";

  /* ---------- events ---------- */
  var E = C.events;
  function ev(e) {
    var dateBlock = esc(e.date) + (e.hijri ? '<br><span class="muted">' + esc(e.hijri) + "</span>" : "");
    return '<article class="event reveal">' +
      '<p class="event__tag">' + esc(e.number) + " · " + esc(e.label) + "</p>" +
      '<p class="event__arabic arabic">' + esc(e.arabic) + "</p>" +
      '<h3 class="event__title">' + esc(e.title) + "</h3>" +
      '<p class="event__venue">' + esc(e.venue) + "</p>" +
      '<span class="person__rule" aria-hidden="true"></span>' +
      '<ul class="event__list">' +
        '<li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="1"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg><span>' + dateBlock + "</span></li>" +
        '<li><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg><span>' + esc(e.time) + "</span></li>" +
        (e.place ? '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg><span>' + esc(e.place) + "</span></li>" : "") +
        (e.extra || []).map(function (x) {
          return '<li class="event__extra"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg><span>' + esc(x) + "</span></li>";
        }).join("") +
      "</ul>" +
      '<a class="btn btn--outline" href="' + esc(e.mapUrl) + '" target="_blank" rel="noopener">Directions</a>' +
    "</article>";
  }
  $("#venue").innerHTML =
    '<div class="container">' + head(E.intro, E.title) +
      '<div class="events' + (E.list.length === 4 ? ' events--four' : '') + '">' + E.list.map(ev).join("") + "</div>" +
    "</div>";

  /* ---------- footer ---------- */
  var F = C.footer;
  $("#footer").innerHTML =
    '<img class="floral floral--tl" src="' + corner + '" alt="" aria-hidden="true">' +
    '<img class="floral floral--br" src="' + corner + '" alt="" aria-hidden="true">' +
    '<div class="container narrow reveal">' +
      '<p class="arabic footer__dua">' + esc(F.dua) + "</p>" +
      '<p class="footer__translation">' + esc(F.translation) + "</p>" +
      DIVIDER +
      '<h2 class="footer__names">' + esc(F.name1) + ' <span class="amp">&amp;</span> ' + esc(F.name2) + "</h2>" +
      '<p class="footer__date">' + esc(F.date) + "</p>" +
      '<p class="footer__closing">' + txt(F.closing) + "</p>" +
    "</div>";

  /* image fallback: use drawn stand-ins if the original PNGs are missing */
  $$("img.floral, img.branch").forEach(function (img) {
    img.addEventListener("error", function () {
      var fb = img.classList.contains("branch") ? C.images.fallbackBranch : C.images.fallbackCorner;
      if (fb && img.getAttribute("src") !== fb) img.src = fb;
    }, { once: true });
  });

  /* =================== behaviour =================== */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(function () { document.body.classList.add("is-loaded"); });

  // falling petals
  if (C.petals && !reduceMotion) {
    var box = $(".petals"), html = "";
    var count = window.innerWidth < 700 ? 10 : 18;
    for (var i = 0; i < count; i++) {
      var size = 8 + Math.random() * 10;
      html += '<span style="left:' + (Math.random() * 100).toFixed(1) + "%;width:" + size.toFixed(1) + "px;height:" + (size * 1.25).toFixed(1) +
        "px;animation-duration:" + (11 + Math.random() * 10).toFixed(1) + "s," + (3 + Math.random() * 3).toFixed(1) +
        "s;animation-delay:" + (-Math.random() * 20).toFixed(1) + "s,0s;opacity:" + (0.45 + Math.random() * 0.4).toFixed(2) + '"></span>';
    }
    box.innerHTML = html;
  }

  // nav
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $("#navToggle"), menu = $("#mobileMenu");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("is-open"); }); }
    else { menu.classList.remove("is-open"); setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 350); }
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  var navAnchors = $$(".nav__links a, .mobile-menu__links a");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    C.nav.forEach(function (n) { var t = $(n.href); if (t) spy.observe(t); });
  }

  // scroll reveal
  var reveals = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  // countdown
  var target = new Date(D.target).getTime();
  var nums = {};
  $$(".timer__num").forEach(function (el) { nums[el.dataset.unit] = el; });
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  var timer;
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var v = {
      days: Math.floor(diff / 864e5),
      hours: Math.floor(diff / 36e5) % 24,
      minutes: Math.floor(diff / 6e4) % 60,
      seconds: Math.floor(diff / 1e3) % 60
    };
    Object.keys(v).forEach(function (k) {
      var s = pad(v[k]);
      if (nums[k].textContent !== s) {
        nums[k].textContent = s;
        if (!reduceMotion) { nums[k].classList.remove("tick"); void nums[k].offsetWidth; nums[k].classList.add("tick"); }
      }
    });
    if (diff === 0) clearInterval(timer);
  }
  if (D.showTimer !== false && !isNaN(target)) { timer = setInterval(tick, 1000); tick(); }

  // music: autoplay, or start on the first tap/click if the browser blocks it
  var audio = $("#bgMusic"), musicBtn = $("#musicBtn");
  var userPaused = false, resumeOnReturn = false;
  var unlockEvents = ["pointerdown", "touchend", "click", "keydown"];
  function tryPlay() {
    if (!audio.src || !audio.paused || userPaused) return;
    var p = audio.play();
    if (p && p.catch) p.catch(function () { /* blocked until the next interaction */ });
  }
  function unlock() { tryPlay(); }
  // embedded songs (data: URLs) are turned into a blob so iPhone can loop them reliably
  function srcFor(s) {
    if (String(s).indexOf("data:") !== 0) return s;
    try {
      var parts = s.split(","), mime = parts[0].slice(5).split(";")[0];
      var bin = atob(parts[1]), arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return URL.createObjectURL(new Blob([arr], { type: mime }));
    } catch (err) { return s; }
  }
  function removeUnlock() {
    unlockEvents.forEach(function (ev) { document.removeEventListener(ev, unlock, true); });
  }
  if (C.music && C.music.src) {
    audio.src = srcFor(C.music.src);
    audio.loop = C.music.loop !== false;
    audio.volume = typeof C.music.volume === "number" ? C.music.volume : 1;
    audio.preload = "auto";
    audio.addEventListener("error", function () { musicBtn.hidden = true; removeUnlock(); });
    audio.addEventListener("playing", function () {
      musicBtn.classList.add("is-playing"); musicBtn.setAttribute("aria-label", "Pause music"); removeUnlock();
    });
    audio.addEventListener("pause", function () {
      musicBtn.classList.remove("is-playing"); musicBtn.setAttribute("aria-label", "Play music");
    });
    musicBtn.hidden = false;
    musicBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (audio.paused) { userPaused = false; tryPlay(); }
      else { userPaused = true; audio.pause(); }
    });
    unlockEvents.forEach(function (ev) { document.addEventListener(ev, unlock, true); });
    if (C.music.autoplay !== false) tryPlay();
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { resumeOnReturn = !audio.paused; if (resumeOnReturn) audio.pause(); }
      else if (resumeOnReturn) { resumeOnReturn = false; tryPlay(); }
    });
  }

  // open invitation
  $("#openInvite").addEventListener("click", function (e) {
    e.preventDefault();
    if (C.music && C.music.playOnOpen) tryPlay();
    document.body.classList.add("is-opened");
    requestAnimationFrame(function () {
      $("#invitation").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
