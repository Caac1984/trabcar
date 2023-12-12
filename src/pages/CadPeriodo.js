import React, { useState, useEffect } from 'react';

function CadastroPeriodo() {
  const [numeroPeriodo, setNumeroPeriodo] = useState('');
  const [semestreAno, setSemestreAno] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [turno, setTurno] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedPeriodos = JSON.parse(localStorage.getItem('periodos')) || [];
    setPeriodos(storedPeriodos);
  }, []);

  const adicionarPeriodo = () => {
    if (
      numeroPeriodo.trim() !== '' &&
      semestreAno.trim() !== '' &&
      dataInicio.trim() !== '' &&
      dataFim.trim() !== ''
    ) {
      const novoPeriodo = {
        id: new Date().getTime(),
        numeroPeriodo: numeroPeriodo,
        semestreAno: semestreAno,
        dataInicio: dataInicio,
        dataFim: dataFim,
        turno: turno,
      };

      const novosPeriodos = [...periodos, novoPeriodo];
      setPeriodos(novosPeriodos);
      localStorage.setItem('periodos', JSON.stringify(novosPeriodos));

      setNumeroPeriodo('');
      setSemestreAno('');
      setDataInicio('');
      setDataFim('');
      setTurno([]);
    }
  };

  const excluirPeriodo = (id) => {
    const novosPeriodos = periodos.filter((periodo) => periodo.id !== id);
    setPeriodos(novosPeriodos);
    localStorage.setItem('periodos', JSON.stringify(novosPeriodos));
  };

  const iniciarEdicao = (index) => {
    setEditingIndex(index);
    const periodoSelecionado = periodos[index];
    setNumeroPeriodo(periodoSelecionado.numeroPeriodo);
    setSemestreAno(periodoSelecionado.semestreAno);
    setDataInicio(periodoSelecionado.dataInicio);
    setDataFim(periodoSelecionado.dataFim);
    setTurno(periodoSelecionado.turno);
  };

  const atualizarPeriodo = () => {
    if (
      numeroPeriodo.trim() !== '' &&
      semestreAno.trim() !== '' &&
      dataInicio.trim() !== '' &&
      dataFim.trim() !== ''
    ) {
      const periodoAtualizado = {
        id: periodos[editingIndex].id,
        numeroPeriodo: numeroPeriodo,
        semestreAno: semestreAno,
        dataInicio: dataInicio,
        dataFim: dataFim,
        turno: turno,
      };

      const novosPeriodos = [...periodos];
      novosPeriodos[editingIndex] = periodoAtualizado;

      setPeriodos(novosPeriodos);
      localStorage.setItem('periodos', JSON.stringify(novosPeriodos));

      setEditingIndex(null);
      setNumeroPeriodo('');
      setSemestreAno('');
      setDataInicio('');
      setDataFim('');
      setTurno([]);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>Cadastro de Períodos</h1>
        <h4>Adicionar:</h4>
        <input className='input' type="number" value={numeroPeriodo}
          onChange={(e) => setNumeroPeriodo(e.target.value)}
          placeholder="Número do Período"/>
        <input type="text" value={semestreAno}
          onChange={(e) => setSemestreAno(e.target.value)}
          placeholder="Semestre/Ano do Período"/>
        <p></p>
        <div className="date-input">
          <h4>Data de Início: </h4>
          <p></p>
          <input className='periodo-container' type="date" value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)} />
          <p></p>
          <h4>Data de Fim: </h4>
          <p></p>
          <input className='periodo-container' type="date" value={dataFim}
            onChange={(e) => setDataFim(e.target.value)} />
        </div>
        <p></p>
        <div className="input-container">
          <p></p>
          <h3>Turno:</h3>
          <p></p>
          <select multiple value={turno} onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
              setTurno(selectedOptions);
            }}>
            <option value="matutino">Matutino</option>
            <option value="vespertino">Vespertino</option>
            <option value="noturno">Noturno</option>
          </select>
        </div>

        {editingIndex === null ? (
          <button onClick={adicionarPeriodo}>Adicionar</button>
        ) : (
          <button onClick={atualizarPeriodo}>Atualizar</button>
        )}
      </div>

      <div className="table-container">
        <h2>Lista de Períodos</h2>
        <table id="tabelaPessoas">
          <thead className="trtable-container">
            <tr>
              <th>ID</th>
              <th>Número do Período</th>
              <th>Semestre/Ano</th>
              <th>Data de Início</th>
              <th>Data de Fim</th>
              <th>Turno</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="trtable-container">
            {periodos.map((periodo, index) => (
              <tr key={periodo.id}>
                <td>{periodo.id}</td>
                <td>{periodo.numeroPeriodo}</td>
                <td>{periodo.semestreAno}</td>
                <td>{periodo.dataInicio}</td>
                <td>{periodo.dataFim}</td>
                <td>{periodo.turno.join(', ')}</td>
                <td>

                  <button className='alterar-btn' onClick={() => iniciarEdicao(index)}>Editar</button>
                  <button className='excluir-btn' onClick={() => excluirPeriodo(periodo.id)}>Excluir</button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadastroPeriodo;
