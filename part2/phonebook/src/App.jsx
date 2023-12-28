import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName
    }
    
    if (persons.some(e => e.name === newName)){
      alert(`${newName} is already added to phonebook`)

      return
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} 
          onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>)}
      </>
    </div>
  )
}

export default App