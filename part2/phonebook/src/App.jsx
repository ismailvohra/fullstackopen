import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
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

    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    axios.post("http://localhost:3001/persons", nameObject).then(response => {
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
      <Persons filterFunction={personFilter} />
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
  return (
    <>
      {props.filterFunction().map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default App;
