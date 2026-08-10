/* ============================================================
   Muhammad Ahsan Iqbal — Portfolio
   Vanilla JS · no dependencies
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Hero typing effect ---------- */
  var roles = [
    'Cybersecurity',
    'AI Engineering',
    'Flutter Development'
  ];
  var typedEl = document.getElementById('typed');

  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = roles.join(' · ');
    } else {
      var ri = 0, ci = 0, deleting = false;
      (function tick() {
        var word = roles[ri];
        typedEl.textContent = word.slice(0, ci);
        if (!deleting) {
          if (ci < word.length) { ci++; setTimeout(tick, 60); }
          else { deleting = true; setTimeout(tick, 2000); }
        } else {
          if (ci > 0) { ci--; setTimeout(tick, 32); }
          else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 400); }
        }
      })();
    }
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-group');

  document.querySelectorAll('.reveal-group').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--i', i);
    });
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Skill tabs ---------- */
  var tabs = document.querySelectorAll('[data-tab]');
  var panes = document.querySelectorAll('[data-pane]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panes.forEach(function (p) { p.classList.remove('is-active'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      var pane = document.querySelector('[data-pane="' + tab.dataset.tab + '"]');
      if (pane) pane.classList.add('is-active');
    });
  });

  /* ---------- Navigation ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  var toTop = document.getElementById('to-top');

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('is-open') && !e.target.closest('.nav')) closeMenu();
    });
  }

  /* ---------- Scroll effects (rAF-throttled) ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 24);
      if (toTop) toTop.classList.toggle('is-visible', y > 600);
      spyUpdate(y);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Scroll spy ---------- */
  var spyLinks = document.querySelectorAll('.nav__link');
  var spySections = [];
  spyLinks.forEach(function (link) {
    var sec = document.querySelector(link.getAttribute('href'));
    if (sec) spySections.push({ link: link, sec: sec });
  });

  function spyUpdate(y) {
    var pos = y + 120, current = null;
    spySections.forEach(function (item) {
      if (item.sec.offsetTop <= pos) current = item;
    });
    spySections.forEach(function (item) {
      item.link.classList.toggle('is-active', item === current);
    });
  }
  onScroll();

  /* ---------- Contact form → WhatsApp ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim() || 'Someone';
      var email = document.getElementById('cf-email').value.trim() || 'no email given';
      var msg = document.getElementById('cf-msg').value.trim() || 'Hello Ahsan!';
      var text = 'Assalam-o-Alaikum Ahsan! I\'m ' + name + ' (' + email + ').\n\n' + msg + '\n\n— via your portfolio';
      window.open('https://wa.me/923101050497?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
})();
