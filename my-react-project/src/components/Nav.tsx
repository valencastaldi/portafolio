import React from 'react';
import { FaUser, FaProjectDiagram, FaTools, FaEnvelope } from 'react-icons/fa';

const Nav: React.FC = () => (
  <nav className="nav-centrado nav-pro">
    <a href="#sobre-mi"><FaUser /> Sobre mí</a>
    <a href="#proyectos"><FaProjectDiagram /> Proyectos</a>
    <a href="#skills"><FaTools /> Skills</a>
    <a href="#contacto"><FaEnvelope /> Contacto</a>
  </nav>
);

export default Nav;