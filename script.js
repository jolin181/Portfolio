/**
 * ============================================================================
 * PORTFOLIO JAVASCRIPT - JOLIN A
 * Pure Vanilla JavaScript (No libraries, zero dependencies)
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Safe LocalStorage Utility Wrapper
  // --------------------------------------------------------------------------
  const storage = {
    get: function (key) {
      try {
        return localStorage.getItem(key);
      } catch (err) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (err) {
        // Fallback gracefully if storage is restricted
      }
    }
  };

  // --------------------------------------------------------------------------
  // 2. Theme Toggle (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  function getPreferredTheme() {
    // 1. Check local storage
    const savedTheme = storage.get('jolin-portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // 2. Default to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // default theme
  }

  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      themeToggleBtn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      themeToggleBtn.setAttribute('title', `Switch to ${nextTheme} theme`);
    }
  }

  // Initialize theme on load
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const activeTheme = rootElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      storage.set('jolin-portfolio-theme', newTheme);
    });
  }

  // Listen to system color scheme changes if user hasn't manually set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!storage.get('jolin-portfolio-theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation (Hamburger Menu)
  // --------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function openNav() {
    if (!mobileToggleBtn || !navMenu) return;
    mobileToggleBtn.classList.add('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
  }

  function closeNav() {
    if (!mobileToggleBtn || !navMenu) return;
    mobileToggleBtn.classList.remove('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
  }

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close mobile nav when clicking any link
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeNav();
      });
    });

    // Close when clicking outside of navbar
    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !mobileToggleBtn.contains(event.target)) {
        if (navMenu.classList.contains('is-open')) {
          closeNav();
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
        mobileToggleBtn.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Smooth Scrolling & Active Nav-Link Highlighting (IntersectionObserver)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('main section[id]');

  function updateActiveNavLink(currentId) {
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px', // Highlights as section enters mid-screen
      threshold: 0
    };

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          updateActiveNavLink(entry.target.getAttribute('id'));
        }
      });
    }, navObserverOptions);

    sections.forEach(function (section) {
      navObserver.observe(section);
    });

    // Fallback: When scrolled to absolute bottom, activate contact link
    window.addEventListener('scroll', function () {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 40)) {
        updateActiveNavLink('contact');
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 5. Fade-in-on-Scroll Animation (IntersectionObserver)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.section, .card');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    revealElements.forEach(function (el) {
      el.classList.add('reveal-on-scroll');
    });

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Reveal only once for performance
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // If IntersectionObserver is unavailable or reduced motion is preferred
    revealElements.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  // --------------------------------------------------------------------------
  // 6. Project Filter Buttons (All / Full-Stack / AI / 3D-Web)
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filterValue = button.getAttribute('data-filter');

        // Update active button state
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter projects
        projectCards.forEach(function (card) {
          const categories = card.getAttribute('data-category') || '';
          const categoryList = categories.split(' ');

          if (filterValue === 'all' || categoryList.includes(filterValue)) {
            card.classList.remove('is-hidden');
            // Brief opacity re-trigger for smooth fade
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            requestAnimationFrame(function () {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Hide Dead Live Links (If href is "#")
  // --------------------------------------------------------------------------
  const liveButtons = document.querySelectorAll('.btn-primary-card');
  liveButtons.forEach(function (btn) {
    const href = btn.getAttribute('href');
    if (!href || href.trim() === '#' || href.trim() === '') {
      btn.style.display = 'none';
      btn.setAttribute('aria-hidden', 'true');
    }
  });

  // --------------------------------------------------------------------------
  // 8. Hero Pitch Typing Animation (Accessible & Fallback-friendly)
  // --------------------------------------------------------------------------
  const typingElement = document.querySelector('.typing-text');
  if (typingElement && !prefersReducedMotion) {
    const pitchText = typingElement.getAttribute('data-typing') || typingElement.textContent;
    let charIndex = 0;
    typingElement.textContent = '';

    function typeChar() {
      if (charIndex < pitchText.length) {
        typingElement.textContent += pitchText.charAt(charIndex);
        charIndex++;
        const delay = 22 + Math.floor(Math.random() * 18); // Natural human typing cadence
        setTimeout(typeChar, delay);
      }
    }

    // Delay start slightly after initial page paint
    setTimeout(typeChar, 350);
  }

  // --------------------------------------------------------------------------
  // 9. Dynamic Footer Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

})();
