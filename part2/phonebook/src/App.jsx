import { useState, useEffect } from "react";
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  
  const personFilter = () => {
    if (searchQuery === "") {
      return persons;
    }

    return persons.filter((element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addNewNameNumber = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber
    };

    if (persons.some((e) => e.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new number?`)===true){
        const refId = () => {
          return (persons.find(element => element.name === newName))
        }
        nameObject.id = refId().id
        personsService.update(refId().id, nameObject).then(response => {
          setPersons(persons.map(element => element.name !== newName ? element : nameObject))
          
        })
      }
    return 
    }
    {/*
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);

      return;
    }
    */}
    
    personsService.create(nameObject).then(response => {
    setPersons(persons.concat(response.data));
    setNewName("");
    setNewNumber(""); }) 
    
    
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchQuery} onChange={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addNewNameNumber}
        newNameValue={newName}
        handleNewName={handleNewName}
        newNumberValue={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filterFunction={personFilter} persons={persons} setPersons={setPersons} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <p>
      filter shown with <input value={props.value} onChange={props.onChange} />
    </p>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name:{" "}
        <input value={props.newNameValue} onChange={props.handleNewName} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumberValue} onChange={props.handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)===true){
      personsService.del(person.id).then(response => {
        props.setPersons(props.persons.filter(element => element.id !== person.id))

      })
    }
  }

  return (
    <>
      {props.filterFunction().map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default App;
