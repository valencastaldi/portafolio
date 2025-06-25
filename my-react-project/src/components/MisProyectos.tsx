import React, { useState } from 'react';

const proyectos = [
  {
    titulo: "MiEscuelaApp",
    descripcion: "App para gestión escolar, con módulos CRUD, reportes y dashboards interactivos.",
    descripcionLarga: `
<strong>¿Qué es proyectoEscuelas?</strong><br />
proyectoEscuelas es un sistema de gestión escolar pensado para facilitar y automatizar tareas administrativas y académicas en instituciones educativas. Permite una mejor organización y comunicación entre administradores, profesores y alumnos.<br /><br />

<strong>Funcionalidades principales:</strong>
<ul>
  <li>Gestión de usuarios (administrador, profesor, alumno)</li>
  <li>Asignación de materias y cursos</li>
  <li>Registro y visualización de horarios</li>
  <li>Carga de notas y asistencias</li>
  <li>Cronograma interactivo para exámenes y clases</li>
  <li>Sistema de comunicados por rol o curso</li>
  <li>Paneles diferenciados según el tipo de usuario</li>
</ul>

<strong>Tecnologías utilizadas:</strong>
<ul>
  <li>Backend: Python + Flask</li>
  <li>Base de datos: PostgreSQL</li>
  <li>Frontend: HTML, CSS, JavaScript</li>
  <li>Otros: Jinja2, Bootstrap</li>
</ul>

<strong>Requisitos previos:</strong>
<ul>
  <li>Python 3.10+</li>
  <li>PostgreSQL</li>
  <li>Git</li>
</ul>
    `,
    img: "/img/dashboard_profesor.jpg",
    link: "https://github.com/rosasz1/miEscuelaApp2",
    galeria: [
      "/img/login.png",
      "/img/dashboard_profesor.jpg",
      "/img/sidebar_profe.jpg"
    ]
  },
  {
    titulo: "Portafolio Web",
    descripcion: "Este portafolio personal, hecho en React, con animaciones y diseño responsive.",
    descripcionLarga: "", // Aquí irá la descripción extendida
    img: "/img/perfil.jpg", // O la imagen que prefieras para tu portafolio
    link: "#" // Puedes poner el link de tu portafolio si tienes repo
  }
];

const MisProyectos: React.FC = () => {
  const [expandido, setExpandido] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [proyectoExpandido, setProyectoExpandido] = useState<number | null>(null);

  return (
    <section id="proyectos" className={`tarjeta expandible${expandido ? ' expandida' : ''}`}>
      <h2>Mis Proyectos</h2>
      <div className="proyectos-grid">
        {proyectos.map((proy, idx) => (
          <div className="proyecto-card" key={idx}>
            <img src={proy.img} alt={proy.titulo} className="img-proyecto" />
            <h3>{proy.titulo}</h3>
            <p>{proy.descripcion}</p>
            <a href={proy.link} className="proyecto-link" target="_blank" rel="noopener noreferrer">
              Ver código
            </a>
            {proy.galeria && (
              <div className="galeria-proyecto">
                {proy.galeria.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Vista ${i + 1} de ${proy.titulo}`}
                    className="img-galeria"
                    onClick={() => setModalImg(img)}
                  />
                ))}
              </div>
            )}
            <button
              className="mostrar-mas"
              onClick={() => setProyectoExpandido(proyectoExpandido === idx ? null : idx)}
            >
              {proyectoExpandido === idx ? "Ocultar" : "Mostrar más"}
            </button>
            {proyectoExpandido === idx && (
              <div
                className="descripcion-larga"
                dangerouslySetInnerHTML={{ __html: proy.descripcionLarga || "Agrega aquí la descripción extendida de este proyecto." }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal para imagen expandida */}
      {modalImg && (
        <div className="modal-img-bg" onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="Vista ampliada" className="modal-img" />
        </div>
      )}
    </section>
  );
};

export default MisProyectos;