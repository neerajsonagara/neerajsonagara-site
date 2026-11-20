// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Years of experience: computed live from career start (July 2008), updates automatically every day
const CAREER_START = new Date('2008-07-01T00:00:00');
const yearsOfExperience = (Date.now() - CAREER_START) / (1000 * 60 * 60 * 24 * 365.25);
const yearsDisplay = yearsOfExperience.toFixed(1) + '+';
document.querySelectorAll('.exp-years').forEach(el => { el.textContent = yearsDisplay; });
document.querySelectorAll('[data-dynamic="years"]').forEach(el => { el.dataset.count = yearsOfExperience.toFixed(1); });

// Header scroll state
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  backToTop.classList.toggle('visible', window.scrollY > 500);
};
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hero: full-bleed rotating banner, calm crossfade
const heroBanner = document.getElementById('heroBanner');
if (heroBanner) {
  const slides = heroBanner.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('#bannerDots .dot');
  let slideIndex = 0;
  setInterval(() => {
    slides[slideIndex].classList.remove('is-active');
    if (dots[slideIndex]) dots[slideIndex].classList.remove('is-active');
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('is-active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('is-active');
  }, 4500);
}

// Trust strip: animated KPI counters
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const format = el.dataset.format || '';
  const display = format === 'k' ? target / 1000 : target;
  const decimals = Number.isInteger(display) ? 0 : 1;
  const unit = format === 'k' ? 'K' : '';
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (display * eased).toFixed(decimals) + unit + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const trustNums = document.querySelectorAll('.trust-num');
if (trustNums.length) {
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        trustObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  trustNums.forEach(el => trustObserver.observe(el));
}

// Back to top
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
