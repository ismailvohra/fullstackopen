import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewNameNumber = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(e => e.name === newName)){
      alert(`${newName} is already added to phonebook`)

      return
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNameNumber}>
        <div>
          name: <input value={newName} 
          onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} 
          onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
      {persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>)}
      </>
    </div>
  )
}

export default App