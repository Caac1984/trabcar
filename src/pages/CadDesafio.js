import React, { useState, useEffect } from 'react';

function CadDesafio() {
  const [nomeDesafio, setNomeDesafio] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [desafios, setDesafios] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedDesafios = JSON.parse(localStorage.getItem('Desafios')) || [];
    setDesafios(storedDesafios);

    const storedProfessores = JSON.parse(localStorage.getItem('Professores')) || [];
    setProfessores(storedProfessores);

    const storedPeriodos = JSON.parse(localStorage.getItem('periodos')) || [];
    setPeriodos(storedPeriodos);
  }, []);

  const adicionarDesafio = () => {
    if (
      nomeDesafio.trim() !== '' &&
      selectedPeriodo.trim() !== '' &&
      selectedProfessor.trim() !== '' &&
      dataInicio.trim() !== '' &&
      dataFim.trim() !== ''
    ) {
      if (editingIndex === null) {
        // Adicionar novo desafio
        const novoDesafio = {
          nomeDesafio: nomeDesafio,
          periodo: selectedPeriodo,
          professor: selectedProfessor,
          dataInicio: dataInicio,
          dataFim: dataFim,
        };

        setDesafios((prevDesafios) => {
          const newDesafios = [...prevDesafios, novoDesafio];
          localStorage.setItem('Desafios', JSON.stringify(newDesafios));
          return newDesafios;
        });
      } else {
        // Atualizar desafio existente
        const desafiosAtualizados = [...desafios];
        desafiosAtualizados[editingIndex] = {
          nomeDesafio: nomeDesafio,
          periodo: selectedPeriodo,
          professor: selectedProfessor,
          dataInicio: dataInicio,
          dataFim: dataFim,
        };

        setDesafios(desafiosAtualizados);
        localStorage.setItem('Desafios', JSON.stringify(desafiosAtualizados));
        setEditingIndex(null);
      }

      // Limpar os campos
      setNomeDesafio('');
      setSelectedPeriodo('');
      setSelectedProfessor('');
      setDataInicio('');
      setDataFim('');
    }
  };

  const excluirDesafio = (index) => {
    const novoDesafio = [...desafios];
    novoDesafio.splice(index, 1);
    setDesafios(novoDesafio);
    localStorage.setItem('Desafios', JSON.stringify(novoDesafio));
  };

  const editarDesafio = (index) => {
    setEditingIndex(index);
    const desafioSelecionado = desafios[index];
    setNomeDesafio(desafioSelecionado.nomeDesafio);
    setSelectedPeriodo(desafioSelecionado.periodo);
    setSelectedProfessor(desafioSelecionado.professor);
    setDataInicio(desafioSelecionado.dataInicio);
    setDataFim(desafioSelecionado.dataFim);
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <h1>Cadastro de Desafios</h1>
        <h4>{editingIndex === null ? 'Adicionar:' : 'Editar'} </h4>

        <input
          type="text"
          id="nomeDesafio"
          placeholder="Nome da Matéria"
          value={nomeDesafio}
          onChange={(e) => setNomeDesafio(e.target.value)}
        />
          <p></p>
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
              {periodo.numeroPeriodo}
            </option>
          ))}
        </select>

        <p></p>

        <select
          id="professor"
          value={selectedProfessor}
          onChange={(e) => setSelectedProfessor(e.target.value)}
        >
          <option value="" disabled>Selecione um professor</option>
          {professores.map((professor, index) => (
            <option key={index} value={professor.nomeProfessor}>{professor.nomeProfessor}</option>
          ))}
        </select>

        <p></p>
        <label>Data de Inicio:</label><br></br>
        <input
          type="date"
          id="dataIncio"
          placeholder="Data Inicio"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
          <p></p>
        <label>Data de Fim:</label><br></br>
        <input
          type="date"
          id="dataFim"
          placeholder="Data Fim"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
          <p></p>
       
        <p></p>
        <button onClick={adicionarDesafio}>
          {editingIndex === null ? 'Adicionar' : 'Atualizar'}
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Desafios</h2>
        <table id="tabelaDesafios">
          <thead className="trtable-container">
            <tr>
              <th>ID</th>
              <th>Matéria</th>
              <th>Período</th>
              <th>Professor</th>
              <th>Data Inicio</th>
              <th>Data Fim</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="trtable-container">
            {desafios.map((desafio, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{desafio.nomeDesafio}</td>
                <td>{desafio.periodo}</td>
                <td>{desafio.professor}</td>
                <td>{desafio.dataInicio}</td>
                <td>{desafio.dataFim}</td>
                <td>

                  <button className="alterar-btn" onClick={() => editarDesafio(index)}>Editar</button>
                  <button className="excluir-btn" onClick={() => excluirDesafio(index)}>Excluir</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadDesafio;
