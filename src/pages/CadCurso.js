import React, { useState, useEffect } from 'react';

const CadastroCurso = () => {
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [nomeCoordenador, setNomeCoordenador] = useState('');
  const [cursos, setCursos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedCursos = JSON.parse(localStorage.getItem('cursos')) || [];
    setCursos(storedCursos);
  }, []);

  const adicionarCurso = () => {
    if (nome.trim() !== '' && dataInicio && nomeCoordenador.trim() !== '') {
      const newCurso = {
        id: new Date().getTime(),
        nome: nome,
        dataInicio: dataInicio,
        nomeCoordenador: nomeCoordenador,
      };

      setCursos((prevCursos) => [...prevCursos, newCurso]);
      localStorage.setItem('cursos', JSON.stringify([...cursos, newCurso]));

      setNome('');
      setDataInicio('');
      setNomeCoordenador('');
    }
  };

  const excluirCurso = (id) => {
    const updatedCursos = cursos.filter((curso) => curso.id !== id);
    setCursos(updatedCursos);
    localStorage.setItem('cursos', JSON.stringify(updatedCursos));
  };

  const updateCurso = () => {
    if (nome.trim() !== '' && dataInicio && nomeCoordenador.trim() !== '') {
      const updatedCurso = {
        id: cursos[editingIndex].id,
        nome: nome,
        dataInicio: dataInicio,
        nomeCoordenador: nomeCoordenador,
      };

      const novosCursos = [...cursos];
      novosCursos[editingIndex] = updatedCurso;

      setCursos(novosCursos);
      localStorage.setItem('cursos', JSON.stringify(novosCursos));

      // Limpa os campos após a atualização
      setEditingIndex(null);
      setNome('');
      setDataInicio('');
      setNomeCoordenador('');
    }
  };

  const iniciarEdicao = (index) => {
    setEditingIndex(index);
    const cursoEditando = cursos[index];
    setNome(cursoEditando.nome);
    setDataInicio(cursoEditando.dataInicio);
    setNomeCoordenador(cursoEditando.nomeCoordenador);
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <h1>Cadastro dos Cursos</h1>
        <h4>Adicionar:</h4>
        <div>
          <input
            type="text"
            id="nomeCurso"
            placeholder="Nome do curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            id="nomeCoordenador"
            placeholder="Nome do Coordenador do curso"
            value={nomeCoordenador}
            onChange={(e) => setNomeCoordenador(e.target.value)}
          />
          <input
            type="date"
            id="dataInicio"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
            <p></p>
          {editingIndex === null ? (
            <button onClick={adicionarCurso}>Adicionar</button>
          ) : (
            <button onClick={updateCurso}>Atualizar</button>
          )}
        </div>
      </div>
              
      <div className="table-container">
        <h2>Lista de Cursos</h2>
        <table id="tabelaPessoas" className="trtable-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Curso</th>
              <th>Nome do Coordenador do Curso</th>
              <th>Data de Início do Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="corpoTabela" className="trtable-container">
            {cursos.map((curso, index) => (
              <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nome}</td>
                <td>{curso.nomeCoordenador}</td>
                <td>{curso.dataInicio}</td>
                <td>

                  <button className="alterar-btn" onClick={() => iniciarEdicao(index)}> Editar </button>
                  <button className="excluir-btn" onClick={() => excluirCurso(curso.id)}> Excluir </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CadastroCurso;
