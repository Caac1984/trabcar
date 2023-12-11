import React, { useState, useEffect } from 'react';
import '@fullcalendar/core/locales/pt-br';


function CadastroHorario() {
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [selectedNomeDesafio, setSelectedNomeDesafio] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);
  const [nomeDesafios, setNomeDesafios] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedHorarios = JSON.parse(localStorage.getItem('Horarios')) || [];
    setHorarios(storedHorarios);

    const storedProfessores = JSON.parse(localStorage.getItem('Professores')) || [];
    setProfessores(storedProfessores);

    const storedSalas = JSON.parse(localStorage.getItem('Salas')) || [];
    setSalas(storedSalas);

    const storedDesafios = JSON.parse(localStorage.getItem('Desafios')) || [];
    setNomeDesafios(storedDesafios);
  }, []);

  const adicionarHorarios = () => {
    if (
      selectedProfessor.trim() &&
      horaFinal.trim() &&
      horaInicial.trim() &&
      selectedSala.trim()
    ) {
      const novoHorario = {
        id: new Date().getTime(),
        title: ``,
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        professor: selectedProfessor,
        sala: selectedSala,
        desafio: selectedNomeDesafio,
        horaInicial: horaInicial,
        horaFinal: horaFinal,
      };

      setHorarios((prevHorarios) => {
        const newHorarios = [...prevHorarios, novoHorario];
        localStorage.setItem('Horarios', JSON.stringify(newHorarios));
        return newHorarios;
      });

      setSelectedProfessor('');
      setHoraInicial('');
      setHoraFinal('');
      setSelectedSala('');
    }
  };

  const excluirHorario = (index) => {
    const novoHorario = [...horarios];
    novoHorario.splice(index, 1);
    setHorarios(novoHorario);
    localStorage.setItem('Horarios', JSON.stringify(novoHorario));
  };

  const updateHorario = () => {
    if (
      selectedProfessor.trim() &&
      horaFinal.trim() &&
      horaInicial.trim() &&
      selectedSala.trim()
    ) {
      const updatedHorario = {
        id: horarios[editingIndex].id,
        title: ``,
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        professor: selectedProfessor,
        sala: selectedSala,
        desafio: selectedNomeDesafio,
        horaInicial: horaInicial,
        horaFinal: horaFinal,
      };

      const novosHorarios = [...horarios];
      novosHorarios[editingIndex] = updatedHorario;

      setHorarios(novosHorarios);
      localStorage.setItem('Horarios', JSON.stringify(novosHorarios));

      setEditingIndex(null);
      setSelectedProfessor('');
      setHoraInicial('');
      setHoraFinal('');
      setSelectedSala('');
    }
  };

  const iniciarEdicao = (index) => {
    setEditingIndex(index);
    const horarioEditando = horarios[index];
    setSelectedProfessor(horarioEditando.professor);
    setSelectedSala(horarioEditando.sala);
    setSelectedNomeDesafio(horarioEditando.desafio);
    setHoraInicial(horarioEditando.horaInicial);
    setHoraFinal(horarioEditando.horaFinal);
  };

  return (
    <div>
      <div id="Cad" className="form-container">
        <h4>Selecione um Professor: </h4>
        <select
          id="professor"
          value={selectedProfessor}
          onChange={(e) => setSelectedProfessor(e.target.value)}
        >
          <option value="" disabled>
            Selecione um professor
          </option>
          {professores.map((professor, index) => (
            <option key={index} value={professor.nomeProfessor}>
              {professor.nomeProfessor}
            </option>
          ))}
        </select>
        <p></p>
        <h4>Selecione uma Sala: </h4>
        <select
          id="sala"
          value={selectedSala}
          onChange={(e) => setSelectedSala(e.target.value)}
        >
          <option value="" disabled>
            Selecione uma Sala
          </option>
          {salas.map((sala, index) => (
            <option key={index} value={sala.numeroSala}>
              {sala.numeroSala}
            </option>
          ))}
        </select>
        <p></p>
        <h4>Selecione um Desafio: </h4>
        <select
          id="desafio"
          value={selectedNomeDesafio}
          onChange={(e) => setSelectedNomeDesafio(e.target.value)}
        >
          <option value="" disabled>
            Selecione um Desafio
          </option>
          {nomeDesafios.map((desafio, index) => (
            <option key={index} value={desafio.nomeDesafio}>
              {desafio.nomeDesafio}
            </option>
          ))}
        </select>
        <p></p>
        <div>
          <h4>Horário Inicio: </h4>
          <input
            className="home-container"
            type="time"
            value={horaInicial}
            onChange={(e) => setHoraInicial(e.target.value)}
          />
          <p></p>
          <h4>Horário Final: </h4>
          <input
            className="home-container"
            type="time"
            value={horaFinal}
            onChange={(e) => setHoraFinal(e.target.value)}
          />
        </div>
        <p></p>
        {editingIndex === null ? (
          <button onClick={adicionarHorarios}>Adicionar</button>
        ) : (
          <button onClick={updateHorario}>Atualizar</button>
        )}
      </div>

      <div className="table-container">
        <h2>Horario</h2>
        <table id="tabelaPessoas">
          <thead className="trtable-container">
            <tr>
              <th>ID</th>
              <th>Professor</th>
              <th>Sala</th>
              <th>Curso</th>
              <th>Horario</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="trtable-container">
            {horarios.map((horario, index) => (
              <tr key={horario.id}>
                <td>{horario.id}</td>
                <td>{horario.professor}</td>
                <td>{horario.sala}</td>
                <td>{horario.desafio}</td>
                <td>
                  {horario.horaInicial} a {horario.horaFinal}
                </td>
                <td>
                  <button className="alterar-btn" onClick={() => iniciarEdicao(index)}> Alterar </button>
                  <button className="excluir-btn" onClick={() => excluirHorario(index)}> Excluir </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
}


export default CadastroHorario;
