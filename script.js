/* ============================================================
   BAIJOU MOUAD — PORTFOLIO JAVASCRIPT
   EmailJS configuré et prêt
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── EMAILJS INIT ──
  emailjs.init("ST93hjPeU1H9zOLbO");

  // ── LOADER ──
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('done'), 1800);

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    navbar.classList.toggle('scrolled', currentScrollY > 50);
    lastScrollY = currentScrollY;
  }, { passive: true });

  // ── MOBILE MENU ──
  const menuToggle = document.getElementById('hamburger');
  let mobileMenu = document.querySelector('.mobile-menu');

  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'mobile-menu';
    
    const links = [
      { text: 'Profil', href: '#about' },
      { text: 'Formation', href: '#education' },
      { text: 'Expérience', href: '#experience' },
      { text: 'Projets', href: '#projects' },
      { text: 'Compétences', href: '#skills' },
      { text: 'Contact', href: '#contact' }
    ];
    
    links.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      a.dataset.section = item.href.replace('#', '');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        const target = document.querySelector(item.href);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      });
      mobileMenu.appendChild(a);
    });
    
    document.body.appendChild(mobileMenu);
  }

  function openMenu() {
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // ── REVEAL ANIMATIONS ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── LANGUAGE BAR ANIMATION ──
  const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.lang-fill');
        fills.forEach((fill, index) => {
          const w = fill.getAttribute('data-w');
          setTimeout(() => { fill.style.width = w + '%'; }, 400 + (index * 100));
        });
        langObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const langSection = document.querySelector('.about-langs');
  if (langSection) langObserver.observe(langSection);

  // ── TABS ──
  const tabs = document.querySelectorAll('.exp-tab');
  const panels = document.querySelectorAll('.exp-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // ── CONTACT FORM ──
  const form = document.getElementById('contactForm');
  const success = document.getElementById('form-success');

  if (form) {
    const honeypot = form.querySelector('input[name="website"]');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (honeypot && honeypot.value !== '') {
        console.warn('Bot detected');
        return;
      }
      
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      emailjs.sendForm("service_urrn53d", "template_9ilmg88", form)
        .then(() => {
          form.reset();
          btn.textContent = originalText;
          btn.disabled = false;
          success.style.color = '';
          success.textContent = '✅ Message envoyé ! Je vous répondrai bientôt.';
          success.style.display = 'block';
          setTimeout(() => { success.style.display = 'none'; }, 5000);
        })
        .catch((error) => {
          btn.textContent = originalText;
          btn.disabled = false;
          success.style.color = '#e74c3c';
          success.textContent = '❌ Erreur d\'envoi. Contactez-moi directement par email.';
          success.style.display = 'block';
          console.error('EmailJS error:', error);
          setTimeout(() => { success.style.display = 'none'; success.style.color = ''; }, 5000);
        });
    });
  }

  // ── ACTIVE NAV HIGHLIGHT ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + (window.innerHeight / 3);
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href && href.replace('#', '') === currentSection) {
        link.style.color = 'var(--gold)';
      }
    });

    mobileLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.dataset.section === currentSection) {
        link.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── CURSOR TRAIL (desktop uniquement) ──
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  
  if (!isTouchDevice) {
    let trailTimeout;
    document.addEventListener('mousemove', (e) => {
      clearTimeout(trailTimeout);
      trailTimeout = setTimeout(() => {
        const dot = document.createElement('div');
        dot.style.cssText = `
          position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(201,168,76,0.5);
          pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
          transition: opacity 0.8s, transform 0.8s;
        `;
        document.body.appendChild(dot);
        requestAnimationFrame(() => {
          dot.style.opacity = '0';
          dot.style.transform = 'translate(-50%, -50%) scale(3)';
        });
        setTimeout(() => dot.remove(), 800);
      }, 20);
    });
  }

  // ── TYPED TEXT EFFECT ──
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const texts = ['Disponible pour Stage ou Collaboration'];
    let i = 0;
    heroTag.style.transition = 'opacity 0.4s ease';
    
    setInterval(() => {
      i = (i + 1) % texts.length;
      heroTag.style.opacity = '0';
      setTimeout(() => {
        heroTag.textContent = texts[i];
        heroTag.style.opacity = '1';
      }, 400);
    }, 3500);
  }

  // ── COUNTER ANIMATION ──
  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + '+';
      }
    }, 16);
  }

  const badgeNum = document.querySelector('.badge-num');
  if (badgeNum) {
    const badgeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(badgeNum, 3);
          badgeObserver.unobserve(entry.target);
        }
      });
    });
    badgeObserver.observe(badgeNum);
  }

});