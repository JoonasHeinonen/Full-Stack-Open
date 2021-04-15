import React, { useState, useEffect } from 'react'
import AllContacts from './components/AllContacts';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import Error from './components/Error';

import personsService from './services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ notification, setNotification] = useState(null);
  const [ error, setError] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (e, id) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.some((person) => person.name === personObject.name)) {
      if (window.confirm(`${newName} is already added to phonebook! Would you like to change update the phonenumber?`)) {
        personsService
          .update(personObject.id, personObject)
            .then(() => {
              alert('Gone here!');
            });
      } else {
        alert(`${newName} `)
      }
    } else {
      personsService
        .create(personObject)
          .then((person) => {
            setPersons(persons.concat(person));
            setNewName('');
            setNewNumber('');
          });
      setTimeout(() => {
        setNotification(null);
        setError(null);
      }, 5000);
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
          setError(
            `Problems deleting the ${name} from the records.`
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
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
      <Notification notification={notification} />
      <Error error={error} />
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
