// ─── Theme Toggle ─────────────────────────────────────────────────────────────
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
}

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

// ─── Smooth Scroll ────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    document.body.classList.remove('nav-open');
  });
});

// ─── Mobile Nav Toggle ────────────────────────────────────────────────────────
const mobileToggle = document.querySelector('.nav-mobile-toggle');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}

document.addEventListener('click', (e) => {
  if (
    document.body.classList.contains('nav-open') &&
    !e.target.closest('.navbar')
  ) {
    document.body.classList.remove('nav-open');
  }
});

// ─── Section Reveal (IntersectionObserver) ────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

document.querySelectorAll('.section-reveal').forEach(el => {
  revealObserver.observe(el);
});
