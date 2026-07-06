/* =============================================================
   products.js — Metal Scrap India
   Product detail page interactions (all 6 metal pages).
   ============================================================= */

/* ── Mobile menu toggle ─────────────────────────────────────── */
function toggleMenu(btn) {
  const menu = document.getElementById('mobileMenu');
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.querySelector('i').className = open ? 'ti ti-x' : 'ti ti-menu-2';
}

/* Close mobile menu when any link inside it is clicked */
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
    const btn = document.querySelector('.hamburger');
    if (btn) {
      btn.setAttribute('aria-expanded', false);
      btn.querySelector('i').className = 'ti ti-menu-2';
    }
  });
});

/* ── Grade card accordion ────────────────────────────────────── */
document.querySelectorAll('.grade-header').forEach(gradeHeader => {
  gradeHeader.addEventListener('click', () => {
    const card = gradeHeader.closest('.grade-card');
    card.classList.toggle('open');
  });
});

/* Open the first grade card by default on page load */
const firstCard = document.querySelector('.grade-card');
if (firstCard) firstCard.classList.add('open');

/* ── Scroll-reveal for .fade-up elements ────────────────────── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ── Header darkens on scroll ───────────────────────────────── */
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 60
      ? 'rgba(15, 25, 35, 0.98)'
      : 'rgba(15, 25, 35, 0.97)';
  }, { passive: true });
}
