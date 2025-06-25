import React, { useState, useRef } from 'react';

interface Evento {
  year: string;
  text: string;
  info: string;
}

const eventos: Evento[] = [
  { year: '2017', text: 'Inicio del secundario 🔐', info: 'Institución: Instituto General San Martin' },
  { year: '2022', text: 'Fin del secundario 🔑️', info: 'Promedio final: 7.9' },
  { year: '2023', text: 'Empiezo Ing. Software 👨‍💻', info: 'Universidad: siglo 21, Ingeniería en Software' },
  { year: '2024', text: 'Curso de Java en Udemy 🔷', info: 'Curso completado: Java en Udemy, 120 horas' },
  { year: '2025', text: 'Curso Python en Udemy 🐍', info: 'Curso avanzado: Python en Udemy, 100 horas' },
  { year: '2025', text: 'Inicio del proyecto ProyectoEscuelas 🏫', info: 'Proyecto grupal: MiEscuelaApp, gestión escolar' },
  { year: '2025', text: 'Sigo cursando, a punto de recibir mi título intermedio 🎓', info: 'Título intermedio: Analista Universitario en Sistemas (en trámite)' },
];

const SobreMi: React.FC = () => {
  const [expandido, setExpandido] = useState(false);
  const [tooltip, setTooltip] = useState<{ visible: boolean; text: string; x: number; y: number }>({
    visible: false,
    text: '',
    x: 0,
    y: 0,
  });
  const lineaRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Tooltip handlers
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, info: string) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: info,
      x: rect.left + rect.width / 2,
      y: rect.top - 10, // 10px arriba del evento
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    setTooltip((t) => ({
      ...t,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }));
  };

  // Drag horizontal handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!lineaRef.current) return;
    isDragging.current = true;
    lineaRef.current.classList.add('dragging');
    startX.current = e.pageX - lineaRef.current.offsetLeft;
    scrollLeft.current = lineaRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (lineaRef.current) lineaRef.current.classList.remove('dragging');
  };

  const handleMouseLeaveContainer = () => {
    isDragging.current = false;
    if (lineaRef.current) lineaRef.current.classList.remove('dragging');
  };

  const handleMouseMoveContainer = (e: React.MouseEvent) => {
    if (!isDragging.current || !lineaRef.current) return;
    e.preventDefault();
    const x = e.pageX - lineaRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    lineaRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!lineaRef.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - lineaRef.current.offsetLeft;
    scrollLeft.current = lineaRef.current.scrollLeft;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !lineaRef.current) return;
    const x = e.touches[0].pageX - lineaRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    lineaRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section id="sobre-mi" className={`tarjeta expandible${expandido ? ' expandida' : ''}`}>
      <h2>Sobre mí</h2>
      <div className="contenido-limitado">
        <p>
          Soy estudiante avanzado de Ingeniería en Software, con un marcado interés en el desarrollo backend y la gestión eficiente de bases de datos. Me caracterizo por un enfoque lógico y ordenado para resolver problemas, así como por una fuerte capacidad de trabajo en equipo y aprendizaje autodidacta. A lo largo de mi formación, he participado en diversos proyectos académicos que me han permitido aplicar buenas prácticas de programación, adoptar metodologías ágiles y adquirir una base sólida en tecnologías como Python, Java, Flask y PostgreSQL. Siempre estoy en búsqueda de nuevos desafíos que me permitan seguir creciendo como profesional del desarrollo de software.
        </p>
        <p>
          Experiencia en múltiples proyectos académicos, buenas prácticas de programación y autonomía en el aprendizaje.
        </p>
      </div>
      {expandido && (
        <div
          className="linea-futurista-container"
          ref={lineaRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeaveContainer}
          onMouseMove={handleMouseMoveContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          style={{ overflowX: 'auto', cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          <div className="linea-futurista" style={{ display: 'flex' }}>
            {eventos.map((evento, idx) => (
              <div
                key={idx}
                className="evento-futurista"
                onMouseEnter={(e) => handleMouseEnter(e, evento.info)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ minWidth: 120, margin: '0 12px', textAlign: 'center' }}
              >
                <strong>{evento.year}</strong>
                <p>{evento.text}</p>
              </div>
            ))}
          </div>
          {tooltip.visible && (
            <div
              className="tooltip visible pro-tooltip"
              style={{
                position: 'fixed',
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translate(-50%, -110%)', // un poco más arriba para la flecha
                pointerEvents: 'none',
                zIndex: 1000,
                opacity: tooltip.visible ? 1 : 0,
                transition: 'opacity 0.25s cubic-bezier(.4,2,.6,1)',
              }}
            >
              <span className="pro-tooltip-content">{tooltip.text}</span>
              <span className="pro-tooltip-arrow" />
            </div>
          )}
        </div>
      )}
      <button className="mostrar-mas" onClick={() => setExpandido(!expandido)}>
        {expandido ? 'Mostrar menos' : 'Mostrar más'}
      </button>
    </section>
  );
};

export default SobreMi;