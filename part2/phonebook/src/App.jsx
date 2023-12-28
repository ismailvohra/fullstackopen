import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const personFilter = () => {
    if (searchQuery===''){
      return persons
    }

    return persons.filter(element => element.name.toLowerCase().includes(searchQuery.toLowerCase()))

  }
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

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
      number: newNumber,
      id: persons.length+1
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
      filter shown with <input value={searchQuery} onChange={handleSearch}/>
      <h2>Add new</h2>
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
      {personFilter().map(person => 
        <p key={person.name}>{person.name} {person.number}</p>)}
      </>
    </div>
  )
}

export default App