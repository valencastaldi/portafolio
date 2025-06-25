import React from 'react';

const Contactame: React.FC = () => (
  <section id="contacto" className="tarjeta">
    <h2>Contacto</h2>
    <div className="contacto-iconos">
      <a href="https://github.com/valencastaldi" target="_blank" rel="noopener noreferrer">
        <img src="/img/github icon.png" alt="GitHub" />
      </a>
      <a href="mailto:valentino.castaldi@gmail.com">
        <img src="/img/gmail icon.png" alt="Gmail" />
      </a>
      <a href="https://linkedin.com/in/valentinocastaldi" target="_blank" rel="noopener noreferrer">
        <img src="/img/linkedin icon.png" alt="LinkedIn" />
      </a>
    </div>
  </section>
);

export default Contactame;