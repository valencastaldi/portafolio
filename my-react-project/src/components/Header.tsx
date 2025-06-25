import React from 'react';

const Header: React.FC = () => (
  <header>
    <img src="/img/perfil.jpg" alt="Foto de perfil" className="perfil-img" />
    <h1>Valentino Castaldi</h1>
    <hr className="header-separador" />
    <p>
      Estudiante de Ingeniería en Software<br />
      Desarrollador backend y frontend
    </p>
  </header>
);

export default Header;