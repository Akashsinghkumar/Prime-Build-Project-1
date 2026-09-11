/**
 * Prime Build Projects - Entrance & Scroll Reveal Animations
 * Handles header entrance, showcase split sections, and card reveals.
 */
(function () {
  'use strict';

  // 1. Respect Reduced Motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 2. Ensure browser supports IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    return;
  }

  function initScrollReveal() {
    // Flag html as ready for reveal animations
    document.documentElement.classList.add('pbp-scroll-ready');

    // Helper to check if an element is inside navbar or floating buttons
    function isExcluded(el) {
      return el.closest('.prime-header') ||
             el.closest('.nav-container') ||
             el.closest('.floating-action-btn') ||
             el.closest('.floating-call') ||
             el.closest('.floating-whatsapp');
    }

    var targets = [];

    // Helper to check if an element is inside a card
    function isInsideCard(el) {
      return el.closest('.home-feature-card') ||
             el.closest('.service-card-lux') ||
             el.closest('.about-showcase-box') ||
             el.closest('.value-card') ||
             el.closest('.project-card-clean') ||
             el.closest('.capability-card') ||
             el.closest('.gallery-item-card') ||
             el.closest('.expertise-card') ||
             el.closest('.govt-solution-card') ||
             el.closest('.quickbar-item') ||
             el.closest('.contact-info-card') ||
             el.closest('.contact-location-card') ||
             el.closest('.pan-india-card') ||
             el.closest('.legacy-stat-card') ||
             el.closest('.approach-step-card') ||
             el.closest('.insight-card') ||
             el.closest('.proj-card-lux') ||
             el.closest('.stat-card-luxury') ||
             el.closest('.why-feature-block') ||
             el.closest('.gallery-preview-item') ||
             el.closest('.commitment-value-card') ||
             el.closest('.faq-item');
    }

    // ------------------------------------------------------------------------
    // 1. IMAGE + TEXT SPLIT SECTIONS (Home Page Directional Reveal)
    // ------------------------------------------------------------------------

    // A. Home Story Section (Image Left, Text Right)
    var storySec = document.querySelector('.home-story-section');
    if (storySec) {
      var storyImg = storySec.querySelector('.story-img-frame');
      if (storyImg) {
        storyImg.classList.add('pbp-split-img-left');
        targets.push(storyImg);
      }
      var storyTag = storySec.querySelector('.section-tag');
      if (storyTag) { storyTag.classList.add('pbp-split-tag-right'); targets.push(storyTag); }
      var storyTitle = storySec.querySelector('h2');
      if (storyTitle) { storyTitle.classList.add('pbp-split-title-right'); targets.push(storyTitle); }
      var storyDescs = storySec.querySelectorAll('.story-lead-p, .story-body-p, .story-feature-list');
      storyDescs.forEach(function (d) { d.classList.add('pbp-split-desc-right'); targets.push(d); });
      var storyBtn = storySec.querySelector('.btn-gold');
      if (storyBtn) { storyBtn.classList.add('pbp-split-btn-right'); targets.push(storyBtn); }
    }

    // B. Home Why Choose Us Section (Image Left, Text Right)
    var whySec = document.querySelector('.home-why-section');
    if (whySec) {
      var whyImg = whySec.querySelector('.story-img-frame');
      if (whyImg) {
        whyImg.classList.add('pbp-split-img-left');
        targets.push(whyImg);
      }
      var whyTag = whySec.querySelector('.section-tag');
      if (whyTag) { whyTag.classList.add('pbp-split-tag-right'); targets.push(whyTag); }
      var whyTitle = whySec.querySelector('h2');
      if (whyTitle) { whyTitle.classList.add('pbp-split-title-right'); targets.push(whyTitle); }
      var whyDesc = whySec.querySelector('p:not(.story-badge-text):not(.why-feature-desc)');
      if (whyDesc) { whyDesc.classList.add('pbp-split-desc-right'); targets.push(whyDesc); }
    }

    // C. Home Spotlight Dark - Luxury Homes (Text Left, Image Right)
    var spotDark = document.querySelector('.home-spotlight-dark');
    if (spotDark) {
      var sdTag = spotDark.querySelector('.section-tag');
      if (sdTag) { sdTag.classList.add('pbp-split-tag-left'); targets.push(sdTag); }
      var sdTitle = spotDark.querySelector('h2');
      if (sdTitle) { sdTitle.classList.add('pbp-split-title-left'); targets.push(sdTitle); }
      var sdDesc = spotDark.querySelector('p');
      if (sdDesc) { sdDesc.classList.add('pbp-split-desc-left'); targets.push(sdDesc); }
      var sdGrid = spotDark.querySelector('.spotlight-points-grid');
      if (sdGrid) { sdGrid.classList.add('pbp-split-desc-left'); targets.push(sdGrid); }
      var sdBtn = spotDark.querySelector('.btn-gold');
      if (sdBtn) { sdBtn.classList.add('pbp-split-btn-left'); targets.push(sdBtn); }
      var sdImg = spotDark.querySelector('.spotlight-img-box');
      if (sdImg) {
        sdImg.classList.add('pbp-split-img-right');
        targets.push(sdImg);
      }
    }

    // D. Home Spotlight Light - Government Projects (Image Left, Text Right)
    var spotLight = document.querySelector('.home-spotlight-light');
    if (spotLight) {
      var slImg = spotLight.querySelector('.spotlight-img-box');
      if (slImg) {
        slImg.classList.add('pbp-split-img-left');
        targets.push(slImg);
      }
      var slTag = spotLight.querySelector('.section-tag');
      if (slTag) { slTag.classList.add('pbp-split-tag-right'); targets.push(slTag); }
      var slTitle = spotLight.querySelector('h2');
      if (slTitle) { slTitle.classList.add('pbp-split-title-right'); targets.push(slTitle); }
      var slDesc = spotLight.querySelector('p');
      if (slDesc) { slDesc.classList.add('pbp-split-desc-right'); targets.push(slDesc); }
      var slGrid = spotLight.querySelector('.spotlight-points-grid');
      if (slGrid) { slGrid.classList.add('pbp-split-desc-right'); targets.push(slGrid); }
      var slBtn = spotLight.querySelector('.btn-gold');
      if (slBtn) { slBtn.classList.add('pbp-split-btn-right'); targets.push(slBtn); }
    }

    // ------------------------------------------------------------------------
    // 2. COMPLETE CARDS AS A SINGLE UNIT (Zoom-In Entrance: scale 0.92 -> 1)
    // Whole card moves together. Card contents have NO separate animation.
    // ------------------------------------------------------------------------
    var cardSelectors = [
      '.home-feature-card',
      '.service-card-lux',
      '.about-showcase-box',
      '.value-card',
      '.project-card-clean',
      '.capability-card',
      '.gallery-item-card',
      '.expertise-card',
      '.govt-solution-card',
      '.quickbar-item',
      '.contact-info-card',
      '.contact-location-card',
      '.pan-india-card',
      '.legacy-stat-card',
      '.approach-step-card',
      '.insight-card',
      '.proj-card-lux',
      '.stat-card-luxury',
      '.why-feature-block',
      '.gallery-preview-item',
      '.commitment-value-card',
      '.faq-item',
      'body.d-flex main .text-center > div'
    ].join(', ');

    // Group cards by parent row/grid to stagger naturally per section
    var cardContainers = document.querySelectorAll('.row, .gallery-grid-row, .home-cards-container, .values-strip, .contact-quickbar, .container');
    var processedCards = new Set();

    cardContainers.forEach(function (container) {
      var cards = container.querySelectorAll(cardSelectors);
      cards.forEach(function (card, index) {
        if (isExcluded(card) || processedCards.has(card)) return;
        processedCards.add(card);

        card.classList.add('pbp-whole-card');
        // Stagger delays: 0s, 0.16s, 0.32s, 0.48s... (slow, one-by-one)
        var staggerDelay = (index * 0.16).toFixed(2);
        card.style.transitionDelay = staggerDelay + 's';
        targets.push(card);
      });
    });

    // Catch any remaining cards not caught in containers
    var allCards = document.querySelectorAll(cardSelectors);
    allCards.forEach(function (card, index) {
      if (!processedCards.has(card) && !isExcluded(card)) {
        processedCards.add(card);
        card.classList.add('pbp-whole-card');
        var staggerDelay = (index * 0.16).toFixed(2);
        card.style.transitionDelay = staggerDelay + 's';
        targets.push(card);
      }
    });

    // ------------------------------------------------------------------------
    // 3. INTERSECTION OBSERVER FOR SCROLL REVEAL
    // ------------------------------------------------------------------------
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.classList.add('pbp-revealed');
          obs.unobserve(el);

          // Clear inline delay and mark settled after entrance animation completes
          var cleanupTimeout = setTimeout(function () {
            el.style.transitionDelay = '';
            el.classList.add('pbp-settled');
          }, 1800);

          el.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
              el.removeEventListener('transitionend', onEnd);
              clearTimeout(cleanupTimeout);
              el.style.transitionDelay = '';
              el.classList.add('pbp-settled');
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    // Observe all targets
    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Run as soon as DOM is interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
