/* ── CURSOR ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const trailContainer = document.getElementById('cursor-trail-container');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let lastTrailTime = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    const now = Date.now();
    if (now - lastTrailTime > 30) {
      spawnTrailParticle(mouseX, mouseY);
      lastTrailTime = now;
    }
  });

  function spawnTrailParticle(x, y) {
    const p = document.createElement('div');
    p.classList.add('trail-particle');
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}px; top:${y}px;
      background: rgba(0,212,255,${Math.random() * 0.4 + 0.1});
      box-shadow: 0 0 ${size * 2}px rgba(0,212,255,0.3);
    `;
    trailContainer.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .skill-tag, .nav-logo').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.remove('hidden');
    } else {
      const rect = entry.target.getBoundingClientRect();
      if (rect.top < 0) {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('visible');
      } else {
        entry.target.classList.remove('visible');
        entry.target.classList.remove('hidden');
      }
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

/* ── MODAL ── */
const overlay = document.getElementById('modal-overlay');
const modalType = document.getElementById('modal-type');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalTags = document.getElementById('modal-tags');
const closeBtn = document.getElementById('modal-close');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    modalType.textContent = card.dataset.type;
    modalTitle.textContent = card.dataset.title;
    modalBody.innerHTML = card.dataset.body;
    modalTags.innerHTML = card.dataset.tags.split(',').map(t =>
      `<span class="modal-tag">${t.trim()}</span>`
    ).join('');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
