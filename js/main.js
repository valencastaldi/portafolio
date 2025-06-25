// --- Expansión y colapso de tarjetas "Mostrar más" ---
function toggleExpandir(boton) {
  const tarjeta = boton.closest('.expandible');
  if (!tarjeta) return;

  tarjeta.classList.toggle('expandida');
  const expanded = tarjeta.classList.contains('expandida');
  boton.textContent = expanded ? 'Mostrar menos' : 'Mostrar más';

  const lineaContainer = tarjeta.querySelector('.linea-futurista-container');
  if (lineaContainer) {
    if (expanded) {
      lineaContainer.classList.remove('oculto');
    } else {
      lineaContainer.classList.add('oculto');
      const tooltip = document.getElementById('tooltip');
      if (tooltip) {
        tooltip.classList.remove('visible', 'faded');
        tooltip.style.opacity = "";
      }
    }
  }
}

// --- Tooltip pro: animado, pegado, blur y fade en borde ---
document.addEventListener('DOMContentLoaded', function() {
  const tooltip = document.getElementById('tooltip');
  const eventos = document.querySelectorAll('.evento-futurista');
  const lineaContainer = document.querySelector('.linea-futurista-container');
  let hoveredEvento = null;

  function ajustarVisualTooltip(evento) {
    if (!tooltip || !evento || !lineaContainer) return;
    const eventoRect = evento.getBoundingClientRect();
    const containerRect = lineaContainer.getBoundingClientRect();

    let visibleLeft = Math.max(eventoRect.left, containerRect.left);
    let visibleRight = Math.min(eventoRect.right, containerRect.right);
    let visibleWidth = Math.max(0, visibleRight - visibleLeft);
    let ratio = visibleWidth / eventoRect.width;

    if (ratio < 0.45) {
      tooltip.classList.add("faded");
    } else {
      tooltip.classList.remove("faded");
    }
  }

  function positionTooltip(evento) {
    if (!tooltip || !evento) return;
    const rect = evento.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
    tooltip.classList.add('visible');
    tooltip.classList.remove('faded');

    requestAnimationFrame(() => {
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      let left = rect.left + rect.width / 2 + scrollLeft - tooltipWidth / 2;
      let top = rect.top + scrollTop - tooltipHeight - 12;
      if (top < 0) top = rect.bottom + scrollTop + 12;
      left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
      ajustarVisualTooltip(evento);
    });
  }

  eventos.forEach(evento => {
    evento.addEventListener('mouseenter', function() {
      hoveredEvento = this;
      const info = this.getAttribute('data-info');
      if (!info || !tooltip) return;
      tooltip.textContent = info;
      positionTooltip(this);
    });

    evento.addEventListener('mousemove', function() {
      hoveredEvento = this;
      positionTooltip(this);
    });

    evento.addEventListener('mouseleave', function() {
      hoveredEvento = null;
      if (!tooltip) return;
      tooltip.classList.remove('visible', 'faded');
      tooltip.style.opacity = "";
    });
  });

  window.addEventListener('scroll', function() {
    if (tooltip) {
      tooltip.classList.remove('visible', 'faded');
      hoveredEvento = null;
      tooltip.style.opacity = "";
    }
  });

  if (lineaContainer) {
    lineaContainer.addEventListener('scroll', function() {
      if (tooltip && hoveredEvento) {
        positionTooltip(hoveredEvento);
      }
    });
    let isDragging = false;
    lineaContainer.addEventListener('mousedown', (e) => { isDragging = true; });
    lineaContainer.addEventListener('mouseup', () => { isDragging = false; });
    lineaContainer.addEventListener('mousemove', () => {
      if (isDragging && tooltip && hoveredEvento) {
        positionTooltip(hoveredEvento);
      }
    });
    // Touch
    let isTouchDragging = false;
    lineaContainer.addEventListener('touchstart', (e) => { isTouchDragging = true; });
    lineaContainer.addEventListener('touchend', () => { isTouchDragging = false; });
    lineaContainer.addEventListener('touchmove', () => {
      if (isTouchDragging && tooltip && hoveredEvento) {
        positionTooltip(hoveredEvento);
      }
    });
  }
});

// --- Drag horizontal en la línea futurista (desktop y mobile) ---
document.addEventListener('DOMContentLoaded', function() {
  const lineaContainer = document.querySelector('.linea-futurista-container');
  let isDown = false;
  let startX, scrollLeft;

  if (lineaContainer) {
    lineaContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      lineaContainer.classList.add('dragging');
      startX = e.pageX - lineaContainer.offsetLeft;
      scrollLeft = lineaContainer.scrollLeft;
    });
    lineaContainer.addEventListener('mouseleave', () => {
      isDown = false;
      lineaContainer.classList.remove('dragging');
    });
    lineaContainer.addEventListener('mouseup', () => {
      isDown = false;
      lineaContainer.classList.remove('dragging');
    });
    lineaContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - lineaContainer.offsetLeft;
      const walk = (x - startX) * 1.2;
      lineaContainer.scrollLeft = scrollLeft - walk;
    });
    // Touch para móviles
    lineaContainer.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - lineaContainer.offsetLeft;
      scrollLeft = lineaContainer.scrollLeft;
    });
    lineaContainer.addEventListener('touchend', () => {
      isDown = false;
    });
    lineaContainer.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - lineaContainer.offsetLeft;
      const walk = (x - startX) * 1.2;
      lineaContainer.scrollLeft = scrollLeft - walk;
    });
  }
});