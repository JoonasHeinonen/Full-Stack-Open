import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllContacts from './components/AllContacts';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.some((persons) => persons.name === personObject.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName(personObject.name);
    }
  }

  const handleNameChange = (e) =>{
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilter = (e) => {
    console.log(filter);
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChangeHandler={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <AllContacts persons={persons} filter={filter} />
    </div>
  )

}

export default App