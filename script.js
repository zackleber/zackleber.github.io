/* ============================================================
   THE COVE HAIR STUDIO — script.js
   Pure vanilla JS, no dependencies
   ============================================================ */

(function () {
  'use strict';

  var navbar      = document.getElementById('navbar');
  var hamburger   = document.getElementById('hamburger');
  var mobileMenu  = document.getElementById('mobile-menu');
  var navLinks    = document.querySelectorAll('.nav-link');
  var mobileLinks = document.querySelectorAll('.mobile-nav-link');
  var sections    = document.querySelectorAll('section[id]');
  var fadeEls     = document.querySelectorAll('.fade-in');

  /* ---- Hamburger / Mobile Menu ---- */
  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (
      mobileMenu &&
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) { closeMenu(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* ---- Navbar Scroll Behaviour ---- */
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
      navbar.style.background = 'rgba(20, 74, 88, 0.99)';
    } else {
      navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.12)';
      navbar.style.background = 'rgba(27, 94, 111, 0.97)';
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---- Active Nav Link on Scroll ---- */
  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    var current = '';

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---- Intersection Observer — Fade-in ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Smooth Scroll — Nav Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY
                - (navbar ? navbar.offsetHeight : 68);
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
