// PERSONALIZE AQUI: inclua o DDI 55 + DDD + número, sem espaços.
const CONFIG = {
  whatsapp: '5511999999999',
  instagram: 'https://instagram.com/'
};

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filterButtons = document.querySelectorAll('.filter');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.project').forEach(project => {
    project.hidden = button.dataset.filter !== 'todos' && project.dataset.category !== button.dataset.filter;
  });
}));

const whatsappUrl = (message) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
document.getElementById('whatsapp-link').href = whatsappUrl('Olá! Gostaria de saber mais sobre os serviços.');
document.getElementById('instagram-link').href = CONFIG.instagram;
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const servico = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();
  if (!nome || !telefone || !servico || !mensagem) return;
  const texto = `Olá! Quero solicitar um orçamento.\n\nNome: ${nome}\nTelefone: ${telefone}\nServiço: ${servico}\nProjeto: ${mensagem}`;
  window.open(whatsappUrl(texto), '_blank', 'noopener,noreferrer');
});
