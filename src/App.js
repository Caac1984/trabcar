import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import CadastroCurso from './pages/CadCurso';
import CadastroPeriodo from './pages/CadPeriodo';
import CadastroProfessor from './pages/CadProfessor';
import CadastroSala from './pages/CadSalas';
import CadHorario from './pages/CadHorario'
import Agenda from './pages/Agenda';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (

    <Router>
      <div >

      <div className="image-container">
        <img
          src="./logo.png"
          alt="Logo"
        />
      </div>


         {/* Menu de Navegação Bootstrap */}
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/"> </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-center">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Início
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/CadCurso">
            Curso
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/CadPeriodo">
            Período
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/CadProfessor">
            Professor
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/CadSalas">
            Salas
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/CadHorario">
            Horario
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Agenda">
            Calendário de Aulas
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/CadCurso" element={<CadastroCurso />} />
          <Route path="/CadPeriodo" element={<CadastroPeriodo />} />
          <Route path="/CadProfessor" element={<CadastroProfessor />} />
          <Route path="/CadSalas" element={<CadastroSala />} />
          <Route path="/CadHorario" element={<CadHorario/>} />
          <Route path="/Agenda" element={<Agenda />} />
        </Routes>
      </div>
    </Router>
    
  );
  
}

export default App;
