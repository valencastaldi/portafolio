import React from 'react';
import Header from './Header';
import Nav from './Nav';
import SobreMi from './SobreMi';
import MisProyectos from './MisProyectos';
import Skills from './Skills';
import Contactame from './Contactame';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <SobreMi />
        <MisProyectos />
        <Skills />
        <Contactame />
      </main>
      <Footer />
    </>
  );
}

export default App;