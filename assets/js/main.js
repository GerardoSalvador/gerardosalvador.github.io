// ===== Menú móvil =====
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });
}


// ===== Flip de tarjetas de Labs en móvil/tablet =====
const labCards = document.querySelectorAll('.lab-card');

// Detecta si el dispositivo es táctil (sin hover real)
const isTouch = window.matchMedia('(hover: none)').matches 
             || 'ontouchstart' in window 
             || navigator.maxTouchPoints > 0;

labCards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (!isTouch) return;

    // Si el click fue sobre un link, dejar que se ejecute normalmente
    if (e.target.closest('a')) return;

    // Prevenir que el listener global cierre la card inmediatamente
    e.stopPropagation();

    // Si ya está flippeada → regresarla
    if (card.classList.contains('is-flipped')) {
      card.classList.remove('is-flipped');
    } else {
      // Cerrar todas las demás y flippear esta
      labCards.forEach(c => c.classList.remove('is-flipped'));
      card.classList.add('is-flipped');
    }
  });
});

// Cerrar todas las cards flippeadas al tocar fuera
document.addEventListener('click', (e) => {
  if (!isTouch) return;
  if (!e.target.closest('.lab-card')) {
    labCards.forEach(c => c.classList.remove('is-flipped'));
  }
});