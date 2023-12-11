import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import CadastroCurso from './pages/CadCurso';
import CadastroPeriodo from './pages/CadPeriodo';
import CadastroProfessor from './pages/CadProfessor';
import CadastroSala from './pages/CadSalas';
import CadDesafio from './pages/CadDesafio';
import CadHorario from './pages/CadHorario';
import Agenda from './pages/Agenda';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (

    <Router>
      <div >
         {/* Menu de Navegação Bootstrap */}
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img id="img-sale" src="../logo.png" width="200" height="50" alt="" />
    </Link>

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
          <Link className="nav-link" to="/CadDesafio">
            Desafio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/CadHorario">
            Horários
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
          <Route path="/CadDesafio" element={<CadDesafio />} />
          <Route path="/CadHorario" element={<CadHorario />} />
          <Route path="/Agenda" element={<Agenda />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
