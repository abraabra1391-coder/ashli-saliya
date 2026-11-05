// Muslim Wedding Invitation clone script

(function() {
  'use strict';

  // Target Nikah Ceremony Date: 11 Dec 2026, After Asar Namaz (16:00:00)
  const TARGET_DATE = new Date('2026-12-11T16:00:00').getTime();

  // Elements
  const bgAudio = document.getElementById('bg-audio');
  const siteHeader = document.getElementById('site-header');
  const menuBtn = document.getElementById('menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const petalsContainer = document.getElementById('petals-container');
  const openInvitationBtn = document.getElementById('open-invitation-btn');
  const invitationContent = document.getElementById('invitation-content');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navTriggers = document.querySelectorAll('.nav-trigger');

  let isInvitationOpen = false;
  let countdownInterval = null;

  // 1. Audio setup and playback
  if (bgAudio) {
    bgAudio.volume = 0.3;
    const playAudio = () => {
      bgAudio.play().then(() => {
        window.removeEventListener('pointerdown', playAudio);
        window.removeEventListener('touchstart', playAudio);
        window.removeEventListener('keydown', playAudio);
      }).catch(() => {});
    };

    playAudio();
    window.addEventListener('pointerdown', playAudio);
    window.addEventListener('touchstart', playAudio);
    window.addEventListener('keydown', playAudio);
  }

  // 2. Header scroll style detection
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.remove('border-transparent');
      siteHeader.classList.add('border-gold/20', 'bg-ivory/85', 'backdrop-blur-md');
    } else {
      siteHeader.classList.remove('border-gold/20', 'bg-ivory/85', 'backdrop-blur-md');
      siteHeader.classList.add('border-transparent');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile menu handlers
  const setMobileMenuOpen = (open) => {
    if (open) {
      mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
      mobileMenu.classList.add('pointer-events-auto', 'opacity-100');
      document.body.style.overflow = 'hidden';
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.remove('pointer-events-auto', 'opacity-100');
      mobileMenu.classList.add('pointer-events-none', 'opacity-0');
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  };

  if (menuBtn) {
    menuBtn.addEventListener('click', () => setMobileMenuOpen(true));
  }
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => setMobileMenuOpen(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      setMobileMenuOpen(false);
    });
  });

  // 4. Falling Petals Generator
  if (petalsContainer) {
    const PETAL_COUNT = 10;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';

      const left = Math.random() * 100;
      const size = 8 + Math.random() * 10;
      const duration = 12 + Math.random() * 12;
      const delay = -(Math.random() * 20);
      const drift = `${(Math.random() - 0.5) * 160}px`;
      const opacity = 0.25 + Math.random() * 0.4;

      petal.style.left = `${left}%`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;
      petal.style.setProperty('--petal-drift', drift);
      petal.style.setProperty('--petal-opacity', opacity.toString());

      fragment.appendChild(petal);
    }
    petalsContainer.appendChild(fragment);
  }

  // 5. Scroll Reveal IntersectionObserver
  const setupReveals = () => {
    const revealElements = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  };

  // 6. Countdown Timer
  const updateCountdown = () => {
    const now = Date.now();
    const diff = Math.max(0, TARGET_DATE - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  };

  const startCountdown = () => {
    updateCountdown();
    if (!countdownInterval) {
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  };

  // 7. Open Invitation action
  const openInvitation = (targetId = 'invitation') => {
    if (!isInvitationOpen) {
      isInvitationOpen = true;
      invitationContent.classList.remove('hidden');
      startCountdown();
      setupReveals();
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openInvitation('invitation');
    });
  }

  // Handle nav triggers if user clicks "Our Story" or "Venue" before opening
  navTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const href = trigger.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        if (!isInvitationOpen && (id === 'story' || id === 'venue')) {
          e.preventDefault();
          openInvitation(id);
        }
      }
    });
  });

  // Check URL hash on page load
  if (window.location.hash) {
    const hashId = window.location.hash.slice(1);
    if (['invitation', 'story', 'venue'].includes(hashId)) {
      openInvitation(hashId);
    }
  }

})();
