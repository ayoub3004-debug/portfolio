                              vconst navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', function() {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() { navLinks.classList.remove('open'); });
});

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';
  let hasError = false;
  if (!name) { document.getElementById('nameError').textContent = 'Merci d\'entrer ton nom.'; hasError = true; }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) { document.getElementById('emailError').textContent = 'Merci d\'entrer ton email.'; hasError = true; }
  else if (!emailRegex.test(email)) { document.getElementById('emailError').textContent = 'Email invalide.'; hasError = true; }
  if (message.length < 10) { document.getElementById('messageError').textContent = 'Message trop court (10 caractères min).'; hasError = true; }
  if (hasError) return;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours...';
  fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { 'Accept': 'application/json' } })
    .then(function(r) {
      if (r.ok) { formSuccess.style.display = 'flex'; contactForm.style.display = 'none'; }
      else { alert('Erreur. Réessaie plus tard.'); submitBtn.disabled = false; submitBtn.textContent = 'Envoyer le message'; }
    })
    .catch(function() { alert('Erreur réseau.'); submitBtn.disabled = false; submitBtn.textContent = 'Envoyer le message'; });
});

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .project-card, .stat-card, .skill-category, .timeline-item').forEach(function(el) {
  el.classList.add('fade-hidden');
  observer.observe(el);
});

const s = document.createElement('style');
s.textContent = '.fade-hidden{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}.fade-hidden.visible{opacity:1;transform:translateY(0)}';
document.head.appendChild(s);

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20, behavior: 'smooth' });
  });
});
