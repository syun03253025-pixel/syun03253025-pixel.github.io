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

function nextSlide() { goToSlide(current + 1); }

function startSlideshow() {
  slideTimer = setInterval(nextSlide, 4000);
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
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Menu tabs
const tabs = document.querySelectorAll('.menu-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.section-header, .about-split-content, .about-split-img, .gal-item, .bento-item, .sns-card, .access-row, .btn-contact, .menu-tabs, .insta-photo-item');

revealEls.forEach(el => {
  el.classList.add('reveal');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * (Array.from(revealEls).indexOf(entry.target) % 6));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Staggered reveal for grid items
const staggerGroups = [
  '.gal-item',
  '.bento-item',
  '.sns-card',
  '.insta-photo-item',
  '.flavor-grid span',
];

staggerGroups.forEach(selector => {
  const els = document.querySelectorAll(selector);
  els.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
  });
});
