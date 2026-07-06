/* =============================================================
   main.js — Metal Scrap India
   Shared interactions across all pages.
   ============================================================= */

function toggleMenu(btn) {
  const menu = document.getElementById('mobileMenu');
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.querySelector('i').className = open ? 'ti ti-x' : 'ti ti-menu-2';
}

function toggleMobileDropdown(btn) {
  const wrapper = btn.closest('.mobile-dropdown');
  const isOpen = wrapper.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
}

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

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 60
      ? 'rgba(15, 25, 35, 0.98)'
      : 'rgba(15, 25, 35, 0.95)';
  }, { passive: true });
}

function handleSubmit() {
  const name        = document.getElementById('f-name')?.value.trim();
  const countryCode = document.getElementById('f-country-code')?.value || '+91';
  const phone       = document.getElementById('f-phone')?.value.trim();
  const email       = document.getElementById('f-email')?.value.trim();
  const city        = document.getElementById('f-city')?.value.trim();
  const metal       = document.getElementById('f-metal')?.value;
  const message     = document.getElementById('f-message')?.value.trim();
  const company     = document.getElementById('f-company')?.value.trim();

  if (!name || !phone || !metal) {
    alert('Please fill in your name, phone number and metal type before submitting.');
    return;
  }

  const fullPhone = countryCode === 'other' ? phone : `${countryCode} ${phone}`;

  const text = encodeURIComponent(
    `Hi, I am ${name}.\n` +
    `Company: ${company || 'Not specified'}\n` +
    `Phone: ${fullPhone}\n` +
    `Email: ${email || 'Not specified'}\n` +
    `City: ${city || 'Not specified'}\n` +
    `Interested in: ${metal}\n` +
    `Grade / Quantity: ${message || 'Not specified'}`
  );

  window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, '_blank');
}

/* =============================================================
   Auto-update Market Date
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const dateSpan = document.getElementById('market-date');
  if (dateSpan) {
    const today = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    dateSpan.textContent = today.toLocaleDateString('en-IN', options);
  }
});