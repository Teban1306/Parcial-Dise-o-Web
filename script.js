
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const toggleText = document.getElementById('toggleText');
    
    contactForm.addEventListener('show.bs.collapse', function() {
      toggleText.textContent = 'Cancelar';
    });
    
    contactForm.addEventListener('hide.bs.collapse', function() {
      toggleText.textContent = 'Crear nueva brigada';
    });
  });
