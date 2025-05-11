import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [animais, setAnimais] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', especie: '', habitat: '', pais_origem: '' });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    listarAnimais();
  }, []);

  const listarAnimais = () => {
    axios.get('http://localhost:8000/animais')
      .then(res => setAnimais(res.data))
      .catch(err => setErro('Erro ao listar animais'));
  };

  const cadastrarAnimal = () => {
    axios.post('http://localhost:8000/animais', form)
      .then(res => {
        setAnimais([...animais, res.data]);
        setMensagem('Animal cadastrado com sucesso!');
        setErro('');
        setForm({ nome: '', descricao: '', especie: '', habitat: '', pais_origem: '' });
      })
      .catch(() => setErro('Erro ao cadastrar animal'));
  };

  const removerAnimal = (nome) => {
    axios.delete(`http://localhost:8000/animais/${nome}`)
      .then(() => {
        setAnimais(animais.filter(a => a.nome !== nome));
        setMensagem('Animal removido com sucesso!');
        setErro('');
      })
      .catch(() => setErro('Erro ao remover animal'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Zoológico</h1>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
        <input placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
        <input placeholder="Espécie" value={form.especie} onChange={e => setForm({ ...form, especie: e.target.value })} />
        <input placeholder="Habitat" value={form.habitat} onChange={e => setForm({ ...form, habitat: e.target.value })} />
        <input placeholder="País de origem" value={form.pais_origem} onChange={e => setForm({ ...form, pais_origem: e.target.value })} />
        <button onClick={cadastrarAnimal}>Cadastrar</button>
      </div>

      <h2>Lista de Animais</h2>
      <ul>
        {animais.map(animal => (
          <li key={animal.nome}>
            <strong>{animal.nome}</strong> - {animal.especie} ({animal.habitat})
            <button onClick={() => removerAnimal(animal.nome)} style={{ marginLeft: '10px' }}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
