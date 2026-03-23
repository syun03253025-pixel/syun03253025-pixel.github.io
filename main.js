// Hero Slideshow
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;
let slideTimer;

function goToSlide(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startSlideshow() {
  slideTimer = setInterval(() => goToSlide(current + 1), 4000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    goToSlide(i);
    startSlideshow();
  });
});

startSlideshow();

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const [s1, s2, s3] = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    s1.style.transform = 'translateY(7px) rotate(45deg)';
    s2.style.opacity = '0';
    s3.style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    s1.style.transform = s2.style.opacity = s3.style.transform = '';
    s2.style.opacity = '';
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// Menu tabs
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.section-header, .about-split-content, .about-split-img, ' +
  '.gal-item, .bento-item, .sns-card, .access-row, ' +
  '.btn-contact, .menu-tabs, .insta-photo-item, .bell-teaser, .dm-banner-inner'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const idx = Array.from(revealEls).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), (idx % 6) * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Stagger grid items
['.gal-item', '.bento-item', '.sns-card', '.insta-photo-item', '.flavor-grid span'].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.style.transitionDelay = `${i * 55}ms`;
  });
});

// Counter animation for stats
const counters = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.textContent.trim();
    const num = parseFloat(raw);
    if (isNaN(num)) return;
    const suffix = raw.replace(/[\d.]/g, '');
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = num / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) { start = num; clearInterval(timer); }
      el.textContent = Number.isInteger(num) ? Math.floor(start) + suffix : start.toFixed(1) + suffix;
    }, step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => countObserver.observe(c));

// Game slideshow
const gameSlides = document.querySelectorAll('.game-slide');
if (gameSlides.length > 1) {
  let current = 0;
  setInterval(() => {
    gameSlides[current].classList.remove('active');
    current = (current + 1) % gameSlides.length;
    gameSlides[current].classList.add('active');
  }, 2800);
}
