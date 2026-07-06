/* =============================================================
   career.js — Metal Scrap India
   Careers page interactions: department filter, job accordion,
   apply-button autofill, and application submission.
   Assumes main.js is also loaded on this page (handles
   toggleMenu, header scroll, and .fade-up reveal animation).
   ============================================================= */

/* ── Job card accordion ─────────────────────────────────────── */
document.querySelectorAll('.job-header').forEach(jobHeader => {
  jobHeader.addEventListener('click', () => {
    const card = jobHeader.closest('.job-card');
    card.classList.toggle('open');
  });
});

/* ── Department filter tabs ─────────────────────────────────── */
const deptTabs = document.querySelectorAll('.dept-tab');
const jobCards = document.querySelectorAll('.job-card');
const noResults = document.getElementById('noResults');

deptTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    deptTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    let visibleCount = 0;

    jobCards.forEach(card => {
      const match = filter === 'all' || card.dataset.dept === filter;
      card.style.display = match ? '' : 'none';
      if (!match) card.classList.remove('open');
      if (match) visibleCount++;
    });

    if (noResults) noResults.hidden = visibleCount > 0;
  });
});

/* ── "Apply for this role" — jump to form and prefill position ── */
document.querySelectorAll('.btn-apply-job').forEach(btn => {
  btn.addEventListener('click', () => {
    const position = btn.dataset.position;
    const posSelect = document.getElementById('c-position');

    if (posSelect && position) {
      const optionExists = Array.from(posSelect.options).some(opt => opt.value === position);
      if (optionExists) posSelect.value = position;
    }

    const applySection = document.getElementById('apply');
    if (applySection) applySection.scrollIntoView({ behavior: 'smooth' });

    const nameField = document.getElementById('c-name');
    if (nameField) setTimeout(() => nameField.focus(), 500);
  });
});

/* ── Application form submission (opens pre-filled email) ──────
   Static site with no backend — a mailto link is the most
   reliable way to let the applicant attach their resume/CV
   themselves before sending.
   ============================================================= */
function handleApply() {
  const name        = document.getElementById('c-name')?.value.trim();
  const email       = document.getElementById('c-email')?.value.trim();
  const countryCode = document.getElementById('c-country-code')?.value || '+91';
  const phone       = document.getElementById('c-phone')?.value.trim();
  const position    = document.getElementById('c-position')?.value;
  const experience  = document.getElementById('c-experience')?.value;
  const location    = document.getElementById('c-location')?.value.trim();
  const message     = document.getElementById('c-message')?.value.trim();

  if (!name || !email || !phone || !position) {
    alert('Please fill in your name, email, phone number and position before submitting.');
    return;
  }

  const fullPhone = countryCode === 'other' ? phone : `${countryCode} ${phone}`;

  const subject = encodeURIComponent(`Job Application - ${position}`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${fullPhone}\n` +
    `Position Applying For: ${position}\n` +
    `Experience: ${experience || 'Not specified'}\n` +
    `Current Location: ${location || 'Not specified'}\n\n` +
    `Message:\n${message || 'Not specified'}\n\n` +
    `— Please attach your resume/CV to this email before sending —`
  );

  window.location.href = `mailto:careers@metalscrapindia.in?subject=${subject}&body=${body}`;
}
