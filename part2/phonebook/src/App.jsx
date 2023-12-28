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
      <Filter value={searchQuery} onChange={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addNewNameNumber} newNameValue={newName} handleNewName={handleNewName} newNumberValue={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons filterFunction={personFilter}/>
    </div>
  )
}


const Filter = (props) => {
  return(
  <p>filter shown with <input value={props.value} onChange={props.onChange} /></p>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.newNameValue} 
      onChange={props.handleNewName} />
    </div>
    <div>
      number: <input value={props.newNumberValue} 
      onChange={props.handleNewNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = (props) => {
  return (
    <>
    {props.filterFunction().map(person => 
      <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

export default App