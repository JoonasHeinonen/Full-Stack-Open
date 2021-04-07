import React, { useState, useEffect } from 'react'
import AllContacts from './components/AllContacts';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

import personsService from './services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      if (window.confirm(`${newName} is already added to phonebook`)) {
        personsService
          .update(personObject)
            .then(person => {
              setNewNumber('');
            });
      } else {
        alert(`${newName} `)
      }
    } else {
      personsService
        .create(personObject)
          .then(person => {
            setPersons(persons.concat(person));
            setNewName('');
            setNewNumber('');
          });
    }
  }

  const deleteEntity = (name, id) => {
    if (window.confirm(`Do you want to delete ${name} from the phone directory?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          alert(`Deleted ${name} successfully from the phone directory!`);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          alert(`Problems deleting the ${name} from the records.`);
        });
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
      <AllContacts 
        persons={persons} 
        filter={filter} 
        deleteEntity={deleteEntity}
      />
      </div>
  )
}

export default App;
