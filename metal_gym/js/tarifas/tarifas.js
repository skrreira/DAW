document.addEventListener('DOMContentLoaded', () => {
    const planesGrid = document.querySelector('.planes-grid');
    const plans = document.querySelectorAll('.plan');
  
    plans.forEach(plan => {
      // Al entrar con el ratón en una tarjeta
      plan.addEventListener('mouseenter', () => {
        // Se añade la clase "active" a la tarjeta hovered
        plan.classList.add('active');
        // Se añade la clase al contenedor para activar el desenfoque en las demás tarjetas
        planesGrid.classList.add('active-hover');
      });
  
      // Al salir con el ratón de una tarjeta
      plan.addEventListener('mouseleave', () => {
        // Se quita la clase "active" de la tarjeta
        plan.classList.remove('active');
        // Se quita la clase del contenedor (se puede aplicar lógica adicional para comprobar si ninguna tarjeta está activa)
        planesGrid.classList.remove('active-hover');
      });
    });
  });
  