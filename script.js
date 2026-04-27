// ─── Booking Modal ────────────────────────────────────────────────────────────
// Replace YOUR_FORM_ID with your Formspree form ID after signing up at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const bookingOverlay = document.getElementById('bookingModal');
const bookingForm    = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const bookingError   = document.getElementById('bookingError');
const bookingClose   = document.querySelector('.booking-close');
const dateInput      = document.getElementById('bookingDate');

if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
}

function openBooking() {
  bookingOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeBooking() {
  bookingOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.open-booking').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openBooking(); });
});

if (bookingClose) bookingClose.addEventListener('click', closeBooking);

if (bookingOverlay) {
  bookingOverlay.addEventListener('click', e => {
    if (e.target === bookingOverlay) closeBooking();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBooking();
});

if (bookingForm) {
  bookingForm.addEventListener('submit', async e => {
    e.preventDefault();
    const submitBtn = bookingForm.querySelector('.booking-submit');
    bookingError.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(bookingForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        bookingForm.style.display = 'none';
        bookingSuccess.style.display = 'block';
      } else {
        throw new Error();
      }
    } catch {
      bookingError.textContent = 'Something went wrong. Please try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Request';
    }
  });
}

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
