import React, { useState, useEffect } from 'react';

function CadastroProfessor() {
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [numeroMatricula, setNumeroMatricula] = useState('');
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [Professores, setProfessores] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedProfessores = JSON.parse(localStorage.getItem('Professores')) || [];
    setProfessores(storedProfessores);
  }, []);

  const adicionarProfessor = () => {
    if (nomeProfessor.trim() !== '' && 
    numeroMatricula.trim() !== '' && 
    numeroTelefone.trim() !== '') {
      
      if (editingIndex === null) {
        // Adicionar novo professor
        const novoProfessor = {
          nomeProfessor: nomeProfessor,
          numeroMatricula: numeroMatricula,
          numeroTelefone: numeroTelefone,
        };
  
        setProfessores((prevProfessor) => {
          const newProfessores = [...prevProfessor, novoProfessor];
          localStorage.setItem('Professores', JSON.stringify(newProfessores));
          return newProfessores;
        });
      } else {
        // Atualizar professor existente
        const professoresAtualizados = [...Professores];
        professoresAtualizados[editingIndex] = {
          nomeProfessor: nomeProfessor,
          numeroMatricula: numeroMatricula,
          numeroTelefone: numeroTelefone,
        };
  
        setProfessores(professoresAtualizados);
        localStorage.setItem('Professores', JSON.stringify(professoresAtualizados));
        setEditingIndex(null);
      }
  
      // Limpar os campos
      setNomeProfessor('');
      setNumeroMatricula('');
      setNumeroTelefone('');
    }
  };

  const excluirProfessor = (index) => {
    const novoProfessor = [...Professores];
    novoProfessor.splice(index, 1);
    setProfessores(novoProfessor);
    localStorage.setItem('Professores', JSON.stringify(novoProfessor));
  };

  const editarProfessor = (index) => {
    setEditingIndex(index);
    const professorSelecionado = Professores[index];
    setNomeProfessor(professorSelecionado.nomeProfessor);
    setNumeroMatricula(professorSelecionado.numeroMatricula);
    setNumeroTelefone(professorSelecionado.numeroTelefone);
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <h1>Cadastro de Professores</h1>
        <h4>{editingIndex === null ? 'Adicionar:' : 'Editar'}</h4>
        <div>
          <input
            type="text"
            id="nomeProfessor"
            placeholder="Nome do professor"
            value={nomeProfessor}
            onChange={(e) => setNomeProfessor(e.target.value)}
          />
          <input
            type="text"
            id="numeroMatricula"
            placeholder="Número da Matrícula"
            value={numeroMatricula}
            onChange={(e) => setNumeroMatricula(e.target.value)}
          />
          <input
            type="text"
            id="numeroTelefone"
            placeholder="Número de Telefone"
            value={numeroTelefone}
            onChange={(e) => setNumeroTelefone(e.target.value)}
          />
        </div>

          <p></p>

        <button onClick={adicionarProfessor}>
          {editingIndex === null ? 'Adicionar' : 'Atualizar'}
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Professores</h2>
        <table id="tabelaPessoas">
          <thead className="trtable-container">
            <tr>
              <th>ID</th>
              <th>Nome do Professor</th>
              <th>Número da Matrícula</th>
              <th>Número de Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="trtable-container">
            {Professores.map((professor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{professor.nomeProfessor}</td>
                <td>{professor.numeroMatricula}</td>
                <td>{professor.numeroTelefone}</td>
                <td>

                  <button className="alterar-btn" onClick={() => editarProfessor(index)}>Editar</button>
                  <button className="excluir-btn" onClick={() => excluirProfessor(index)}>Excluir</button>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadastroProfessor;
