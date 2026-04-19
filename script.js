/* ── CURSOR ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

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
      if (entry.boundingClientRect.top < 0) {
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
