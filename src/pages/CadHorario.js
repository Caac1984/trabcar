import React, { useState, useEffect } from 'react';

function CadastroHorario() {
  const [nomeDesafio, setNomeDesafio] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedSala, setSelectedSala] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [selectedDiaSemana, setSelectedDiaSemana] = useState('');
  const [selectedNomeDesafio, setSelectedNomeDesafio] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [professores, setProfessores] = useState([]);
  const [periodos, setPeriodos] = useState([]);
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

    const storedPeriodos = JSON.parse(localStorage.getItem('periodos')) || [];
    setPeriodos(storedPeriodos);

  }, []);

  const adicionarHorarios = () => {
    if (
      nomeDesafio.trim() !== '' &&
      selectedPeriodo.trim() !== '' &&
      selectedProfessor.trim() !== '' &&
      dataInicio.trim() !== '' &&
      dataFim.trim() !== '' &&
      selectedDiaSemana.trim() !== '' &&
      horaFinal.trim() !== '' &&
      horaInicial.trim() !== '' &&
      selectedSala.trim() !== ''
    ) {
      const novoHorario = {
        id: new Date().getTime(),
        title: '',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        desafio: nomeDesafio,
        periodo: selectedPeriodo,
        professor: selectedProfessor,
        dataInicio: dataInicio,
        dataFim: dataFim,
        diaSemana: selectedDiaSemana,
        horaInicial: horaInicial,
        horaFinal: horaFinal,
        sala: selectedSala,
      };
  
      if (editingIndex === null) {
        setHorarios((prevHorarios) => {
          const newHorarios = [...prevHorarios, novoHorario];
          localStorage.setItem('Horarios', JSON.stringify(newHorarios));
          return newHorarios;
        });
      } else {
        const horariosAtualizados = [...horarios];
        horariosAtualizados[editingIndex] = {
          id: horarios[editingIndex].id,
          title: '',
          start: new Date().toISOString(),
          professor: selectedProfessor,
          sala: selectedSala,
          desafio: nomeDesafio,
          periodo: selectedPeriodo,
          horaInicial: horaInicial,
          horaFinal: horaFinal,
          diaSemana: selectedDiaSemana,
          dataInicio,
          dataFim,
        };
  
        setHorarios(horariosAtualizados);
        localStorage.setItem('Horarios', JSON.stringify(horariosAtualizados));
        setEditingIndex(null);
      }
  
      setNomeDesafio('');
      setSelectedPeriodo('');
      setSelectedProfessor('');
      setDataInicio('');
      setDataFim('');
      setSelectedDiaSemana('');
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

  const iniciarEdicao = (index) => {
    setEditingIndex(index);
    const horarioEditando = horarios[index];
    setNomeDesafio(horarioEditando.desafio); 
    setSelectedPeriodo(horarioEditando.periodo);
    setSelectedProfessor(horarioEditando.professor);
    setDataInicio(horarioEditando.dataInicio);
    setDataFim(horarioEditando.dataFim);
    setSelectedDiaSemana(horarioEditando.diaSemana);
    setHoraInicial(horarioEditando.horaInicial);
    setHoraFinal(horarioEditando.horaFinal);
    setSelectedSala(horarioEditando.sala);
  };

  return (
    <div>
      <div id="Cad" className="form-container">
        <h2>Cadastro de Desafios</h2>

        <input
          type="text"
          id="nomeDesafio"
          placeholder="Nome da Matéria"
          value={nomeDesafio}
          onChange={(e) => setNomeDesafio(e.target.value)}
        />
        <p></p>

        <h4>Selecione um Período: </h4>
        <select
          id="periodo"
          value={selectedPeriodo}
          onChange={(e) => setSelectedPeriodo(e.target.value)}
        >
          <option value="" disabled>
            Selecione um período
          </option>
          {periodos.map((periodo, index) => (
            <option key={index} value={periodo.numeroPeriodo}>
              {' '}
              {periodo.numeroPeriodo}{' '}
            </option>
          ))}
        </select>

        <p></p>

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

        <h4>Data de Inicio:</h4>
        <br></br>
        <input
          type="date"
          id="dataIncio"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <p></p>
        <h4>Data de Fim:</h4>
        <br></br>
        <input
          type="date"
          id="dataFim"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />

        <p></p>

        <h4>Dia da Semana:</h4>
        <br />
        <select
          id="diaSemana"
          value={selectedDiaSemana}
          onChange={(e) => setSelectedDiaSemana(e.target.value)}
        >
          <option value="" disabled>
            Selecione um dia da semana
          </option>
          <option value="Segunda">Segunda-feira</option>
          <option value="Terca">Terça-feira</option>
          <option value="Quarta">Quarta-feira</option>
          <option value="Quinta">Quinta-feira</option>
          <option value="Sexta">Sexta-feira</option>
          <option value="Sabado">Sábado</option>
          <option value="Domingo">Domingo</option>
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
              {' '}
              {sala.numeroSala}{' '}
            </option>
          ))}
        </select>

        <p></p>
        <button onClick={adicionarHorarios}>
          {editingIndex === null ? 'Adicionar' : 'Atualizar'}
        </button>
      </div>

      <div>
        <div className="table-container">
          <h2>Horario</h2>
          <table id="tabelaPessoas">
            <thead className="trtable-container">
              <tr>
                <th>ID</th>
                <th>Desafio</th>
                <th>Período</th>
                <th>Professor</th>
                <th>Data Inicio e Fim</th>
                <th>Dia da Semana</th>
                <th>Horario</th>
                <th>Sala</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="trtable-container">
              {horarios.map((horario, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{horario.desafio}</td>
                  <td>{horario.periodo}</td>
                  <td>{horario.professor}</td>
                  <td>
                    {horario.dataInicio} a {horario.dataFim}
                  </td>
                  <td>{horario.diaSemana}</td>
                  <td>
                    {horario.horaInicial} a {horario.horaFinal}
                  </td>
                  <td>{horario.sala}</td>

                  <td>
                    <button
                      className="alterar-btn" onClick={() => iniciarEdicao(index)} >
                      {' '}
                      Alterar{' '}
                    </button>
                    <button className="excluir-btn" onClick={() => excluirHorario(index)} >
                      {' '}
                      Excluir{' '}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CadastroHorario;
