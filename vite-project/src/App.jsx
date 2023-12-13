import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8080/usuario/all")
      .then((response) => {
        const data = response.data.map(usuario => ({
          nome: usuario.nome,
          email: usuario.email,
        }));
        setUsuarios(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const adicionarUsuario = async (novoUsuario) => {
    try {
      const response = await axios.post("http://localhost:8080/usuario/add", novoUsuario);
      setUsuarios([...usuarios, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const novoUsuario = { nome, email };
    adicionarUsuario(novoUsuario);
    setNome("");
    setEmail("");
   };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <input type="submit" value="Adicionar" />
      </form>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App