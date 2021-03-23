import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api"

import Repository from './components/Repository'
import RemoveButton from './components/RemoveButton'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(apiRepositories => setRepositories(apiRepositories.data))
  }, [])

  async function handleAddRepository() {
    const createdRepository = await api.post('repositories', {
      title: "Conceitos Vovó",
      url: "https://github.com/murilohns/Node",
      techs: [
        "Node"
      ]
    })

    setRepositories([...repositories, createdRepository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repositoriesCopy = [...repositories]

    const repositoryIndex = repositoriesCopy.findIndex(repository => repository.id === id)
    repositoriesCopy.splice(repositoryIndex, 1)

    setRepositories(repositoriesCopy)
  }

  return (
    <>
      <ul aria-label="repository-list">
        {repositories.map(repository => (
          <Repository key={repository.id} id={repository.id} title={repository.title}>
            <RemoveButton id={repository.id} handler={handleRemoveRepository}/>
          </Repository>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
