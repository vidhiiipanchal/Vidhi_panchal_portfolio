// ==========================================================================
// VIDHI PANCHAL — FIELD NOTES
// Ambient particles, scroll reveals, navigation behaviour
// ==========================================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Nav toggle (mobile) ---------- */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Sticky nav shadow on scroll ---------- */
const siteNav = document.getElementById('site-nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  siteNav.style.boxShadow = y > 12 ? '0 6px 20px rgba(60,40,20,0.08)' : 'none';
  lastScroll = y;
}, { passive: true });

/* ---------- Scroll reveal ---------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
}

/* ---------- Ambient particle system ----------
   Slow-drifting dust, DNA-inspired dots and soft gold sparkles.
   Kept subtle and non-distracting; paused for reduced-motion users. */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let width, height, dpr;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = document.documentElement.scrollHeight;
  canvas.width = width * dpr;
  canvas.height = Math.min(height, window.innerHeight * 2.2) * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = Math.min(height, window.innerHeight * 2.2) + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function makeParticle() {
  const kinds = ['dust', 'dust', 'dust', 'gold', 'ring'];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  return {
    kind,
    x: Math.random() * width,
    y: Math.random() * (canvas.height / dpr),
    r: kind === 'ring' ? 2 + Math.random() * 2.5 : 0.6 + Math.random() * 1.8,
    vx: (Math.random() - 0.5) * 0.06,
    vy: -0.05 - Math.random() * 0.12,
    o: 0.15 + Math.random() * 0.35,
    driftSeed: Math.random() * Math.PI * 2
  };
}

function initParticles() {
  const count = Math.min(70, Math.floor((width * height) / 26000));
  particles = Array.from({ length: Math.max(28, count) }, makeParticle);
}

function draw() {
  ctx.clearRect(0, 0, width, canvas.height / dpr);
  const t = performance.now() / 6000;

  particles.forEach(p => {
    p.x += p.vx + Math.sin(t + p.driftSeed) * 0.04;
    p.y += p.vy;

    if (p.y < -10) { p.y = (canvas.height / dpr) + 10; p.x = Math.random() * width; }
    if (p.x < -10) p.x = width + 10;
    if (p.x > width + 10) p.x = -10;

    ctx.beginPath();
    if (p.kind === 'gold') {
      ctx.fillStyle = `rgba(198,166,100,${p.o})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'ring') {
      ctx.strokeStyle = `rgba(139,98,57,${p.o * 0.6})`;
      ctx.lineWidth = 0.6;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillStyle = `rgba(74,53,36,${p.o * 0.5})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  requestAnimationFrame(draw);
}

if (!prefersReducedMotion) {
  resize();
  initParticles();
  requestAnimationFrame(draw);
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); initParticles(); }, 200);
  });
} else {
  canvas.style.display = 'none';
}
