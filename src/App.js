import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8000/animais";

function App() {
  const [animais, setAnimais] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    especie: '',
    habitat: '',
    pais_origem: ''
  });

  useEffect(() => {
    fetchAnimais();
  }, []);

  const fetchAnimais = async () => {
    const res = await axios.get(API_URL);
    setAnimais(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ nome: '', descricao: '', especie: '', habitat: '', pais_origem: '' });
    fetchAnimais();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Zoológico</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
        <input type="text" placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} required />
        <input type="text" placeholder="Espécie" value={form.especie} onChange={e => setForm({ ...form, especie: e.target.value })} required />
        <input type="text" placeholder="Habitat" value={form.habitat} onChange={e => setForm({ ...form, habitat: e.target.value })} required />
        <input type="text" placeholder="País de origem" value={form.pais_origem} onChange={e => setForm({ ...form, pais_origem: e.target.value })} required />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Animais Cadastrados</h2>
      <ul>
        {animais.map((animal, index) => (
          <li key={index}>
            <strong>{animal.nome}</strong> - {animal.especie} - {animal.habitat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
