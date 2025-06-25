import React, { useState } from 'react';

const Skills: React.FC = () => {
  const [expandido, setExpandido] = useState(false);

  return (
    <section id="skills" className={`tarjeta expandible${expandido ? ' expandida' : ''}`}>
      <h2>Skills</h2>
      <div className="contenido-limitado">
        <ul>
          <li>Python, Java, HTML/CSS, JavaScript</li>
          <li>Flask, PostgreSQL, Git</li>
          <li>Diseño Responsive, UML, Testing con Pytest</li>
        </ul>
        <img src="/img/skills_chart.png" alt="Gráfico de Skills" className="img-skills" />
      </div>
      <button className="mostrar-mas" onClick={() => setExpandido(!expandido)}>
        {expandido ? 'Mostrar menos' : 'Mostrar más'}
      </button>
    </section>
  );
};

export default Skills;