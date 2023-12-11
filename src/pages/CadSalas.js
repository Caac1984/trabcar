import React, { useState, useEffect } from 'react';

function CadastroSala() {
  const [andarSala, setAndarSala] = useState('');
  const [numeroSala, setNumeroSala] = useState('');
  const [Predio, setPredio] = useState('');
  const [numeroCadeiras, setNumeroCadeiras] = useState('');
  const [Salas, setSalas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedSalas = JSON.parse(localStorage.getItem('Salas')) || [];
    setSalas(storedSalas);
  }, []);

  const adicionarSalas = () => {
    if (
      andarSala.trim() !== '' &&
      numeroSala.trim() !== '' &&
      Predio.trim() !== '' &&
      numeroCadeiras.trim() !== ''
    ) {
      if (editingIndex === null) {
        // Adicionar nova sala
        const NovaSala = {
          andarSala: andarSala,
          numeroSala: numeroSala,
          Predio: Predio,
          numeroCadeiras: numeroCadeiras,
        };

        setSalas((prevSalas) => {
          const newSalas = [...prevSalas, NovaSala];
          localStorage.setItem('Salas', JSON.stringify(newSalas));
          return newSalas;
        });
      } else {
        // Atualizar sala existente
        const salasAtualizadas = [...Salas];
        salasAtualizadas[editingIndex] = {
          andarSala: andarSala,
          numeroSala: numeroSala,
          Predio: Predio,
          numeroCadeiras: numeroCadeiras,
        };

        setSalas(salasAtualizadas);
        localStorage.setItem('Salas', JSON.stringify(salasAtualizadas));
        setEditingIndex(null);
      }

      // Limpar os campos
      setAndarSala('');
      setNumeroSala('');
      setPredio('');
      setNumeroCadeiras('');
    }
  };

  const excluirSala = (index) => {
    const NovaSala = [...Salas];
    NovaSala.splice(index, 1);
    setSalas(NovaSala);
    localStorage.setItem('Salas', JSON.stringify(NovaSala));
  };

  const editarSala = (index) => {
    setEditingIndex(index);
    const salaSelecionada = Salas[index];
    setAndarSala(salaSelecionada.andarSala);
    setNumeroSala(salaSelecionada.numeroSala);
    setPredio(salaSelecionada.Predio);
    setNumeroCadeiras(salaSelecionada.numeroCadeiras);
  };

  return (
    <div>
      <div id='Cad' className="form-container">
        <h1>Cadastro de Salas</h1>
        <h4>{editingIndex === null ? 'Adicionar:' : 'Editar'} </h4>
        <input
          type="text"
          id="andarSala"
          placeholder="Andar da Sala"
          value={andarSala}
          onChange={(e) => setAndarSala(e.target.value)}
        />
        <input
          type="text"
          id="numeroSala"
          placeholder="Número da Sala"
          value={numeroSala}
          onChange={(e) => setNumeroSala(e.target.value)}
        />
        <input
          type="text"
          id="Predio"
          placeholder="Prédio"
          value={Predio}
          onChange={(e) => setPredio(e.target.value)}
        />
        <input
          type="text"
          id="numeroCadeira"
          placeholder="Número da Cadeira"
          value={numeroCadeiras}
          onChange={(e) => setNumeroCadeiras(e.target.value)}
        />

          <p></p>

        <button onClick={adicionarSalas}>
          {editingIndex === null ? 'Adicionar' : 'Atualizar'}
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Salas</h2>
        <table id="tabelaPessoas">
          <thead className="trtable-container">
            <tr>
              <th>ID</th>
              <th>Andar</th>
              <th>Número da Sala</th>
              <th>Prédio</th>
              <th>Número da Cadeira</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="trtable-container">
            {Salas.map((Sala, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{Sala.andarSala}</td>
                <td>{Sala.numeroSala}</td>
                <td>{Sala.Predio}</td>
                <td>{Sala.numeroCadeiras}</td>
                <td>

                  <button className="alterar-btn" onClick={() => editarSala(index)}>Editar</button>
                  <button className="excluir-btn" onClick={() => excluirSala(index)}>Excluir</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadastroSala;
