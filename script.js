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
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── HAMBURGER / MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  let mobileMenu = document.querySelector('.mobile-menu');

  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    const links = ['Profil|#about','Formation|#education','Expérience|#experience','Projets|#projects','Compétences|#skills','Contact|#contact'];
    links.forEach(item => {
      const [text, href] = item.split('|');
      const a = document.createElement('a');
      a.href = href; a.textContent = text;
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        isOpen = false;
        document.body.style.overflow = '';
      });
      mobileMenu.appendChild(a);
    });
    document.body.appendChild(mobileMenu);
  }

  let isOpen = false;
  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // ── REVEAL ANIMATIONS ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const siblings = parent.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 100;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── LANGUAGE BAR ANIMATION ──
  const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.lang-fill');
        fills.forEach(fill => {
          const w = fill.getAttribute('data-w');
          setTimeout(() => { fill.style.width = w + '%'; }, 400);
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

  // ── CONTACT FORM avec EmailJS ──
  const form = document.getElementById('contactForm');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      emailjs.sendForm("service_urrn53d", "template_9ilmg88", form)
        .then(() => {
          form.reset();
          btn.textContent = 'Envoyer le message';
          btn.disabled = false;
          success.style.color = '';
          success.textContent = '✅ Message envoyé ! Je vous répondrai bientôt.';
          success.style.display = 'block';
          setTimeout(() => { success.style.display = 'none'; }, 5000);
        })
        .catch((error) => {
          btn.textContent = 'Envoyer le message';
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

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── CURSOR TRAIL ──
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

  // ── TYPED TEXT EFFECT ──
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const texts = [
      'Étudiant Master • Ingénierie Commerciale et Marketing Digital',
      'Passionné par le Commerce',
      'Disponible pour Stage ou Collaboration',
    ];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % texts.length;
      heroTag.style.opacity = '0';
      setTimeout(() => {
        heroTag.textContent = texts[i];
        heroTag.style.opacity = '1';
      }, 400);
    }, 3500);
    heroTag.style.transition = 'opacity 0.4s ease';
  }

  // ── COUNTER ANIMATION ──
  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
      else { el.textContent = Math.floor(start) + '+'; }
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