import React from 'react'

import api from './services/api'

import "./styles.css";
import { useEffect, useState } from 'react';
import { setState } from 'expect';
import { id } from 'postcss-selector-parser';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repositório ${Date.now()}`,
      url: "http://github.com/",
      techs: ["Node.js", "ASDF"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
      const filterRepositories = repositories.filter(
        (repository) => repository.id != id
      )
    setRepositories(filterRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
